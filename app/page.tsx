import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Clock,
  MapPin,
  Megaphone,
  MessageCircle,
  QrCode,
  Smartphone,
  Store,
  Video,
} from "lucide-react";

import { REDES, SITE_NAME, SITE_URL } from "@/lib/site";
import { getPlanesPublicos, PLANES_RESPALDO } from "@/lib/planes";
import { Hero } from "@/components/landing/Hero";
import { Planes } from "@/components/landing/Planes";
import { SiteFooter, whatsappConMensaje } from "@/components/SiteFooter";

const TITULO = "Mi Menú · Menús digitales para negocios de Ciudad Hidalgo";
const DESCRIPCION =
  "Publica el menú de tu negocio en línea, gratis. Tu propia dirección, código QR y contacto por WhatsApp. Por De Cd Hidalgo Pal Mundo.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "es_MX",
    title: TITULO,
    description: DESCRIPCION,
  },
};

/** Los precios y topes salen de la base, así que se revalida cada hora. */
export const revalidate = 3600;

const pasos = [
  {
    Icon: Store,
    titulo: "Déjanos tus datos",
    texto: "Llenas un formulario corto con los datos de tu negocio. Toma dos minutos.",
  },
  {
    Icon: MessageCircle,
    titulo: "Te contactamos",
    texto: "Te buscamos por WhatsApp para activarte la cuenta y resolver tus dudas.",
  },
  {
    Icon: Smartphone,
    titulo: "Cargas tu menú",
    texto: "Subes tus platillos con foto y precio desde tu celular, y ya está en línea.",
  },
];

const incluye = [
  {
    Icon: MapPin,
    titulo: "Tu propia dirección",
    texto: "menu.cdhidalgo.com/tu-negocio. Tuya, fácil de recordar y de compartir.",
  },
  {
    Icon: QrCode,
    titulo: "Código QR único",
    texto: "Para pegarlo en tus mesas o en el mostrador. Lo escanean y ven tu menú.",
    proximamente: true,
  },
  {
    Icon: MessageCircle,
    titulo: "Contacto por WhatsApp",
    texto: "Un botón lleva al cliente directo a tu chat, o a llamarte si prefieres.",
  },
  {
    Icon: Clock,
    titulo: "Horarios y estado",
    texto: "Tu menú muestra solo si estás abierto o cerrado, según tu horario.",
  },
  {
    Icon: Camera,
    titulo: "Fotos y precios",
    texto: "Cada platillo con su foto, descripción y precio, siempre al día.",
  },
  {
    Icon: Smartphone,
    titulo: "Hecho para celular",
    texto: "Tus clientes lo abren desde el teléfono, sin instalar ninguna aplicación.",
  },
];

const difusion = [
  {
    Icon: Video,
    titulo: "Reseña mensual en reel",
    texto:
      "Grabamos tu negocio y publicamos el reel en Facebook, Instagram, TikTok y en cdhidalgo.com/comer.",
  },
  {
    Icon: MapPin,
    titulo: "En el mapa de la ciudad",
    texto: "Apareces en el mapa de cdhidalgo.com, donde la gente busca dónde comer.",
  },
  {
    Icon: Megaphone,
    titulo: "Publicaciones en nuestras redes",
    texto: "Dos veces por semana hablamos de tu negocio ante nuestra comunidad.",
  },
];

