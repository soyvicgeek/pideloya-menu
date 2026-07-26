import { cache } from "react";
import { supabase } from "@/lib/supabase";
import { buildHoursList, isOpenNow } from "@/lib/hours";
import type {
  Category,
  HorizontalCategory,
  MenuData,
  MenuItem,
  Variant,
} from "@/components/MenuClient";

/** Platillos sin foto: evita que <Image> reciba un src vacío. */
export const PLACEHOLDER_IMAGE = "/placeholder-dish.png";

/** Bucket para platillos cuya categoría no está asignada al menú. */
const UNCATEGORIZED_ID = "sin-categoria";

/** Palabras clave → icono de lucide que ya mapea MenuClient. */
const ICON_RULES: { icon: HorizontalCategory["iconName"]; keywords: string[] }[] = [
  { icon: "Percent", keywords: ["promo", "oferta", "descuento", "combo", "paquete", "especial"] },
  { icon: "Coffee", keywords: ["bebida", "cafe", "café", "refresco", "jugo", "agua", "cerveza", "malteada", "smoothie", "drink"] },
  { icon: "Flame", keywords: ["alita", "parrilla", "asado", "picante", "taco", "hamburguesa", "carne", "costilla", "bbq", "pizza", "brasa"] },
];

function pickIcon(categoryName: string): HorizontalCategory["iconName"] {
  const name = categoryName.toLowerCase();
  for (const rule of ICON_RULES) {
    if (rule.keywords.some((keyword) => name.includes(keyword))) return rule.icon;
  }
  return "Utensils";
}

/** Forma que devuelve el select anidado de PostgREST. */
type RawVariantOption = {
  id: string;
  name: string;
  additional_price: number;
  display_order: number;
};

type RawVariant = {
  id: string;
  name: string;
  is_required: boolean;
  multi_select: boolean;
  display_order: number;
  dchplm_menu_item_variant_options: RawVariantOption[] | null;
};

type RawItem = {
  id: string;
  name: string;
  description: string | null;
  base_price: number;
  image_url: string | null;
  is_featured: boolean;
  category_id: string | null;
  created_at: string | null;
  dchplm_menu_item_variants: RawVariant[] | null;
};

function mapVariants(raw: RawVariant[] | null): Variant[] | undefined {
  if (!raw || raw.length === 0) return undefined;

  const variants = [...raw]
    .sort((a, b) => a.display_order - b.display_order)
    .map<Variant>((variant) => ({
      id: variant.id,
      name: variant.name,
      is_required: variant.is_required,
      multi_select: variant.multi_select,
      options: [...(variant.dchplm_menu_item_variant_options ?? [])]
        .sort((a, b) => a.display_order - b.display_order)
        .map((option) => ({
          id: option.id,
          name: option.name,
          additional_price: Number(option.additional_price),
        })),
    }))
    // Una variante sin opciones no le sirve de nada al cliente.
    .filter((variant) => variant.options.length > 0);

  return variants.length > 0 ? variants : undefined;
}

function mapItem(raw: RawItem): MenuItem {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description ?? "",
    price: Number(raw.base_price),
    image_url: raw.image_url || PLACEHOLDER_IMAGE,
    variants: mapVariants(raw.dchplm_menu_item_variants),
  };
}

/**
 * Arma el menú público de un slug leyendo el esquema dchplm_menu_*.
 * Devuelve null si el slug no existe o el menú está desactivado.
 *
 * Va envuelto en cache() porque generateMetadata y la página piden lo mismo
 * en el mismo render: así se consulta una sola vez.
 */
export const getMenuBySlug = cache(async (slug: string): Promise<MenuData | null> => {
  const { data: menuRow, error: menuError } = await supabase
    .from("dchplm_menus")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (menuError) {
    console.error(`[menu] error leyendo el menú "${slug}":`, menuError.message);
    return null;
  }
  if (!menuRow) return null;

  const [itemsResult, assignmentsResult] = await Promise.all([
    supabase
      .from("dchplm_menu_items")
      .select(
        `id, name, description, base_price, image_url, is_featured, category_id, created_at,
         dchplm_menu_item_variants (
           id, name, is_required, multi_select, display_order,
           dchplm_menu_item_variant_options ( id, name, additional_price, display_order )
         )`,
      )
      .eq("menu_id", menuRow.id)
      .eq("active", true)
      .order("created_at", { ascending: true }),

    supabase
      .from("dchplm_menu_category_assignments")
      .select("display_order, dchplm_menu_categories ( id, name, active )")
      .eq("menu_id", menuRow.id)
      .order("display_order", { ascending: true }),
  ]);

  if (itemsResult.error) {
    console.error(`[menu] error leyendo platillos de "${slug}":`, itemsResult.error.message);
  }
  if (assignmentsResult.error) {
    console.error(`[menu] error leyendo categorías de "${slug}":`, assignmentsResult.error.message);
  }

  const rawItems = (itemsResult.data ?? []) as unknown as RawItem[];

  // Categorías que el dueño asignó a su menú, en su orden.
  const assignedCategories = (assignmentsResult.data ?? [])
    .map((row) => {
      const category = row.dchplm_menu_categories as unknown as {
        id: string
        name: string
        active: boolean
      } | null;
      return category && category.active ? category : null;
    })
    .filter((category): category is { id: string; name: string; active: boolean } =>
      category !== null,
    );

  const categories: Category[] = [];
  const usedItemIds = new Set<string>();

  for (const category of assignedCategories) {
    const items = rawItems.filter((item) => item.category_id === category.id);
    if (items.length === 0) continue; // no pintamos secciones vacías

    items.forEach((item) => usedItemIds.add(item.id));
    categories.push({ id: category.id, name: category.name, items: items.map(mapItem) });
  }

  // Platillos con categoría no asignada (o sin categoría) no se pueden perder.
  const orphans = rawItems.filter((item) => !usedItemIds.has(item.id));
  if (orphans.length > 0) {
    categories.push({
      id: UNCATEGORIZED_ID,
      name: "Más del menú",
      items: orphans.map(mapItem),
    });
  }

  const horizontalCategories: HorizontalCategory[] = categories.map((category) => ({
    id: category.id,
    name: category.name.toUpperCase(),
    iconName: pickIcon(category.name),
  }));

  const featured = rawItems.filter((item) => item.is_featured).map(mapItem);

  return {
    name: menuRow.name,
    description: menuRow.description ?? "",
    primary_color: menuRow.primary_color ?? "#F01766",
    secondary_color: menuRow.secondary_color ?? "#743b8c",
    logo_url: menuRow.logo_url ?? "",
    banner_url: menuRow.banner_url ?? "",
    address: menuRow.address ?? "",
    whatsapp_phone: menuRow.whatsapp_phone ?? "",
    phone: menuRow.phone ?? "",
    isOpen: isOpenNow(menuRow.hours_json),
    facebook_url: menuRow.facebook_url ?? undefined,
    instagram_url: menuRow.instagram_url ?? undefined,
    tiktok_url: menuRow.tiktok_url ?? undefined,
    hours: buildHoursList(menuRow.hours_json),
    featured,
    categories,
    horizontalCategories,
  };
});

/** Slugs activos, para prerenderizar los menús en el build. */
export async function getActiveMenuSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("dchplm_menus")
    .select("slug")
    .eq("active", true);

  if (error) {
    console.error("[menu] no se pudieron listar los slugs:", error.message);
    return [];
  }
  return (data ?? []).map((row) => row.slug);
}
