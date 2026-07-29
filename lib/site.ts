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
 * Portada para redes sociales.
 *
 * Se usa en la landing y como respaldo cuando un negocio comparte su menú sin
 * haber subido logo ni portada: mejor la marca que un enlace pelón.
 *
 * Facebook y WhatsApp esperan 1200x630. Esta mide 1787x880, casi la misma
 * proporción, así que se recorta un poco de los lados y nada importante queda
 * fuera.
 */
export const OG_IMAGE = {
  url: `${SITE_URL}/og-menu.webp`,
  width: 1787,
  height: 880,
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