export default async function Home() {
  const planesDeLaBase = await getPlanesPublicos();
  const planes = planesDeLaBase.length > 0 ? planesDeLaBase : PLANES_RESPALDO;

  return (
    <div className="min-h-dvh bg-surface">
      <Hero />

      <main>
        {/* Cómo funciona */}
        <section className="border-y border-outline/50 bg-white px-5 py-14">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display text-2xl font-black tracking-tight text-foreground">
              Así de fácil
            </h2>

            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {pasos.map(({ Icon, titulo, texto }, i) => (
                <div key={titulo} className="text-center md:text-left">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 md:mx-0">
                    <Icon className="size-5.5" />
                  </div>
                  <p className="mt-4 text-[10px] font-extrabold tracking-widest text-foreground/35 uppercase">
                    Paso {i + 1}
                  </p>
                  <h3 className="mt-1 font-display text-base font-extrabold text-foreground">
                    {titulo}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed font-medium text-foreground/55">
                    {texto}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Qué incluye */}
        <section className="px-5 py-14">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display text-2xl font-black tracking-tight text-foreground">
              Lo que incluye tu menú
            </h2>
            <p className="mx-auto mt-2 max-w-md text-center text-sm font-medium text-foreground/50">
              Desde el plan gratuito, sin letras chiquitas.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {incluye.map(({ Icon, titulo, texto, proximamente }) => (
                <div
                  key={titulo}
                  className="rounded-3xl border border-outline/70 bg-white p-5 shadow-xs"
                >
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 flex flex-wrap items-center gap-2 font-display text-base font-extrabold text-foreground">
                    {titulo}
                    {proximamente && (
                      <span className="rounded-full bg-surface-container px-2 py-0.5 text-[9px] font-extrabold tracking-wider text-foreground/45 uppercase">
                        Muy pronto
                      </span>
                    )}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed font-medium text-foreground/55">
                    {texto}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Difusión: el diferenciador de los planes de paga */}
        <section className="border-y border-outline/50 bg-white px-5 py-14">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-[10px] font-extrabold tracking-wider text-brand-700 uppercase">
                Planes Pro y Premium
              </span>
              <h2 className="mt-4 font-display text-2xl font-black tracking-tight text-foreground">
                No solo tu menú: que te conozcan
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed font-medium text-foreground/55">
                Tener menú es el principio. Lo que mueve clientes es que la gente sepa que
                existes, y para eso está la comunidad que ya nos sigue.
              </p>

              {/* El alcance real, red por red: es el argumento de venta */}
              <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2">
                {REDES.map((red) => (
                  <a
                    key={red.nombre}
                    href={red.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl border border-outline/70 bg-surface px-4 py-2 transition-all hover:-translate-y-0.5 hover:border-brand-400"
                  >
                    <span className="block font-display text-lg leading-none font-black text-foreground">
                      {red.seguidores}
                    </span>
                    <span className="mt-1 block text-[10px] font-extrabold tracking-wider text-foreground/40 uppercase">
                      {red.nombre}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {difusion.map(({ Icon, titulo, texto }) => (
                <div
                  key={titulo}
                  className="rounded-3xl border border-brand-200 bg-brand-50/50 p-5"
                >
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-xs">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-extrabold text-foreground">
                    {titulo}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed font-medium text-foreground/60">
                    {texto}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Planes */}
        <section id="planes" className="scroll-mt-20 px-5 py-14">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display text-2xl font-black tracking-tight text-foreground">
              Elige tu plan
            </h2>
            <p className="mx-auto mt-2 max-w-md text-center text-sm font-medium text-foreground/50">
              Empieza gratis. Si te sirve, súbete cuando quieras.
            </p>

            <div className="mt-9">
              <Planes planes={planes} />
            </div>
          </div>
        </section>

        {/* Cierre */}
        <section className="px-5 pb-14">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-brand-600 px-6 py-12 text-center shadow-lg shadow-brand-600/20">
            {/* Aquí el logo va en blanco, como fue diseñado */}
            <span className="relative mx-auto mb-6 block h-9 w-32">
              <Image
                src="/logo-white.png"
                alt="De Cd Hidalgo Pal Mundo"
                fill
                className="object-contain"
              />
            </span>

            <h2 className="font-display text-2xl font-black tracking-tight text-white sm:text-3xl">
              Tu negocio merece que lo encuentren
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed font-medium text-white/80">
              Empieza con el plan gratuito. No pedimos tarjeta ni te amarramos a nada.
            </p>

            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/unete"
                className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-white px-7 text-base font-bold text-brand-700 shadow-sm transition-all hover:bg-white/90 active:scale-[0.98] sm:w-auto"
              >
                Registrar mi negocio
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={whatsappConMensaje(
                  "Hola, quiero información sobre el menú digital para mi negocio.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-2xl border border-white/25 px-7 text-base font-bold text-white transition-all hover:bg-white/10 active:scale-[0.98] sm:w-auto"
              >
                <MessageCircle className="size-4" />
                Tengo dudas
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
