import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MenuClient } from "@/components/MenuClient";
import { getActiveMenuSlugs, getMenuBySlug } from "@/lib/menu";

type PageProps = { params: Promise<{ slug: string }> };

/** Se regenera cada 5 min: los cambios del panel se ven solos, sin redeploy. */
export const revalidate = 300;

/** Un slug nuevo (dado de alta después del build) se renderiza al vuelo. */
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getActiveMenuSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const menu = await getMenuBySlug(slug);

  if (!menu) {
    return { title: "Menú no encontrado" };
  }

  const description =
    menu.description || `Consulta el menú de ${menu.name} y haz tu pedido por WhatsApp.`;
  const image = menu.banner_url || menu.logo_url;

  return {
    title: `${menu.name} · Menú`,
    description,
    openGraph: {
      title: menu.name,
      description,
      type: "website",
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function MenuPage({ params }: PageProps) {
  const { slug } = await params;
  const menu = await getMenuBySlug(slug);

  if (!menu) notFound();

  return <MenuClient menu={menu} />;
}
