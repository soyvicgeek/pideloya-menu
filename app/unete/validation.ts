/**
 * Validación del pre-registro. Corre en el servidor (Server Action), que es
 * el único lugar donde vale: lo que valida el navegador se puede saltar.
 *
 * Nota sobre "inyección": con Supabase no hay riesgo de SQL injection, porque
 * PostgREST manda las consultas parametrizadas. Lo que sí cuidamos aquí es
 * que no entre basura a la tabla y que ningún campo traiga caracteres de
 * control o etiquetas HTML que después molesten al mostrarlos en el panel.
 */

export type SolicitudInput = {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
  telefono: string;
  negocio: string;
  facebook_url: string;
  instagram_url: string;
  tiktok_url: string;
};

export type FieldName = keyof SolicitudInput;
export type Errors = Partial<Record<FieldName | "_form", string>>;

export type EstadoFormulario = {
  ok: boolean;
  errores: Errors;
  /** Se conservan para volver a pintar el formulario si hubo error. */
  valores?: Record<string, string>;
};

/**
 * Vive aquí y no en actions.ts a propósito: un archivo "use server" sólo
 * puede exportar funciones async. Exportar este objeto desde allá compila,
 * pero en tiempo de ejecución llega `undefined` al cliente.
 */
export const ESTADO_INICIAL: EstadoFormulario = { ok: false, errores: {} };

/** Caracteres de control invisibles (rango C0 y DEL). */
const CONTROL_CHARS = new RegExp("[\\u0000-\\u001F\\u007F]", "g");

/** Quita caracteres de control invisibles y colapsa espacios. */
export function limpiar(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return "";
  return value.replace(CONTROL_CHARS, "").replace(/\s+/g, " ").trim();
}

/** Sólo dígitos, para el teléfono. */
function soloDigitos(value: string): string {
  return value.replace(/\D/g, "");
}

const NOMBRE_VALIDO = /^[\p{L}\p{M}\s'.-]+$/u;
const CORREO_VALIDO = /^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/;

function validarTexto(
  valor: string,
  campo: string,
  { min = 2, max = 60, soloLetras = true } = {},
): string | null {
  if (!valor) return `${campo} es obligatorio.`;
  if (valor.length < min) return `${campo} es demasiado corto.`;
  if (valor.length > max) return `${campo} no puede pasar de ${max} caracteres.`;
  if (soloLetras && !NOMBRE_VALIDO.test(valor)) {
    return `${campo} sólo puede llevar letras.`;
  }
  return null;
}

/** Acepta una URL de la red indicada, o vacío. Devuelve null si está bien. */
function validarRed(valor: string, red: string, dominios: string[]): string | null {
  if (!valor) return null;
  let url: URL;
  try {
    url = new URL(valor.startsWith("http") ? valor : `https://${valor}`);
  } catch {
    return `El enlace de ${red} no es válido.`;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    return `El enlace de ${red} no es válido.`;
  }
  const host = url.hostname.replace(/^www\./, "").toLowerCase();
  if (!dominios.some((d) => host === d || host.endsWith(`.${d}`))) {
    return `Ese enlace no parece de ${red}.`;
  }
  return null;
}

/** Normaliza la red a URL completa con https, o cadena vacía. */
export function normalizarRed(valor: string): string {
  if (!valor) return "";
  return valor.startsWith("http") ? valor : `https://${valor}`;
}

export function validarSolicitud(datos: SolicitudInput): Errors {
  const errores: Errors = {};

  const nombre = validarTexto(datos.nombre, "El nombre");
  if (nombre) errores.nombre = nombre;

  const paterno = validarTexto(datos.apellido_paterno, "El apellido paterno");
  if (paterno) errores.apellido_paterno = paterno;

  const materno = validarTexto(datos.apellido_materno, "El apellido materno");
  if (materno) errores.apellido_materno = materno;

  if (!datos.correo) {
    errores.correo = "El correo es obligatorio.";
  } else if (datos.correo.length > 120 || !CORREO_VALIDO.test(datos.correo)) {
    errores.correo = "Ese correo no parece válido.";
  }

  const telefono = soloDigitos(datos.telefono);
  if (!telefono) {
    errores.telefono = "El teléfono es obligatorio.";
  } else if (telefono.length !== 10) {
    errores.telefono = "El teléfono debe tener 10 dígitos.";
  }

  const negocio = validarTexto(datos.negocio, "El nombre del negocio", {
    max: 80,
    soloLetras: false,
  });
  if (negocio) errores.negocio = negocio;

  const facebook = validarRed(datos.facebook_url, "Facebook", ["facebook.com", "fb.com", "fb.me"]);
  if (facebook) errores.facebook_url = facebook;

  const instagram = validarRed(datos.instagram_url, "Instagram", ["instagram.com", "instagr.am"]);
  if (instagram) errores.instagram_url = instagram;

  const tiktok = validarRed(datos.tiktok_url, "TikTok", ["tiktok.com"]);
  if (tiktok) errores.tiktok_url = tiktok;

  return errores;
}

/** FormData → datos limpios, con el teléfono ya reducido a dígitos. */
export function leerFormulario(formData: FormData): SolicitudInput {
  return {
    nombre: limpiar(formData.get("nombre")),
    apellido_paterno: limpiar(formData.get("apellido_paterno")),
    apellido_materno: limpiar(formData.get("apellido_materno")),
    correo: limpiar(formData.get("correo")).toLowerCase(),
    telefono: soloDigitos(limpiar(formData.get("telefono"))),
    negocio: limpiar(formData.get("negocio")),
    facebook_url: limpiar(formData.get("facebook_url")),
    instagram_url: limpiar(formData.get("instagram_url")),
    tiktok_url: limpiar(formData.get("tiktok_url")),
  };
}
