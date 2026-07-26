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
