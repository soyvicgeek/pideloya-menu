import "server-only";

import { createHash } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { SITE_URL } from "@/lib/site";

/**
 * Registro de visitas a los menús.
 *
 * Cuenta cuánta gente abre cada menú, sin guardar quién es. En la base no
 * queda ni la IP ni el navegador: sólo un resumen irreversible que sirve para
 * distinguir dos visitas de una sola, y para nada más.
 *
 * La regla de "qué cuenta como una visita" NO vive aquí, sino en
 * `dchplm_register_menu_view()`. Si mañana se registra desde otro lado —una
 * app, un QR con redirección— la definición tiene que seguir siendo la misma,
 * o los números de dos meses dejan de ser comparables.
 */

/**
 * Secreto del hash. Sin él no se registra nada, y está bien: es preferible
 * quedarse sin estadísticas que guardar huellas que alguien pueda reconstruir
 * probando IPs contra un hash sin sal.
 */
const SECRETO = process.env.MENU_VIEWS_SECRET;

/** Para no llenar la terminal con el mismo aviso en cada visita. */
let yaAvisoSinSecreto = false;

/**
 * Los que piden la página sin ser una persona.
 *
 * `facebookexternalhit` y `whatsapp` no son un detalle menor aquí: son los que
 * traen la vista previa cuando alguien comparte el enlace. Como los menús se
 * reparten justamente por WhatsApp, sin esta lista cada vez que un dueño pega
 * su enlace en un grupo se anotaría una visita que nadie hizo.
 */
const BOTS =
  /bot\b|crawler|spider|slurp|facebookexternalhit|whatsapp|telegram|twitterbot|discordbot|slackbot|embedly|preview|monitor|pingdom|uptime|lighthouse|pagespeed|headless|curl|wget|python-requests|axios|go-http-client/i;

export function esBot(userAgent: string): boolean {
  // Un agente vacío casi nunca es un navegador de verdad.
  return userAgent.trim() === "" || BOTS.test(userAgent);
}

/**
 * Con qué entró. Es aproximado y no pasa nada: sirve para saber si conviene
 * seguir diseñando primero para celular, no para identificar a nadie.
 */
export function dispositivo(userAgent: string): "mobile" | "tablet" | "desktop" {
  // La tableta se revisa primero: el iPad también dice "Mobile" en su agente.
  if (/ipad|tablet|playbook|silk|kindle/i.test(userAgent)) return "tablet";
  if (/mobi|android|iphone|ipod/i.test(userAgent)) return "mobile";
  return "desktop";
}

/**
 * De dónde llegó, sólo el dominio.
 *
 * La URL completa no aporta nada que vayamos a consultar y sí puede traer
 * parámetros con datos de la persona pegados por la red social de turno.
 *
 * La navegación dentro del propio sitio devuelve null: que alguien vaya de la
 * portada a un menú no es una fuente de tráfico.
 */
export function dominioDelReferente(referer: string | null): string | null {
  if (!referer) return null;

  try {
    const host = new URL(referer).hostname.replace(/^www\./, "");
    if (host === new URL(SITE_URL).hostname) return null;
    return host.slice(0, 120);
  } catch {
    return null;
  }
}

/** El día en el calendario del negocio, no en el del servidor. */
function hoyEnMexico(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Mexico_City",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/**
 * La huella del visitante.
 *
 * Es un sha256 de la fecha, el secreto, la IP, el navegador y el id del menú.
 * Tres decisiones dentro:
 *
 *   - Va la fecha, así que la huella cambia sola cada noche. Nadie puede
 *     seguir a una persona de un día para otro, ni siquiera nosotros.
 *   - Va el id del menú, así que la misma persona en dos negocios produce dos
 *     huellas distintas y no se le puede reconstruir un recorrido.
 *   - Va el secreto, sin el cual bastaría con probar los cuatro mil millones
 *     de IPs contra el hash para saber de quién es.
 */
export function huellaDelVisitante(
  ip: string,
  userAgent: string,
  menuId: string,
): string {
  return createHash("sha256")
    .update(`${hoyEnMexico()}|${SECRETO}|${ip}|${userAgent}|${menuId}`)
    .digest("hex");
}

/** La IP que puso el proxy. En Vercel siempre viene en x-forwarded-for. */
export function ipDeLosEncabezados(
  xForwardedFor: string | null,
  xRealIp: string | null,
): string {
  // Puede traer una cadena de proxies: "cliente, proxy1, proxy2". El primero
  // es quien llamó.
  const primera = xForwardedFor?.split(",")[0]?.trim();
  return primera || xRealIp?.trim() || "sin-ip";
}

export interface DatosDeLaVisita {
  menuId: string;
  ip: string;
  userAgent: string;
  referer: string | null;
}

/**
 * Anota la visita. Nunca lanza.
 *
 * Corre dentro de `after()`, o sea después de que la página ya se le envió al
 * visitante, pero aun así se traga cualquier error: que la base esté caída o
 * que falte una variable de entorno no tiene por qué ensuciar los registros
 * del servidor con algo que nadie va a atender de madrugada. Un menú que se
 * ve bien vale más que una visita contada.
 */
export async function registrarVista(datos: DatosDeLaVisita): Promise<void> {
  if (!SECRETO) {
    if (!yaAvisoSinSecreto) {
      console.warn(
        "[vistas] falta MENU_VIEWS_SECRET, no se están contando las visitas.",
      );
      yaAvisoSinSecreto = true;
    }
    return;
  }

  try {
    const supabase = getSupabaseAdmin();

    const { error } = await supabase.rpc("dchplm_register_menu_view", {
      p_menu_id: datos.menuId,
      p_visitor_hash: huellaDelVisitante(datos.ip, datos.userAgent, datos.menuId),
      p_referrer_host: dominioDelReferente(datos.referer) ?? undefined,
      p_device: dispositivo(datos.userAgent),
      p_is_bot: esBot(datos.userAgent),
    });

    if (error) {
      console.error("[vistas] no se pudo registrar:", error.message);
    }
  } catch (error) {
    console.error("[vistas] error inesperado:", error);
  }
}
