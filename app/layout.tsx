import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Work_Sans } from "next/font/google";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Sin esto, Next no puede convertir rutas relativas en absolutas y las
  // etiquetas Open Graph salen inservibles para Facebook y WhatsApp.
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: "Tu menu al alcance de un click. Escanea el QR y pide lo que quieras.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "es_MX",
    images: [OG_IMAGE],
  },
  // Lo hereda cualquier página que no defina el suyo. El menú de un negocio sí
  // lo define: ahí manda su portada, no la nuestra.
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${plusJakartaSans.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
