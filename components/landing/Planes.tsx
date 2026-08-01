import Link from "next/link";
import { Check, Clock, MessageCircle, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { whatsappConMensaje } from "@/components/SiteFooter";
import type { PlanPublico } from "@/lib/planes";

const dinero = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

type Beneficio = { texto: string; proximamente?: boolean };


function beneficios(plan: PlanPublico): Beneficio[] {
  const platillos = plan.platillosIlimitados
    ? "Platillos ilimitados"
    : `Hasta ${plan.maxPlatillos} platillos, por menú con foto y precio`;

  const menus =
    plan.maxMenus === 1
      ? "1 menú con tu propia dirección"
      : `${plan.maxMenus} ${plan.nombre === "Premium" ? "menús" : "menús"}, cada uno con su propia dirección y redes sociales`;

  const base: Beneficio[] = [
    { texto: platillos },
    { texto: menus },
    { texto: "Código QR único para tus mesas", proximamente: true },
    { texto: "Contacto directo por WhatsApp" },
    { texto: "Actualizaciones periódicas gratis" },
  ];

  if (plan.nombre === "Pro") {
    return [
      ...base,
      { texto: "Tu negocio en el mapa de la ciudad" },
      { texto: "1 publicación semanal en nuestras redes sobre tu negocio" },
      { texto: "Sin anuncios de terceros en tu menú" },
    ];
  }

  if (plan.nombre === "Premium") {
    return [
      ...base,
      { texto: "Tu negocio en el mapa de la ciudad" },
      { texto: "2 publicaciones semanales en nuestras redes sobre tu negocio" },
      { texto: "Sin anuncios de terceros en tu menú" },
    ];
  }

  return base;
}

function TarjetaPlan({ plan, destacado }: { plan: PlanPublico; destacado: boolean }) {
  const esGratis = plan.precioMensual === 0;

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-3xl border bg-white p-6 shadow-xs",
        destacado ? "border-brand-500 shadow-lg shadow-brand-500/10" : "border-outline/70",
      )}
    >
      {destacado && (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm">
          <Star className="size-3" />
          El más elegido
        </span>
      )}

      <h3 className="font-display text-lg font-black text-foreground">{plan.nombre}</h3>

      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="font-display text-4xl font-black text-foreground">
          {esGratis ? "Gratis" : dinero.format(plan.precioMensual)}
        </span>
        {!esGratis && (
          <span className="text-sm font-bold text-foreground/40">/ mes</span>
        )}
      </div>

      {!esGratis && (
        <p className="mt-1 text-xs font-medium text-foreground/45">
          o {dinero.format(plan.precioAnual)} al año — te ahorras 2 meses
        </p>
      )}
      {esGratis && (
        <p className="mt-1 text-xs font-medium text-foreground/45">
          Para siempre, sin tarjeta
        </p>
      )}

      <ul className="mt-6 flex-1 space-y-2.5">
        {beneficios(plan).map(({ texto, proximamente }) => (
          <li key={texto} className="flex items-start gap-2.5">
            <span
              className={cn(
                "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                proximamente
                  ? "bg-surface-container text-foreground/35"
                  : destacado
                    ? "bg-brand-100 text-brand-700"
                    : "bg-surface-container text-foreground/60",
              )}
            >
              {proximamente ? (
                <Clock className="size-3 stroke-3" />
              ) : (
                <Check className="size-3 stroke-3" />
              )}
            </span>
            <span
              className={cn(
                "flex flex-wrap items-center gap-1.5 text-sm leading-snug font-medium",
                proximamente ? "text-foreground/45" : "text-foreground/70",
              )}
            >
              {texto}
              {proximamente && (
                <span className="rounded-full bg-surface-container px-2 py-0.5 text-[9px] font-extrabold tracking-wider text-foreground/45 uppercase">
                  Muy pronto
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {esGratis ? (
        <Link
          href="/unete"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-xl border border-outline bg-white px-5 text-sm font-bold text-foreground transition-all hover:border-brand-400 hover:text-brand-700 active:scale-[0.98]"
        >
          Empezar gratis
        </Link>
      ) : (
        <a
          href={whatsappConMensaje(
            `Hola, me interesa el plan ${plan.nombre} para el menú digital de mi negocio.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition-all active:scale-[0.98]",
            destacado
              ? "bg-brand-600 text-white shadow-sm hover:bg-brand-700"
              : "border border-outline bg-white text-foreground hover:border-brand-400 hover:text-brand-700",
          )}
        >
          <MessageCircle className="size-4" />
          Contratar por WhatsApp
        </a>
      )}
    </div>
  );
}

export function Planes({ planes }: { planes: PlanPublico[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {planes.map((plan) => (
        <TarjetaPlan key={plan.nombre} plan={plan} destacado={plan.nombre === "Pro"} />
      ))}
    </div>
  );
}
