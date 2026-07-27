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
    seguidores: "110 mil+",
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
