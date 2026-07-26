import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Los dueños pegan la URL de sus fotos desde el panel, así que el host
    // no se puede conocer de antemano. Next sigue optimizando y sirviendo
    // las imágenes desde nuestro dominio; no se ejecuta nada del origen.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
    // Un menú son puras fotos de platillos: conviene cachearlas fuerte.
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
};

export default nextConfig;
