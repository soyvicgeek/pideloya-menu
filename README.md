<div align="center">

# 🍽️ Pídelo Ya

**Menús digitales para negocios de Ciudad Hidalgo, Michoacán**

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)

</div>

---

## ¿De qué se trata?

Cualquier taquería, cafetería o restaurante de Ciudad Hidalgo puede tener su menú
en línea, gratis, sin instalar nada y sin saber de tecnología.

El dueño se registra, captura sus platillos desde el panel administrador y en
minutos su menú queda publicado en su propia dirección:

```
menu.cdhidalgo.com/tacos-el-guero
```

Ese enlace lo pega en su perfil de Facebook, lo manda por WhatsApp o lo imprime
como código QR para las mesas. El cliente entra desde su celular, ve las fotos,
los precios y los horarios, y contacta al negocio con un toque.

**Este repositorio es el menú que ve el cliente.** El panel donde el dueño
captura sus platillos vive aparte, en `menu-admin`.

## Qué incluye el menú

- 🖼️ Portada con logo, banner y colores propios de cada negocio
- 🔍 Buscador y filtro por categorías
- ⭐ Carrusel de platillos destacados
- 🕒 Horarios y aviso de **Abierto / Cerrado** calculado en tiempo real
- 📍 Dirección con enlace directo a Google Maps
- 💬 Botón flotante de WhatsApp, o de llamada si el negocio sólo tiene teléfono
- 📱 Pensado para celular primero

## Tecnologías

| | |
| --- | --- |
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **UI** | React 19 · Tailwind CSS 4 |
| **Lenguaje** | TypeScript |
| **Base de datos** | Supabase (PostgreSQL) |
| **Iconos** | lucide-react |
| **Animación** | motion · vaul |
| **Paquetes** | pnpm |

## Cómo ejecutarlo

Necesitas **Node.js 20+** y **pnpm**.

```bash
# 1. Instalar dependencias
pnpm install

# 2. Configurar las variables de entorno
#    Crea un archivo .env.local con:
#
#    NEXT_PUBLIC_SUPABASE_URL=https://xsoftyalwgpudrymkclk.supabase.co
#    NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key

# 3. Levantar el servidor de desarrollo
pnpm dev
```

Abre **http://localhost:3000/tacos-el-guero** para ver el menú de ejemplo.

### Otros comandos

```bash
pnpm build     # compilar para producción
pnpm start     # servir la versión compilada
pnpm lint      # revisar el código
```

## Estructura

```
app/
  [slug]/page.tsx      El menú de cada negocio
  page.tsx             Portada del proyecto
components/
  MenuClient.tsx       Toda la interfaz del menú
  BottomSheet.tsx      Paneles deslizables
  DraggableScroll.tsx  Carruseles arrastrables
lib/
  menu.ts              Puente con Supabase
  hours.ts             Horarios y estado abierto/cerrado
  supabase.ts          Cliente de Supabase
```

---

<div align="center">
<sub>Ciudad Hidalgo, Michoacán 🇲🇽</sub>
</div>
