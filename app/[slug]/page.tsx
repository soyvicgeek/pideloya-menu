import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MenuClient } from "@/components/MenuClient";
import { getMenuBySlug } from "@/lib/menu";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

/**
 * El menú es totalmente dinámico: se consulta Supabase en cada visita.
 *
 * Sin `generateStaticParams` y sin caché, porque:
 *   - los negocios se dan de alta a cualquier hora y deben quedar en línea al
 *     instante, sin recompilar ni esperar a que expire nada
 *   - lo que el dueño cambia en el panel se ve al refrescar la página
 *   - el build no depende de que Supabase responda, ni crece con la cantidad
 *     de negocios
 *
 * El costo es una consulta por visita. Si algún día pesa, el punto a tocar es
 * `getMenuBySlug` (cachear la lectura), no esta configuración.
 */
export const dynamic = "force-dynamic";

/**
 * Lo que ve alguien cuando pega el enlace del menú en Facebook o WhatsApp:
 * la portada del negocio como imagen, su nombre como título y su descripción.
 *
 * Facebook exige URLs absolutas, por eso `metadataBase` en app/layout.tsx.
 * Si cambias la portada desde el panel, Facebook seguirá mostrando la vieja
 * hasta que le pidas releer el enlace en developers.facebook.com/tools/debug
 * (cachea las tarjetas por su cuenta, no es algo que controlemos).
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const menu = await getMenuBySlug(slug);

  if (!menu) {
    return { title: "Menú no encontrado" };
  }

  const url = `${SITE_URL}/${slug}`;
  const description =
    menu.description || `Consulta el menú de ${menu.name} en Ciudad Hidalgo, Michoacán.`;

  // La portada manda; si el negocio no subió banner, se usa el logo.
  const image = menu.banner_url || menu.logo_url;
  const images = image
    ? [{ url: image, alt: `Portada de ${menu.name}` }]
    : undefined;

  return {
    title: `${menu.name} · Menú`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      locale: "es_MX",
      title: menu.name,
      description,
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: menu.name,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function MenuPage({ params }: PageProps) {
  const { slug } = await params;
  const menu = await getMenuBySlug(slug);

  if (!menu) notFound();

  return <MenuClient menu={menu} />;
}
