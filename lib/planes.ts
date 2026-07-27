import { cache } from "react";
import { supabase } from "@/lib/supabase";

/**
 * Los planes que se muestran en la landing salen de la base, no del código:
 * si cambias max_items o el precio en Supabase, la página lo refleja sola.
 *
 * Lo que NO vive en la base son los beneficios de difusión (reseñas, mapa,
 * posts en redes), porque son trabajo humano y no límites del sistema. Esos
 * se describen aquí.
 */

export type PlanPublico = {
  nombre: string;
  precioMensual: number;
  precioAnual: number;
  maxPlatillos: number;
  maxMenus: number;
  platillosIlimitados: boolean;
};

/** A partir de este tope lo llamamos "ilimitado" en pantalla. */
const UMBRAL_ILIMITADO = 1000;

export const getPlanesPublicos = cache(async (): Promise<PlanPublico[]> => {
  const { data, error } = await supabase
    .from("dchplm_menu_subscription_plans")
    .select("name, price_monthly, price_yearly, max_items, max_menus")
    .eq("active", true)
    .order("price_monthly", { ascending: true });

  if (error) {
    console.error("[planes] no se pudieron leer:", error.message);
    return [];
  }

  return (data ?? []).map((plan) => ({
    nombre: plan.name,
    precioMensual: Number(plan.price_monthly),
    precioAnual: Number(plan.price_yearly),
    maxPlatillos: plan.max_items,
    maxMenus: plan.max_menus,
    platillosIlimitados: plan.max_items >= UMBRAL_ILIMITADO,
  }));
});

/** Respaldo por si Supabase no responde: la landing nunca se queda sin planes. */
export const PLANES_RESPALDO: PlanPublico[] = [
  {
    nombre: "Gratis",
    precioMensual: 0,
    precioAnual: 0,
    maxPlatillos: 10,
    maxMenus: 1,
    platillosIlimitados: false,
  },
  {
    nombre: "Pro",
    precioMensual: 149,
    precioAnual: 1490,
    maxPlatillos: 25,
    maxMenus: 3,
    platillosIlimitados: false,
  },
  {
    nombre: "Premium",
    precioMensual: 399,
    precioAnual: 3990,
    maxPlatillos: 999999,
    maxMenus: 5,
    platillosIlimitados: true,
  },
];
