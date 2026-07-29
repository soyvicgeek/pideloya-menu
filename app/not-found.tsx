import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Store } from "lucide-react";

import { SiteFooter } from "@/components/SiteFooter";

/*
 * Sin `export const metadata`: el App Router lo ignora en `not-found`, así que
 * el título lo pone el layout. Y no hace falta `noindex`, porque la respuesta
 * ya sale con código 404 y los buscadores no indexan eso.
 */

/**
 * El 404 del sitio, que también atiende los menús inexistentes.
 *
 * De lejos el caso más común es alguien tecleando mal la dirección de un
 * negocio, o abriendo un menú que se dio de baja. Por eso el texto habla de
 * eso y no de un "error", y por eso la segunda salida es dar de alta un
 * negocio: quien llegó buscando un menú suele ser justo el público de /unete.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
        {/* Mancha de color, muy tenue: da profundidad sin competir con el texto. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-[90px]"
        />

        <div className="relative z-10 flex w-full max-w-md flex-col items-center">
          <Image
            src="/mimenu.svg"
            alt="MiMENÚ"
            width={96}
            height={96}
            className="mb-8 size-24"
            priority
          />

          {/*
            El 404 va grande y en el naranja de marca, como cifra y no como
            icono: es lo que le dice a alguien técnico qué pasó, sin robarle
            el lugar al mensaje en español.
          */}
          <p className="font-display text-7xl leading-none font-black tracking-tight text-brand-500/25 sm:text-8xl">
            404
          </p>

          <h1 className="font-display mt-4 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            Aquí no hay menú
          </h1>

          <p className="mt-3 text-sm leading-relaxed font-medium text-foreground/55">
            La dirección que abriste no existe, cambió de nombre o el negocio
            dio de baja su menú. Revisa que esté bien escrita.
          </p>

          <div className="mt-8 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
            <Link
              href="/"
              className="font-display inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/20 transition-all duration-150 hover:bg-brand-700 active:scale-95"
            >
              <ArrowLeft className="size-4" />
              Ir al inicio
            </Link>

            <Link
              href="/unete"
              className="font-display inline-flex items-center justify-center gap-2 rounded-2xl border border-outline bg-white px-6 py-3.5 text-sm font-bold text-foreground/70 shadow-xs transition-all duration-150 hover:border-brand-400 hover:text-brand-600 active:scale-95"
            >
              <Store className="size-4" />
              Registrar mi negocio
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
