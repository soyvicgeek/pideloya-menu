import { notFound } from "next/navigation";
import { MenuClient } from "@/components/MenuClient";

async function getMenuBySlug(slug: string) {
  // Mock data for initial development
  if (slug === "demo") {
    return {
      name: "Alitas & Ribs Gourmet",
      description: "Las mejores alitas artesanales y costillas horneadas de la ciudad.",
      primary_color: "#F01766",
      secondary_color: "#743b8c",
      logo_url: "https://img.freepik.com/vector-premium/plantilla-vectorial-logotipo-restaurante-hamburguesas_621660-2613.jpg",
      banner_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFhYVnULWZEeG9iqjgUPmIeYppR_OgAewh9EHlPtnevG8CTZKeMEkAFj7aemaLOzKB3WkXooaiT_adxjfebXu8OPUaKlusiyvU3169d_xxcDmhNESeBqFRZhv_ytaGR_AhaxQTSTKVsL4CgZHMkdfedt6W4pCNBlJb02MiNx-64J857aoINAD4sZGHAjDQjq-h-x76uJpm-6cteF60TA9HvkFNv42poWDDkUdP1qQQQ4DKLoySEEGoSk-wlkUr1CMINgy2h0tMBjQ",
      address: "Juchitán de Zaragoza, Oax.",
      whatsapp_phone: "529711234567",
      isOpen: true,
      facebook_url: "https://facebook.com/alitasgourmet",
      instagram_url: "https://instagram.com/alitasgourmet",
      tiktok_url: "https://tiktok.com/@alitasgourmet",
      hours: [
        { day: "Lunes", hours: "13:00 - 22:00" },
        { day: "Martes", hours: "13:00 - 22:00" },
        { day: "Miércoles", hours: "13:00 - 22:00" },
        { day: "Jueves", hours: "13:00 - 23:00" },
        { day: "Viernes", hours: "13:00 - 00:00" },
        { day: "Sábado", hours: "12:00 - 00:00" },
        { day: "Domingo", hours: "12:00 - 22:00" }
      ],
      payment_methods: ["Efectivo", "Tarjeta de Débito/Crédito", "Transferencia SPEI"],
      featured: [
        { 
          id: "f1", 
          name: "Combo Familiar Alitas", 
          description: "24 deliciosas alitas con hasta 2 salsas a elegir, 2 porciones de papas sazonadas y refresco de 2 litros.", 
          price: 489.00, 
          image_url: "https://tvpacifico.mx/recetas/intranet/images/recipes/344-363.jpg", 
          badge: "Popular",
          variants: [
            {
              id: "cf_v1",
              name: "Elige la Salsa 1",
              is_required: true,
              multi_select: false,
              options: [
                { id: "cf_o1", name: "BBQ Clásica", additional_price: 0 },
                { id: "cf_o2", name: "Buffalo Hot", additional_price: 0 },
                { id: "cf_o3", name: "Mango Habanero", additional_price: 15 },
                { id: "cf_o4", name: "Lemon Pepper", additional_price: 10 }
              ]
            },
            {
              id: "cf_v2",
              name: "Elige la Salsa 2",
              is_required: true,
              multi_select: false,
              options: [
                { id: "cf_o5", name: "BBQ Clásica", additional_price: 0 },
                { id: "cf_o6", name: "Buffalo Hot", additional_price: 0 },
                { id: "cf_o7", name: "Mango Habanero", additional_price: 15 },
                { id: "cf_o8", name: "Lemon Pepper", additional_price: 10 }
              ]
            },
            {
              id: "cf_v3",
              name: "Papas Extras",
              is_required: false,
              multi_select: true,
              options: [
                { id: "cf_o9", name: "Queso Cheddar Derretido", additional_price: 25 },
                { id: "cf_o10", name: "Papas Gajo Sazonadas", additional_price: 35 }
              ]
            }
          ]
        },
        { 
          id: "f2", 
          name: "Alitas Especiales del Chef", 
          description: "Nuestra receta secreta horneada con 12 especias premium y bañada en reducción de mezcal.", 
          price: 185.00, 
          image_url: "https://thumbs.dreamstime.com/b/sizzling-charcoal-grill-retrato-de-silueta-alas-pollo-perfectamente-asadas-experimente-el-atractivo-ahumado-una-velada-verano-con-389624762.jpg",
          variants: [
            {
              id: "sp_v1",
              name: "Tamaño",
              is_required: true,
              multi_select: false,
              options: [
                { id: "sp_o1", name: "Orden Estándar (10 piezas)", additional_price: 0 },
                { id: "sp_o2", name: "Orden XL (15 piezas)", additional_price: 60 }
              ]
            }
          ]
        }
      ],
      categories: [
        { 
          id: "1", 
          name: "Alitas", 
          items: [
            { 
              id: "i1", 
              name: "Alitas BBQ Clásicas", 
              description: "Crujientes alitas bañadas en nuestra salsa BBQ secreta artesanal.", 
              price: 145.00, 
              image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvi_aT5CyDYd41dB0giTx8lYfYOufH_OcKQ9QNOlt5wOgsnVxAdUj_T34qrOC8_06HBsPnfNFtH1MyAMiiH_2bT5HZrFXk43xiZr193D91PyIG_WQ75zD8KSBEHvg5Oey7xfY_VEkvWSYU3b8f9a00WQlHyfyylH7djpClBkEOf5CNYHlThptdhEhRgy1wsbjGrH3zDQG3f-fh7bdJBFatJ4Ede2-obK9Jm0odzUCq35YaYfOdUEQJ94yB7DQ0qiVWiCbxveO1O3M",
              variants: [
                {
                  id: "bbq_v1",
                  name: "Aderezos Extras",
                  is_required: false,
                  multi_select: true,
                  options: [
                    { id: "bbq_o1", name: "Ranch Extra", additional_price: 15 },
                    { id: "bbq_o2", name: "Blue Cheese", additional_price: 20 },
                    { id: "bbq_o3", name: "Apio y Zanahoria", additional_price: 10 }
                  ]
                }
              ]
            },
            { 
              id: "i2", 
              name: "Buffalo Hot Wings", 
              description: "Para los amantes del picante. Salsa buffalo clásica de la casa con un toque especial de habanero.", 
              price: 145.00, 
              image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFhYVnULWZEeG9iqjgUPmIeYppR_OgAewh9EHlPtnevG8CTZKeMEkAFj7aemaLOzKB3WkXooaiT_adxjfebXu8OPUaKlusiyvU3169d_xxcDmhNESeBqFRZhv_ytaGR_AhaxQTSTKVsL4CgZHMkdfedt6W4pCNBlJb02MiNx-64J857aoINAD4sZGHAjDQjq-h-x76uJpm-6cteF60TA9HvkFNv42poWDDkUdP1qQQQ4DKLoySEEGoSk-wlkUr1CMINgy2h0tMBjQ",
              variants: [
                {
                  id: "buf_v1",
                  name: "Nivel de Picante",
                  is_required: true,
                  multi_select: false,
                  options: [
                    { id: "buf_o1", name: "Leve (Para disfrutar)", additional_price: 0 },
                    { id: "buf_o2", name: "Medio (Para valientes)", additional_price: 0 },
                    { id: "buf_o3", name: "Extremo (Habanero puro)", additional_price: 10 }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "2",
          name: "Costillas",
          items: [
            {
              id: "i3",
              name: "Baby Back Ribs",
              description: "Tiernas costillitas de cerdo premium laqueadas a fuego lento con salsa de la casa.",
              price: 295.00,
              image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFhYVnULWZEeG9iqjgUPmIeYppR_OgAewh9EHlPtnevG8CTZKeMEkAFj7aemaLOzKB3WkXooaiT_adxjfebXu8OPUaKlusiyvU3169d_xxcDmhNESeBqFRZhv_ytaGR_AhaxQTSTKVsL4CgZHMkdfedt6W4pCNBlJb02MiNx-64J857aoINAD4sZGHAjDQjq-h-x76uJpm-6cteF60TA9HvkFNv42poWDDkUdP1qQQQ4DKLoySEEGoSk-wlkUr1CMINgy2h0tMBjQ",
              variants: [
                {
                  id: "rib_v1",
                  name: "Término de Horneado",
                  is_required: true,
                  multi_select: false,
                  options: [
                    { id: "rib_o1", name: "BBQ Ahumado", additional_price: 0 },
                    { id: "rib_o2", name: "Agridulce con Tamarindo", additional_price: 15 }
                  ]
                }
              ]
            }
          ]
        }
      ],
      horizontalCategories: [
        { id: "h1", name: "PROMOCIONES", iconName: "Percent" },
        { id: "h2", name: "ALITAS", iconName: "Flame" },
        { id: "h3", name: "BEBIDAS", iconName: "Coffee" },
        { id: "h4", name: "MENÚ", iconName: "Utensils" }
      ]
    };
  }
  return null;
}

export default async function MenuPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const menu = await getMenuBySlug(slug);

  if (!menu) notFound();

  return <MenuClient menu={menu} />;
}
