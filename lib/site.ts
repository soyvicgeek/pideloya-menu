/**
 * URL pública del sitio. La necesitan las etiquetas Open Graph: Facebook y
 * WhatsApp exigen URLs absolutas, no relativas.
 *
 * En local queda http://localhost:3000 y en producción se define con
 * NEXT_PUBLIC_SITE_URL (en Vercel, con la del proyecto).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://menu.cdhidalgo.com")
).replace(/\/+$/, "");

export const SITE_NAME = "Pídelo Ya";

/**
 * El logo que se usa mientras el negocio no sube el suyo.
 *
 * El hueco del logo es un círculo con borde de color en mitad de la portada:
 * dejarlo vacío se lee como una imagen que no cargó, no como algo pendiente.
 * Con la marca de MiMENÚ el menú se ve terminado desde el primer día, que es
 * justo lo que hace falta cuando el dueño lo comparte antes de acabar de
 * armarlo.
 *
 * Vive aquí y no en `lib/menu.ts` porque lo usan tanto ese módulo como
 * `MenuClient`, y ésos ya se referencian entre sí para los tipos. Este archivo
 * no importa nada, así que nadie termina en un ciclo.
 */
export const LOGO_MIMENU = "/mimenu.svg";

/**
 * Portada para redes sociales.
 *
 * Se usa en la landing y como respaldo cuando un negocio comparte su menú sin
 * haber subido logo ni portada: mejor la marca que un enlace pelón.
 *
 * Va en JPG y no en WebP a propósito: el rastreador de Facebook no renderiza
 * WebP en `og:image`, y el enlace termina sin vista previa. El WebP se queda en
 * public para cualquier otro uso.
 *
 * Mide exactamente 1200x630, que es lo que esperan Facebook y WhatsApp.
 */
export const OG_IMAGE = {
  url: `${SITE_URL}/og-menu.jpg`,
  width: 1200,
  height: 630,
  alt: "MiMENÚ · tu menú, a un click",
} as const;

/**
 * Comunidad de De Cd Hidalgo Pal Mundo. Vive aquí y no repartido por la
 * landing para que actualizar un número sea un solo cambio.
 */
export const REDES = [
  {
    nombre: "Facebook",
    seguidores: "40 mil+",
    url: "https://www.facebook.com/gociudadhidalgo",
  },
  {
    nombre: "Instagram",
    seguidores: "1100 +",
    url: "https://www.instagram.com/gociudadhidalgo",
  },
  {
    nombre: "TikTok",
    seguidores: "6 mil+",
    url: "https://www.tiktok.com/@gociudadhidalgo",
  },
] as const;

/**
 * Suma de seguidores, no de personas únicas: mucha gente nos sigue en más de
 * una red. Por eso se dice "seguidores" y no "personas".
 */
export const SEGUIDORES_TOTALES = "150 mil+";
