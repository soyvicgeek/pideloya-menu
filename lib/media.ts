/**
 * URLs de las imágenes guardadas en R2.
 *
 * En la base se guarda la llave del objeto, no la URL: con una URL no se le
 * puede pedir a R2 que borre nada, y amarra el proyecto al proveedor. La URL
 * pública se arma aquí.
 */

const BASE = (
  process.env.NEXT_PUBLIC_MEDIA_BASE_URL || "https://img.cdhidalgo.com"
).replace(/\/+$/, "");

/**
 * La URL del objeto tal cual, sin transformar.
 *
 * Aquí no se usan las transformaciones de Cloudflare a propósito: este sitio ya
 * pasa todo por `next/image`, que redimensiona y sirve WebP o AVIF por su
 * cuenta. Optimizar dos veces no mejora nada y sí se paga dos veces.
 */
export function urlImagen(path: string | null): string | null {
  return path ? `${BASE}/${path}` : null;
}

/**
 * La imagen a mostrar, venga de donde venga.
 *
 * Mientras queden filas apuntando a hosts externos —hoy varias siguen en
 * ImgBB— hay que leer las dos. Cuando no queden, esto se puede tirar.
 */
export function resolverImagen(
  path: string | null,
  urlHeredada: string | null,
): string | null {
  return urlImagen(path) ?? urlHeredada ?? null;
}
