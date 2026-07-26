"use server";

import { ConfiguracionFaltante, getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  leerFormulario,
  normalizarRed,
  validarSolicitud,
  type EstadoFormulario,
} from "./validation";

/**
 * Guarda un pre-registro de /unete.
 *
 * Corre en el servidor: el navegador manda el formulario y recibe de vuelta
 * sólo el resultado. La llave de servicio nunca sale de aquí.
 *
 * Escribe en dos lados a propósito:
 *   1. dchplm_menu_solicitudes — datos estructurados, para pre-llenar el panel
 *      cuando la solicitud se apruebe.
 *   2. contacto — la copia que cae en la bandeja de siempre, con
 *      asunto 'Menú de Negocio' y origen 'Menú Cd. Hidalgo'.
 */
export async function enviarSolicitud(
  _prev: EstadoFormulario,
  formData: FormData,
): Promise<EstadoFormulario> {
  const datos = leerFormulario(formData);

  // Trampa para bots: campo oculto que una persona nunca llena.
  // Si viene con algo, respondemos "ok" sin guardar nada.
  if (typeof formData.get("website") === "string" && formData.get("website") !== "") {
    return { ok: true, errores: {} };
  }

  const errores = validarSolicitud(datos);
  const valores = { ...datos };

  if (Object.keys(errores).length > 0) {
    return { ok: false, errores, valores };
  }

  try {
    const supabase = getSupabaseAdmin();

    // ¿Ya se registró con el mismo correo o teléfono y sigue pendiente?
    const { data: repetida } = await supabase
      .from("dchplm_menu_solicitudes")
      .select("id")
      .or(`correo.eq.${datos.correo},telefono.eq.${datos.telefono}`)
      .in("estado", ["pendiente", "contactado"])
      .limit(1)
      .maybeSingle();

    if (repetida) {
      return {
        ok: false,
        valores,
        errores: {
          _form:
            "Ya tenemos una solicitud tuya en camino. Te contactamos lo antes posible.",
        },
      };
    }

    const { error: errorSolicitud } = await supabase
      .from("dchplm_menu_solicitudes")
      .insert({
        nombre: datos.nombre,
        apellido_paterno: datos.apellido_paterno,
        apellido_materno: datos.apellido_materno,
        correo: datos.correo,
        telefono: datos.telefono,
        negocio: datos.negocio,
        facebook_url: normalizarRed(datos.facebook_url) || null,
        instagram_url: normalizarRed(datos.instagram_url) || null,
        tiktok_url: normalizarRed(datos.tiktok_url) || null,
      });

    if (errorSolicitud) {
      console.error("[unete] no se pudo guardar la solicitud:", errorSolicitud.message);
      return {
        ok: false,
        valores,
        errores: { _form: "No pudimos guardar tu solicitud. Inténtalo de nuevo." },
      };
    }

    // Copia para la bandeja de contacto. Si falla, la solicitud ya quedó
    // guardada, así que no se le dice al usuario que hubo error.
    const redes = [
      datos.facebook_url && `Facebook: ${normalizarRed(datos.facebook_url)}`,
      datos.instagram_url && `Instagram: ${normalizarRed(datos.instagram_url)}`,
      datos.tiktok_url && `TikTok: ${normalizarRed(datos.tiktok_url)}`,
    ].filter(Boolean);

    const { error: errorContacto } = await supabase.from("contacto").insert({
      nombre: datos.nombre,
      apellido: `${datos.apellido_paterno} ${datos.apellido_materno}`,
      correo: datos.correo,
      telefono: datos.telefono,
      asunto: "Menú de Negocio",
      origen: "Menú Cd. Hidalgo",
      mensaje: [`Negocio: ${datos.negocio}`, ...redes].join("\n"),
    });

    if (errorContacto) {
      console.error("[unete] la copia en contacto falló:", errorContacto.message);
    }

    return { ok: true, errores: {} };
  } catch (error) {
    // Un problema de configuración no es lo mismo que uno de la base: al
    // visitante le decimos lo mismo, pero en la terminal queda clarísimo, y
    // en desarrollo se muestra en pantalla para no perder tiempo adivinando.
    if (error instanceof ConfiguracionFaltante) {
      console.error(`\n[unete] CONFIGURACIÓN INCOMPLETA: ${error.message}\n`);
      return {
        ok: false,
        valores,
        errores: {
          _form:
            process.env.NODE_ENV === "development"
              ? `Configuración incompleta: ${error.message}`
              : "No pudimos guardar tu solicitud. Inténtalo de nuevo.",
        },
      };
    }

    console.error("[unete] error inesperado:", error);
    return {
      ok: false,
      valores,
      errores: { _form: "No pudimos guardar tu solicitud. Inténtalo de nuevo." },
    };
  }
}
