import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

/**
 * Cliente con llave de servicio. SOLO para código de servidor.
 *
 * El `import "server-only"` de arriba hace que el build truene si algún día
 * este archivo termina importado desde un componente de cliente. Es la red de
 * seguridad para que esta llave nunca llegue al navegador.
 *
 * Se usa para escribir en tablas cerradas por RLS (dchplm_menu_solicitudes),
 * donde el navegador no tiene ni debe tener permiso.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Error de configuración, para distinguirlo de un fallo de la base. */
export class ConfiguracionFaltante extends Error {}

/**
 * Una llave de servicio real es un JWT (`eyJ...`) o una llave nueva
 * (`sb_secret_...`). Cualquier otra cosa es el valor de relleno del .env.
 */
function pareceLlaveReal(valor: string): boolean {
  return valor.startsWith("eyJ") || valor.startsWith("sb_secret_");
}

export function getSupabaseAdmin() {
  if (!url) {
    throw new ConfiguracionFaltante("Falta NEXT_PUBLIC_SUPABASE_URL en el servidor.");
  }
  if (!serviceKey) {
    throw new ConfiguracionFaltante(
      "Falta SUPABASE_SERVICE_ROLE_KEY en el servidor. Cópiala de Supabase → Project Settings → API Keys → service_role y ponla en .env.local (sin NEXT_PUBLIC_).",
    );
  }
  if (!pareceLlaveReal(serviceKey)) {
    throw new ConfiguracionFaltante(
      "SUPABASE_SERVICE_ROLE_KEY sigue con el valor de relleno del .env.local. Reemplázalo por la llave real de Supabase → Project Settings → API Keys → service_role.",
    );
  }

  return createClient<Database>(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
