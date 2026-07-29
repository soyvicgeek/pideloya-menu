import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MenuClient } from "@/components/MenuClient";
import { SiteFooter } from "@/components/SiteFooter";
import { getMenuBySlug } from "@/lib/menu";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

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

  /*
   * La portada del negocio manda, luego su logo. Si no tiene ninguna de las
   * dos, se cae a la imagen de la marca: un enlace sin vista previa parece
   * roto en WhatsApp, y eso lo abre menos gente.
   */
  const propia = menu.banner_url || menu.logo_url;
  const images = propia
    ? [{ url: propia, alt: `Portada de ${menu.name}` }]
    : [OG_IMAGE];
  const image = propia || OG_IMAGE.url;

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
      card: "summary_large_image",
      title: menu.name,
      description,
      images: [image],
    },
  };
}

export default async function MenuPage({ params }: PageProps) {
  const { slug } = await params;
  const menu = await getMenuBySlug(slug);

  if (!menu) notFound();

  return (
    <>
      <MenuClient menu={menu} />
      {/*
       * El pie va aquí y no dentro de MenuClient: ese es un componente de
       * cliente enorme, y el pie es estático. Fuera se renderiza en el
       * servidor y no engorda el paquete que descarga el celular.
       *
       * El padding de abajo deja libre el botón flotante de WhatsApp, que va
       * fijo en la esquina y taparía los iconos de redes.
       */}
      <div className="pb-24">
        <SiteFooter />
      </div>
    </>
  );
}
