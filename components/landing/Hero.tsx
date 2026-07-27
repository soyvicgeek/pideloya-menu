"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { REDES, SEGUIDORES_TOTALES } from "@/lib/site";

export function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled
            ? "border-b border-outline/50 bg-surface/90 backdrop-blur-lg"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-5 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative h-7 w-24 shrink-0">
              <Image
                src="/logo-white.png"
                alt="De Cd Hidalgo Pal Mundo"
                fill
                className={cn(
                  "object-contain transition-[filter] duration-300",
                  scrolled && "brightness-0",
                )}
                priority
              />
            </span>
            <span
              className={cn(
                "hidden text-sm font-black tracking-tight transition-colors duration-300 sm:inline",
                scrolled ? "text-foreground" : "text-white",
              )}
            >
              Mi Menú
            </span>
          </Link>

          <nav className="ml-auto flex items-center gap-1.5">
            <Link
              href="#planes"
              className={cn(
                "hidden rounded-xl px-3.5 py-2 text-sm font-bold transition-colors duration-300 sm:inline-flex",
                scrolled
                  ? "text-foreground/60 hover:bg-black/5 hover:text-foreground"
                  : "text-white/85 hover:bg-white/10 hover:text-white",
              )}
            >
              Planes
            </Link>
            <Link
              href="/unete"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-600 px-4 text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-700 active:scale-[0.98]"
            >
              Únete gratis
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative isolate flex min-h-152 items-center overflow-hidden">
        <Image
          src="/portada.webp"
          alt="Los portales de Ciudad Hidalgo por la noche"
          fill
          sizes="100vw"
          className="-z-10 object-cover"
          priority
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/70 via-black/60 to-black/85" />

        <div className="mx-auto w-full max-w-3xl px-5 pt-28 pb-16 text-center">
          <h1 className="font-display text-4xl leading-[1.05] font-black tracking-tight text-white drop-shadow-sm sm:text-5xl">
            El menú de tu negocio,
            <span className="text-brand-400"> en línea y gratis</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed font-medium text-white/75">
            Tus clientes ven tus platillos, precios y horarios desde su celular, y te escriben
            por WhatsApp con un toque. Sin instalar nada, sin saber de tecnología.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/unete"
              className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-7 text-base font-bold text-white shadow-lg shadow-black/30 transition-all hover:bg-brand-700 active:scale-[0.98] sm:w-auto"
            >
              Quiero mi menú gratis
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/tacos-el-guero"
              className="inline-flex h-13 w-full items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-7 text-base font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-[0.98] sm:w-auto"
            >
              Ver un menú de ejemplo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
