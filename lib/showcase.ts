import { cache } from "react";
import { supabase } from "@/lib/supabase";
import { resolverImagen } from "@/lib/media";

/**
 * The businesses featured on the landing page.
 *
 * Who shows up is not decided by seniority or by plan: the CRM turns it on
 * through `dchplm_menus.show_on_landing`. This is our storefront, and only
 * what looks good belongs in it — a menu with a logo and real dishes loaded,
 * not whichever account was created last with a half-filled profile.
 *
 * Among the ones turned on, the most recent win: the section claims these
 * businesses "already joined", and new sign-ups tell that story better than
 * the same faces every month.
 */

/** How many fit in the row without it looking cramped. */
export const SHOWCASE_LIMIT = 5;

export type ShowcaseBusiness = {
  slug: string;
  name: string;
  logo: string | null;
};

export const getShowcaseBusinesses = cache(
  async (): Promise<ShowcaseBusiness[]> => {
    const { data, error } = await supabase
      .from("dchplm_menus")
      .select("slug, name, logo_path, logo_url, created_at")
      .eq("show_on_landing", true)
      // An unpublished menu stays out even when it is turned on: the link
      // would lead to a page that does not exist.
      .eq("active", true)
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(SHOWCASE_LIMIT);

    if (error) {
      console.error("[showcase] could not read the businesses:", error.message);
      return [];
    }

    return (data ?? []).map((menu) => ({
      slug: menu.slug,
      name: menu.name,
      logo: resolverImagen(menu.logo_path, menu.logo_url),
    }));
  },
);
