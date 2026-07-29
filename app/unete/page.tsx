import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";

import { SITE_NAME, SITE_URL } from "@/lib/site";
import { UneteForm } from "./UneteForm";
import { SocialFooter } from "./SocialFooter";

const TITULO = "Tu menú digital gratis";
const DESCRIPCION =
  "Registra tu negocio de Ciudad Hidalgo y ten tu menú en línea con tu propia dirección, sin costo.";

export const metadata: Metadata = {
  title: `${TITULO} · ${SITE_NAME}`,
  description: DESCRIPCION,
  alternates: { canonical: `${SITE_URL}/unete` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/unete`,
    siteName: SITE_NAME,
    locale: "es_MX",
    title: TITULO,
    description: DESCRIPCION,
  },
};

const beneficios = [
  "Tu propia dirección: menu.cdhidalgo.com/tu-negocio",
  "Hasta 10 platillos con foto y precio, gratis",
  "Tus clientes te contactan por WhatsApp con un toque",
];

export default function UnetePage() {
  return (
    <div className="min-h-dvh bg-surface">
      <main className="mx-auto w-full max-w-md px-5 pt-10 pb-4">
        {/* Encabezado */}
        <div className="text-center">
          {/*
            El SVG ya trae el naranja de la marca, así que no lleva
            `brightness-0` —eso teñía de negro el PNG blanco—. Y con el tamaño
            fijo del viewBox, `fill` y `sizes` sobran.
          */}
          <Image
            src="/mimenu-horizontal.svg"
            alt={SITE_NAME}
            width={192}
            height={64}
            className="mx-auto mb-5 h-16 w-auto"
            priority
          />

          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-brand-700">
            Gratis para tu negocio
          </span>

          <h1 className="mt-4 font-display text-3xl font-black leading-tight tracking-tight text-foreground">
            Tu menú digital,
            <span className="text-brand-600"> sin costo</span>
          </h1>

          <p className="mt-3 text-sm font-medium leading-relaxed text-foreground/55">
            Déjanos tus datos y te contactamos para activarlo. No necesitas saber de
            tecnología ni instalar nada.
          </p>
        </div>

        {/* Beneficios */}
        <ul className="mt-7 space-y-2.5">
          {beneficios.map((texto) => (
            <li key={texto} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <Check className="size-3 stroke-3" />
              </span>
              <span className="text-sm font-medium leading-snug text-foreground/70">
                {texto}
              </span>
            </li>
          ))}
        </ul>

        {/* Formulario */}
        <div className="mt-8 rounded-3xl border border-outline/70 bg-white p-6 shadow-xs">
          <UneteForm />
        </div>
      </main>

      <SocialFooter />
    </div>
  );
}
