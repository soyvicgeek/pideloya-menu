/**
 * Iconos de marca en SVG propio: lucide-react los quitó de su set desde la
 * versión 1.x, así que no se pueden importar.
 */

const WHATSAPP = "4431874877";

type IconProps = { className?: string };

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TiktokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .76-5.07v-3.13a5.66 5.66 0 0 0-.76-.05A5.68 5.68 0 1 0 15.54 15.4V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.29 4.29 0 0 1-3.24-1.48Z" />
    </svg>
  );
}

function WhatsappIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
      <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
    </svg>
  );
}

const redes = [
  { nombre: "Facebook", href: "https://www.facebook.com/gociudadhidalgo", Icon: FacebookIcon },
  { nombre: "Instagram", href: "https://www.instagram.com/gociudadhidalgo", Icon: InstagramIcon },
  { nombre: "TikTok", href: "https://www.tiktok.com/@gociudadhidalgo", Icon: TiktokIcon },
  {
    nombre: "WhatsApp",
    href: `https://wa.me/52${WHATSAPP}?text=${encodeURIComponent(
      "Hola, quiero información sobre el menú digital para mi negocio.",
    )}`,
    Icon: WhatsappIcon,
  },
];

export function SocialFooter() {
  return (
    <footer className="mt-12 border-t border-outline/60 px-6 py-8">
      <div className="mx-auto flex max-w-md flex-col items-center gap-4">
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-foreground/40">
          Síguenos
        </p>

        <div className="flex items-center gap-3">
          {redes.map(({ nombre, href, Icon }) => (
            <a
              key={nombre}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={nombre}
              title={nombre}
              className="flex size-11 items-center justify-center rounded-2xl border border-outline bg-white text-foreground/60 shadow-xs transition-all hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-600 active:scale-95"
            >
              <Icon className="size-5" />
            </a>
          ))}
        </div>

        <p className="text-center text-[11px] font-medium text-foreground/40">
          Ciudad Hidalgo, Michoacán
        </p>
      </div>
    </footer>
  );
}
