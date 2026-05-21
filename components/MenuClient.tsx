"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { 
  Search, 
  MapPin, 
  Plus, 
  Minus, 
  ShoppingCart, 
  X, 
  Check, 
  ChevronRight, 
  ShoppingBag,
  CheckCircle2,
  Percent,
  Coffee,
  Flame,
  Utensils,
  Info,
  Phone,
  Clock,
  CreditCard,
  ExternalLink,
  Globe
} from "lucide-react";
import { DraggableScroll } from "./DraggableScroll";

// Type definitions
export interface Option {
  id: string;
  name: string;
  additional_price: number;
}

export interface Variant {
  id: string;
  name: string;
  is_required: boolean;
  multi_select: boolean;
  options: Option[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  badge?: string;
  variants?: Variant[];
}

export interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface HorizontalCategory {
  id: string;
  name: string;
  iconName: string; // "Percent" | "Coffee" | "Flame" | "Utensils"
}

export interface MenuData {
  name: string;
  description: string;
  primary_color: string;
  secondary_color: string;
  logo_url: string;
  banner_url: string;
  address: string;
  whatsapp_phone: string;
  isOpen: boolean;
  featured: MenuItem[];
  categories: Category[];
  horizontalCategories: HorizontalCategory[];
  facebook_url?: string;
  instagram_url?: string;
  tiktok_url?: string;
  hours?: { day: string; hours: string }[];
  payment_methods?: string[];
}

export interface CartItem {
  id: string; // unique ID generated for combination of item + options
  item: MenuItem;
  quantity: number;
  selectedOptions: {
    variantId: string;
    variantName: string;
    optionId: string;
    optionName: string;
    price: number;
  }[];
  notes: string;
}

interface MenuClientProps {
  menu: MenuData;
}

// Icon mapper for dynamic categories
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Percent,
  Coffee,
  Flame,
  Utensils
};

export function MenuClient({ menu }: MenuClientProps) {
  // --- States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  
  // Modal for variants/options
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [modalSelections, setModalSelections] = useState<Record<string, string[]>>({});
  const [modalQuantity, setModalQuantity] = useState(1);
  const [modalNotes, setModalNotes] = useState("");
  
  // Checkout details state
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutPhone, setCheckoutPhone] = useState("");
  const [checkoutMethod, setCheckoutMethod] = useState<"delivery" | "pickup">("delivery");
  const [checkoutAddress, setCheckoutAddress] = useState("");
  const [checkoutPayment, setCheckoutPayment] = useState<"cash" | "transfer" | "card">("cash");
  const [checkoutCashChange, setCheckoutCashChange] = useState("");

  // Notification toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Info Modal state ("Ver más")
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // --- Dynamic Primary/Secondary Custom Colors ---
  const dynamicStyles = useMemo(() => {
    return {
      "--primary": menu.primary_color || "#F01766",
      "--secondary": menu.secondary_color || "#743b8c",
      "--primary-light": `${menu.primary_color || "#F01766"}15`, // opacity for backgrounds
      "--secondary-light": `${menu.secondary_color || "#743b8c"}15`,
    } as React.CSSProperties;
  }, [menu.primary_color, menu.secondary_color]);

  // --- Cart Calculations ---
  const cartTotal = useMemo(() => {
    return cart.reduce((total, cartItem) => {
      const optionsCost = cartItem.selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
      return total + (cartItem.item.price + optionsCost) * cartItem.quantity;
    }, 0);
  }, [cart]);

  const cartTotalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // --- Search & Category Filtering ---
  const filteredCategories = useMemo(() => {
    return menu.categories.map(category => {
      // Filter items within this category based on search query
      const filteredItems = category.items.filter(item => {
        const matchesSearch = 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
      });

      return {
        ...category,
        items: filteredItems
      };
    }).filter(category => {
      // Only keep the category if it has items matching the search query
      if (category.items.length === 0) return false;
      // If a category tab is selected, filter by that category
      if (selectedCategory !== "all" && category.id !== selectedCategory) return false;
      return true;
    });
  }, [menu.categories, searchQuery, selectedCategory]);

  const filteredFeatured = useMemo(() => {
    if (selectedCategory !== "all") return []; // Don't show featured when custom category selected
    return menu.featured.filter(item => {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             item.description.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [menu.featured, searchQuery, selectedCategory]);

  // --- Item Selection & Option Modal Logic ---
  const handleItemClick = (item: MenuItem) => {
    if (!item.variants || item.variants.length === 0) {
      // Quick add if no variants/options required
      addToCartDirectly(item);
    } else {
      // Open option selection modal
      setSelectedItem(item);
      setModalQuantity(1);
      setModalNotes("");
      
      // Initialize selections with default values
      const initialSelections: Record<string, string[]> = {};
      item.variants.forEach(variant => {
        if (variant.is_required && !variant.multi_select && variant.options.length > 0) {
          // Auto-select first option if required & single select
          initialSelections[variant.id] = [variant.options[0].id];
        } else {
          initialSelections[variant.id] = [];
        }
      });
      setModalSelections(initialSelections);
    }
  };

  const addToCartDirectly = (item: MenuItem) => {
    const uniqueId = item.id;
    setCart(prevCart => {
      const existingIdx = prevCart.findIndex(c => c.id === uniqueId);
      if (existingIdx > -1) {
        const newCart = [...prevCart];
        newCart[existingIdx].quantity += 1;
        return newCart;
      } else {
        return [...prevCart, {
          id: uniqueId,
          item,
          quantity: 1,
          selectedOptions: [],
          notes: ""
        }];
      }
    });
    triggerToast(`¡${item.name} agregado al carrito!`);
  };

  const handleOptionToggle = (variantId: string, optionId: string, isMulti: boolean) => {
    setModalSelections(prev => {
      const current = prev[variantId] || [];
      if (isMulti) {
        if (current.includes(optionId)) {
          return { ...prev, [variantId]: current.filter(id => id !== optionId) };
        } else {
          return { ...prev, [variantId]: [...current, optionId] };
        }
      } else {
        return { ...prev, [variantId]: [optionId] };
      }
    });
  };

  const modalItemTotal = useMemo(() => {
    if (!selectedItem) return 0;
    let price = selectedItem.price;
    if (selectedItem.variants) {
      selectedItem.variants.forEach(variant => {
        const selectedIds = modalSelections[variant.id] || [];
        variant.options.forEach(opt => {
          if (selectedIds.includes(opt.id)) {
            price += opt.additional_price;
          }
        });
      });
    }
    return price * modalQuantity;
  }, [selectedItem, modalSelections, modalQuantity]);

  const handleAddWithVariants = () => {
    if (!selectedItem) return;
    
    // Check if required variants are selected
    if (selectedItem.variants) {
      for (const variant of selectedItem.variants) {
        if (variant.is_required && (!modalSelections[variant.id] || modalSelections[variant.id].length === 0)) {
          alert(`Por favor, selecciona una opción para: ${variant.name}`);
          return;
        }
      }
    }

    // Build selected options structure
    const selectedOptionsDetails: CartItem["selectedOptions"] = [];
    if (selectedItem.variants) {
      selectedItem.variants.forEach(variant => {
        const selectedIds = modalSelections[variant.id] || [];
        variant.options.forEach(opt => {
          if (selectedIds.includes(opt.id)) {
            selectedOptionsDetails.push({
              variantId: variant.id,
              variantName: variant.name,
              optionId: opt.id,
              optionName: opt.name,
              price: opt.additional_price
            });
          }
        });
      });
    }

    // Generate unique ID based on item ID and selected option IDs (sorted to maintain consistency)
    const optionsKey = selectedOptionsDetails
      .map(o => o.optionId)
      .sort()
      .join("-");
    const uniqueId = `${selectedItem.id}-${optionsKey}`;

    setCart(prevCart => {
      const existingIdx = prevCart.findIndex(c => c.id === uniqueId);
      if (existingIdx > -1) {
        const newCart = [...prevCart];
        newCart[existingIdx].quantity += modalQuantity;
        if (modalNotes) {
          newCart[existingIdx].notes = newCart[existingIdx].notes 
            ? `${newCart[existingIdx].notes}\n${modalNotes}` 
            : modalNotes;
        }
        return newCart;
      } else {
        return [...prevCart, {
          id: uniqueId,
          item: selectedItem,
          quantity: modalQuantity,
          selectedOptions: selectedOptionsDetails,
          notes: modalNotes
        }];
      }
    });

    setSelectedItem(null);
    triggerToast(`¡${selectedItem.name} agregado al carrito!`);
  };

  // --- Cart Actions ---
  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart(prevCart => {
      return prevCart.map(c => {
        if (c.id === cartItemId) {
          const newQty = c.quantity + delta;
          return newQty > 0 ? { ...c, quantity: newQty } : null;
        }
        return c;
      }).filter(Boolean) as CartItem[];
    });
  };

  // --- WhatsApp Checkout Logic ---
  const handleSendOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName) {
      alert("Por favor introduce tu nombre.");
      return;
    }
    if (checkoutMethod === "delivery" && !checkoutAddress) {
      alert("Por favor introduce tu dirección de entrega.");
      return;
    }

    // Build the beautiful text message for WhatsApp
    let message = `*¡Hola! Me gustaría realizar un pedido desde el menú digital:*\n\n`;
    message += `*Cliente:* ${checkoutName}\n`;
    if (checkoutPhone) message += `*Teléfono:* ${checkoutPhone}\n`;
    message += `*Método:* ${checkoutMethod === "delivery" ? "🏠 A Domicilio" : "🚶 Pasar a Recoger"}\n`;
    
    if (checkoutMethod === "delivery") {
      message += `*Dirección:* ${checkoutAddress}\n`;
    }
    
    message += `*Método de Pago:* ${
      checkoutPayment === "cash" 
        ? `💵 Efectivo${checkoutCashChange ? ` (Paga con: $${checkoutCashChange})` : ""}` 
        : checkoutPayment === "transfer" 
          ? "🏦 Transferencia" 
          : "💳 Tarjeta"
    }\n\n`;

    message += `--------------------------------------\n`;
    message += `*DETALLE DEL PEDIDO:*\n\n`;

    cart.forEach(cartItem => {
      const optionsCost = cartItem.selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
      const unitTotal = cartItem.item.price + optionsCost;
      const subtotal = unitTotal * cartItem.quantity;
      
      message += `*${cartItem.quantity}x ${cartItem.item.name}* ($${unitTotal.toFixed(2)} c/u)\n`;
      
      if (cartItem.selectedOptions.length > 0) {
        cartItem.selectedOptions.forEach(opt => {
          message += `  • ${opt.variantName}: ${opt.optionName}${opt.price > 0 ? ` (+$${opt.price.toFixed(2)})` : ""}\n`;
        });
      }
      
      if (cartItem.notes) {
        message += `  _Nota: ${cartItem.notes}_\n`;
      }
      
      message += `  *Subtotal:* $${subtotal.toFixed(2)}\n\n`;
    });

    message += `--------------------------------------\n`;
    message += `*TOTAL A PAGAR: $${cartTotal.toFixed(2)}*\n\n`;
    message += `_Pedido enviado desde Pídelo Ya._`;

    // Encode string
    const encodedText = encodeURIComponent(message);
    const cleanPhone = menu.whatsapp_phone.replace(/\D/g, ""); // strip non-numeric
    // Use international format if not starting with +
    const waPhone = cleanPhone.startsWith("52") ? cleanPhone : `52${cleanPhone}`;
    
    const whatsappUrl = `https://wa.me/${waPhone}?text=${encodedText}`;
    
    // Clear cart and close drawer
    setCart([]);
    setIsCartOpen(false);
    setShowCheckoutForm(false);
    
    // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div style={dynamicStyles} className="bg-surface text-foreground min-h-screen pb-24 font-sans selection:bg-purple-100 antialiased transition-colors duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-99 flex items-center gap-3 bg-foreground text-background px-6 py-3.5 rounded-full shadow-2xl animate-fade-in font-display font-medium text-sm">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          {toastMessage}
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden h-72">
          <div className="absolute inset-0">
            {menu.banner_url && (
              <Image 
                alt="Banner de la tienda" 
                fill 
                className="object-cover scale-105 filter blur-[0.5px]" 
                src={menu.banner_url} 
                priority 
              />
            )}
            <div className="absolute inset-0 bg-black/35"></div>
            {/* Smooth dark gradient overlay for visual excellence and typography readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/45 to-transparent"></div>
          </div>
          
          <div className="relative h-full flex flex-col items-center justify-end text-center px-4 pb-8">
            <div className="rounded-full bg-white border-4 border-primary overflow-hidden shadow-2xl flex items-center justify-center w-24 h-24 mb-3 transition-transform duration-300 hover:scale-105">
              {menu.logo_url && (
                <Image 
                  alt={menu.name} 
                  width={96} 
                  height={96} 
                  className="object-cover aspect-square" 
                  src={menu.logo_url} 
                />
              )}
            </div>
            <h2 className="font-display text-white text-3xl font-extrabold tracking-tight leading-none mb-1.5 drop-shadow-md">
              {menu.name}
            </h2>
            <p className="text-white/80 text-xs font-medium max-w-md line-clamp-1 mb-2">
              {menu.description}
            </p>
            
            <button 
              onClick={() => setIsInfoModalOpen(true)}
              className="text-white/95 text-[10.5px] font-extrabold hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 transition-all mb-3.5 cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95 duration-150"
            >
              <span>Ver más información</span>
              <Info className="w-3.5 h-3.5 text-primary" />
            </button>
            
            <div className="flex flex-col items-center gap-2.5">
              <div className="flex items-center gap-1.5 text-white/95 text-xs font-bold drop-shadow">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>{menu.address}</span>
              </div>
              <div className={`flex items-center gap-2 backdrop-blur-md px-4 py-1.5 rounded-full border text-[10px] font-extrabold uppercase tracking-wider shadow-sm transition-all duration-300 ${
                menu.isOpen 
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" 
                  : "bg-rose-500/20 border-rose-500/40 text-rose-400"
              }`}>
                <span className={`w-2 h-2 rounded-full ${menu.isOpen ? "bg-emerald-400 animate-pulse" : "bg-rose-400"}`}></span>
                <span>{menu.isOpen ? "Abierto Ahora" : "Cerrado temporalmente"}</span>
              </div>
            </div>
          </div>

          {/* Artistic geometric overlay element */}
          <div className="absolute top-8 left-8 opacity-25">
            <div className="flex gap-2 transform -rotate-12">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-0.75 h-12 bg-white/60 rounded-full"></div>
              ))}
            </div>
          </div>
        </section>

        {/* Search, Filter Categories & Scrolling Tabs */}
        <div className="sticky top-0 z-30 bg-surface/90 backdrop-blur-lg border-b border-outline/10 shadow-sm transition-all duration-200">
          <div className="px-4 pt-4 pb-3">
            {/* Modern Search bar */}
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-foreground/50 w-5 h-5 pointer-events-none" />
              <input 
                className="w-full pl-12 pr-10 py-3.5 bg-white border border-outline/70 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 placeholder:text-foreground/40 shadow-xs" 
                placeholder="¿Qué te gustaría ordenar hoy?" 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="absolute right-3.5 p-1 rounded-full text-foreground/40 hover:bg-black/5 hover:text-foreground cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Centered Draggable Scroll Navigation for Categories */}
          <div className="pb-3 select-none">
            <DraggableScroll>
              {/* "All / Todos" tab */}
              <button 
                onClick={() => setSelectedCategory("all")}
                className={`flex flex-col items-center gap-1.5 px-3 min-w-17.5 cursor-pointer group transition-all duration-200`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-200 ${
                  selectedCategory === "all" 
                    ? "bg-primary border-primary text-white shadow-md shadow-primary/20 scale-105" 
                    : "bg-white border-outline hover:border-foreground/20 text-foreground/75"
                }`}>
                  <Utensils className="w-5.5 h-5.5" />
                </div>
                <span className={`text-[10px] font-bold tracking-tight uppercase transition-colors duration-150 ${
                  selectedCategory === "all" ? "text-primary" : "text-foreground/75"
                }`}>
                  TODOS
                </span>
              </button>

              {/* Dynamic categories fetched from menu */}
              {menu.horizontalCategories.map((cat) => {
                const IconComponent = iconMap[cat.iconName] || Utensils;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button 
                    key={cat.id} 
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex flex-col items-center gap-1.5 px-3 min-w-17.5 cursor-pointer group transition-all duration-200`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-200 ${
                      isSelected 
                        ? "bg-primary border-primary text-white shadow-md shadow-primary/20 scale-105" 
                        : "bg-white border-outline hover:border-foreground/20 text-foreground/75"
                    }`}>
                      <IconComponent className="w-5.5 h-5.5" />
                    </div>
                    <span className={`text-[10px] font-bold tracking-tight uppercase transition-colors duration-150 ${
                      isSelected ? "text-primary" : "text-foreground/75"
                    }`}>
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </DraggableScroll>
          </div>
        </div>

        {/* Featured Items ("Destacados") Section */}
        {filteredFeatured.length > 0 && (
          <section className="mt-7 px-4">
            <div className="flex items-center gap-2 mb-4 pl-0.5">
              <div className="w-1.5 h-6 rounded-full bg-primary"></div>
              <h3 className="font-display text-[21px] font-extrabold tracking-tight text-foreground">
                Destacados
              </h3>
            </div>
            
            {/* Horizontal scrolling container for featured items */}
            <DraggableScroll className="pb-4 select-none">
              {filteredFeatured.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => handleItemClick(item)}
                  className="bg-white rounded-3xl overflow-hidden shadow-xs border border-outline/65 flex flex-col min-w-62.5 max-w-62.5 snap-start cursor-pointer hover:border-primary/50 transition-all duration-200 hover:shadow-md active:scale-[0.98]"
                >
                  <div className="relative h-36 w-full">
                    <Image 
                      alt={item.name} 
                      fill 
                      className="object-cover transition-transform duration-300 hover:scale-103" 
                      src={item.image_url} 
                    />
                    {item.badge && (
                      <div className="absolute top-3.5 left-3.5 bg-primary text-white text-[9px] font-extrabold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
                        {item.badge}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-4">
                    <h4 className="font-display font-extrabold text-base text-foreground leading-snug line-clamp-1 mb-1">
                      {item.name}
                    </h4>
                    <p className="text-foreground/50 text-xs font-normal line-clamp-2 mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="font-display font-black text-primary text-lg">
                        ${item.price.toFixed(2)}
                      </span>
                      <div className="bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-2xl flex items-center justify-center active:scale-90 transition-all duration-150 h-10 w-10 cursor-pointer shadow-xs">
                        <Plus className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </DraggableScroll>
          </section>
        )}

        {/* Regular Items List grouped by Category */}
        <div className="mt-2 space-y-7 px-4">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => (
              <section key={cat.id} className="pt-2">
                <div className="flex justify-between items-center mb-4 pl-0.5 border-b border-outline/35 pb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-[20px] font-extrabold tracking-tight text-foreground">
                      {cat.name}
                    </h3>
                    <span className="text-primary text-lg leading-none">•</span>
                    <span className="text-foreground/40 text-xs font-bold uppercase tracking-wider">
                      {cat.items.length} {cat.items.length === 1 ? "Artículo" : "Artículos"}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {cat.items.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => handleItemClick(item)}
                      className="flex flex-row sm:flex-col bg-white rounded-3xl overflow-hidden shadow-xs border border-outline/65 active:scale-[0.98] transition-all duration-200 cursor-pointer hover:border-primary/45 hover:shadow-md group"
                    >
                      <div className="w-1/3 sm:w-full aspect-square sm:aspect-video relative overflow-hidden bg-surface shrink-0">
                        <Image 
                          alt={item.name} 
                          fill 
                          className="object-cover transition-transform duration-300 group-hover:scale-103" 
                          src={item.image_url} 
                        />
                      </div>
                      <div className="flex-1 p-4.5 flex flex-col justify-between">
                        <div>
                          <h4 className="font-display font-extrabold text-[15px] leading-tight text-foreground group-hover:text-primary transition-colors duration-150">
                            {item.name}
                          </h4>
                          <p className="text-foreground/50 text-[11px] font-normal mt-1.5 leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex justify-between items-end mt-3">
                          <div className="flex flex-col">
                            {item.variants && item.variants.length > 0 && (
                              <span className="text-[9px] text-foreground/45 font-bold uppercase tracking-wider mb-0.5">Desde</span>
                            )}
                            <span className="font-display font-black text-primary text-base">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                          <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white h-9 w-9 flex items-center justify-center rounded-xl shadow-xs active:scale-90 transition-all duration-150 cursor-pointer">
                            <Plus className="w-4.5 h-4.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="py-14 text-center">
              <ShoppingBag className="w-12 h-12 text-foreground/20 mx-auto mb-3" />
              <p className="text-foreground/50 text-sm font-semibold">No encontramos platillos que coincidan</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }} 
                className="mt-3 text-xs text-primary font-bold hover:underline cursor-pointer"
              >
                Ver todos los platillos
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Button (Cart) */}
      {cart.length > 0 && (
        <button 
          onClick={() => { setIsCartOpen(true); setShowCheckoutForm(false); }}
          className="fixed bottom-8 right-6 z-40 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/20 active:scale-95 hover:scale-105 transition-all duration-150 cursor-pointer hover:bg-opacity-95 text-white"
        >
          <ShoppingCart className="w-6 h-6" />
          <div className="absolute -top-1.5 -right-1.5 bg-white border-[3px] border-primary text-primary text-[10.5px] font-black w-7 h-7 rounded-full flex items-center justify-center shadow-md animate-scale-up">
            {cartTotalItems}
          </div>
        </button>
      )}

      {/* --- CART DRAWER / SIDE SHEET --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay backdrop */}
          <div 
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in"
          ></div>
          
          {/* Drawer content panel */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-left overflow-hidden">
            
            {/* Drawer Header */}
            <div className="p-5 border-b border-outline/50 flex justify-between items-center bg-surface">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary p-2.5 rounded-xl">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-lg text-foreground">Tu Carrito</h3>
                  <p className="text-foreground/45 text-xs font-semibold">{cartTotalItems} {cartTotalItems === 1 ? "artículo" : "artículos"}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="p-2 hover:bg-black/5 text-foreground/60 hover:text-foreground rounded-full transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {!showCheckoutForm ? (
                /* Cart Items List Step */
                <div className="space-y-4">
                  {cart.map((cartItem) => {
                    const optionsPrice = cartItem.selectedOptions.reduce((sum, o) => sum + o.price, 0);
                    const itemUnitTotal = cartItem.item.price + optionsPrice;
                    const itemSubtotal = itemUnitTotal * cartItem.quantity;
                    
                    return (
                      <div key={cartItem.id} className="flex gap-4 bg-surface p-3.5 rounded-2xl border border-outline/50">
                        <div className="w-16 h-16 relative rounded-xl overflow-hidden bg-white shrink-0 border border-outline/30">
                          <Image alt={cartItem.item.name} fill className="object-cover" src={cartItem.item.image_url} />
                        </div>
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <div className="flex justify-between items-start gap-1">
                              <h4 className="font-display font-extrabold text-sm text-foreground leading-tight line-clamp-1">
                                {cartItem.item.name}
                              </h4>
                              <span className="font-display font-extrabold text-sm text-primary shrink-0">
                                ${itemSubtotal.toFixed(2)}
                              </span>
                            </div>
                            
                            {/* Selected Options list */}
                            {cartItem.selectedOptions.length > 0 && (
                              <div className="mt-1 space-y-0.5">
                                {cartItem.selectedOptions.map((opt, idx) => (
                                  <p key={idx} className="text-[10px] text-foreground/50 font-medium">
                                    • {opt.variantName}: <span className="font-bold text-foreground/75">{opt.optionName}</span> {opt.price > 0 && `(+$${opt.price})`}
                                  </p>
                                ))}
                              </div>
                            )}

                            {/* Item Notes */}
                            {cartItem.notes && (
                              <p className="text-[10px] text-primary/80 font-medium mt-1.5 italic line-clamp-1 bg-primary-light px-2 py-0.5 rounded-md w-fit">
                                Note: {cartItem.notes}
                              </p>
                            )}
                          </div>

                          {/* Quantity selectors */}
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-[11px] text-foreground/40 font-bold">${itemUnitTotal.toFixed(2)} c/u</span>
                            <div className="flex items-center gap-3 bg-white border border-outline/60 px-2 py-1 rounded-xl">
                              <button 
                                onClick={() => updateCartQuantity(cartItem.id, -1)}
                                className="p-1 hover:bg-black/5 text-foreground/70 rounded-lg active:scale-90 transition-transform cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-display font-extrabold text-xs text-foreground min-w-4 text-center select-none">
                                {cartItem.quantity}
                              </span>
                              <button 
                                onClick={() => updateCartQuantity(cartItem.id, 1)}
                                className="p-1 hover:bg-black/5 text-foreground/70 rounded-lg active:scale-90 transition-transform cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Delivery details and options checkout form step */
                <form onSubmit={handleSendOrder} className="space-y-4.5">
                  <h4 className="font-display font-extrabold text-sm text-foreground border-b border-outline/40 pb-1.5 uppercase tracking-wide">
                    Datos de Entrega
                  </h4>
                  
                  {/* Client Name Input */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-foreground/60 uppercase tracking-wider mb-1.5">Tu Nombre completo *</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Ej: Juan Pérez"
                      className="w-full px-4 py-3 bg-surface border border-outline rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-foreground/30"
                      value={checkoutName}
                      onChange={(e) => setCheckoutName(e.target.value)}
                    />
                  </div>

                  {/* Client Phone Input */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-foreground/60 uppercase tracking-wider mb-1.5">WhatsApp / Teléfono (opcional)</label>
                    <input 
                      type="tel" 
                      placeholder="Ej: 786 123 4567"
                      className="w-full px-4 py-3 bg-surface border border-outline rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-foreground/30"
                      value={checkoutPhone}
                      onChange={(e) => setCheckoutPhone(e.target.value)}
                    />
                  </div>

                  {/* Delivery Method Segmented Control */}
                  <div>
                    <label className="block text-[11px] font-extrabold text-foreground/60 uppercase tracking-wider mb-1.5">Método de entrega *</label>
                    <div className="grid grid-cols-2 gap-2 bg-surface p-1 rounded-xl border border-outline/50">
                      <button
                        type="button"
                        onClick={() => setCheckoutMethod("delivery")}
                        className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          checkoutMethod === "delivery" 
                            ? "bg-white text-primary shadow-xs border border-outline/30" 
                            : "text-foreground/60 hover:text-foreground"
                        }`}
                      >
                        🏠 A Domicilio
                      </button>
                      <button
                        type="button"
                        onClick={() => setCheckoutMethod("pickup")}
                        className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          checkoutMethod === "pickup" 
                            ? "bg-white text-primary shadow-xs border border-outline/30" 
                            : "text-foreground/60 hover:text-foreground"
                        }`}
                      >
                        🚶 Pasar a Recoger
                      </button>
                    </div>
                  </div>

                  {/* Address Text Area (Condition: Delivery) */}
                  {checkoutMethod === "delivery" && (
                    <div className="animate-fade-in">
                      <label className="block text-[11px] font-extrabold text-foreground/60 uppercase tracking-wider mb-1.5">Dirección Completa y Referencias *</label>
                      <textarea 
                        required
                        rows={3}
                        placeholder="Calle, Número, Colonia, entre qué calles o detalles de fachadas..."
                        className="w-full px-4 py-3 bg-surface border border-outline rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-foreground/30 resize-none"
                        value={checkoutAddress}
                        onChange={(e) => setCheckoutAddress(e.target.value)}
                      />
                    </div>
                  )}

                  <h4 className="font-display font-extrabold text-sm text-foreground border-b border-outline/40 pt-2 pb-1.5 uppercase tracking-wide">
                    Método de Pago
                  </h4>

                  {/* Payment selection icons */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {([
                      { id: "cash", label: "Efectivo", icon: "💵" },
                      { id: "transfer", label: "Transfer", icon: "🏦" },
                      { id: "card", label: "Tarjeta", icon: "💳" }
                    ] as const).map(p => {
                      const active = checkoutPayment === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setCheckoutPayment(p.id)}
                          className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                            active 
                              ? "bg-primary-light border-primary text-primary font-bold shadow-xs" 
                              : "bg-surface border-outline/60 text-foreground/70 hover:border-foreground/20"
                          }`}
                        >
                          <span className="text-xl mb-1">{p.icon}</span>
                          <span className="text-[10px] uppercase font-bold tracking-tight">{p.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Cash Change request input */}
                  {checkoutPayment === "cash" && (
                    <div className="animate-fade-in">
                      <label className="block text-[11px] font-extrabold text-foreground/60 uppercase tracking-wider mb-1.5">¿Con cuánto pagarás? (Para cambio)</label>
                      <input 
                        type="text" 
                        placeholder="Ej: Con billete de 200 o 500"
                        className="w-full px-4 py-3 bg-surface border border-outline rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-foreground/30"
                        value={checkoutCashChange}
                        onChange={(e) => setCheckoutCashChange(e.target.value)}
                      />
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Drawer Footer controls */}
            <div className="p-5 border-t border-outline/50 bg-surface">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-foreground/50 uppercase tracking-wide">Total a pagar:</span>
                <span className="font-display font-black text-2xl text-primary">${cartTotal.toFixed(2)}</span>
              </div>
              
              {!showCheckoutForm ? (
                /* Primary checkout step navigation button */
                <button 
                  onClick={() => setShowCheckoutForm(true)}
                  className="w-full bg-primary text-white font-display font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-opacity-95 shadow-md shadow-primary/15 transition-all active:scale-98 cursor-pointer"
                >
                  <span>Continuar con el pedido</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                /* Real checkout action buttons */
                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowCheckoutForm(false)}
                    className="w-1/3 border border-outline bg-white hover:bg-black/5 text-foreground font-display font-bold py-4 rounded-2xl transition-colors cursor-pointer text-center text-xs"
                  >
                    Regresar
                  </button>
                  <button 
                    onClick={handleSendOrder}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-display font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/15 transition-all active:scale-98 cursor-pointer"
                  >
                    <span>Enviar a WhatsApp</span>
                    <ShoppingCart className="w-4.5 h-4.5" />
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* --- ITEM DETAILS & VARIANTS BOTTOM-SHEET MODAL --- */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center">
          {/* Backdrop overlay */}
          <div 
            onClick={() => setSelectedItem(null)}
            className="absolute inset-0 bg-black/45 backdrop-blur-xs transition-opacity animate-fade-in"
          ></div>
          
          {/* Modal Container */}
          <div className="relative w-full max-h-[90vh] sm:max-w-lg bg-white rounded-t-4xl sm:rounded-4xl shadow-2xl flex flex-col z-10 animate-slide-up sm:animate-scale-up overflow-hidden">
            
            {/* Header image and dismiss button */}
            <div className="relative h-52 w-full bg-surface">
              <Image alt={selectedItem.name} fill className="object-cover" src={selectedItem.image_url} />
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-black/35 hover:bg-black/55 text-white p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div>
                {selectedItem.badge && (
                  <span className="bg-primary-light text-primary text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
                    {selectedItem.badge}
                  </span>
                )}
                <h3 className="font-display font-black text-xl text-foreground leading-snug">
                  {selectedItem.name}
                </h3>
                <p className="text-foreground/50 text-xs font-normal mt-1.5 leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              {/* Dynamic Variants & options list */}
              {selectedItem.variants?.map((variant) => (
                <div key={variant.id} className="border-t border-outline/35 pt-4.5 space-y-3">
                  <div className="flex justify-between items-center">
                    <h5 className="font-display font-extrabold text-sm text-foreground">
                      {variant.name}
                    </h5>
                    <div className="flex items-center gap-1.5">
                      {variant.is_required && (
                        <span className="bg-primary/10 text-primary text-[8.5px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                          Obligatorio
                        </span>
                      )}
                      <span className="text-[10px] text-foreground/40 font-bold uppercase tracking-wider">
                        {variant.multi_select ? "Selección múltiple" : "Elige uno"}
                      </span>
                    </div>
                  </div>

                  {/* Options items */}
                  <div className="space-y-2">
                    {variant.options.map((opt) => {
                      const isSelected = (modalSelections[variant.id] || []).includes(opt.id);
                      return (
                        <div 
                          key={opt.id}
                          onClick={() => handleOptionToggle(variant.id, opt.id, variant.multi_select)}
                          className={`flex justify-between items-center px-4 py-3 rounded-2xl border transition-all cursor-pointer select-none active:scale-[0.99] ${
                            isSelected 
                              ? "bg-primary-light border-primary text-primary" 
                              : "bg-surface border-outline/50 hover:border-foreground/15 text-foreground/75"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {/* Checkbox or Radio icon */}
                            <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                              isSelected 
                                ? "bg-primary border-primary text-white scale-105 shadow-sm shadow-primary/15" 
                                : "bg-white border-outline"
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-3" />}
                            </div>
                            <span className="text-xs font-bold">{opt.name}</span>
                          </div>
                          {opt.additional_price > 0 && (
                            <span className="font-display font-extrabold text-xs">
                              +${opt.additional_price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Special Instructions (Notes for item) */}
              <div className="border-t border-outline/35 pt-4.5">
                <label className="block text-[11px] font-extrabold text-foreground/60 uppercase tracking-wider mb-1.5">Instrucciones especiales</label>
                <textarea 
                  rows={2}
                  placeholder="Ej: Sin salsa, cambiar ingredientes, aderezos aparte..."
                  className="w-full px-4 py-3 bg-surface border border-outline rounded-xl text-xs font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-foreground/35 resize-none"
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                />
              </div>
            </div>

            {/* Modal Bottom control panel */}
            <div className="p-6 border-t border-outline/50 bg-surface flex items-center justify-between gap-4">
              
              {/* Quantity selector controls */}
              <div className="flex items-center gap-3 bg-white border border-outline px-3 py-1.5 rounded-2xl shrink-0">
                <button 
                  onClick={() => setModalQuantity(q => Math.max(1, q - 1))}
                  className="p-1 hover:bg-black/5 text-foreground/70 rounded-xl active:scale-90 transition-transform cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-display font-black text-sm text-foreground min-w-5 text-center select-none">
                  {modalQuantity}
                </span>
                <button 
                  onClick={() => setModalQuantity(q => q + 1)}
                  className="p-1 hover:bg-black/5 text-foreground/70 rounded-xl active:scale-90 transition-transform cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to cart trigger button */}
              <button 
                onClick={handleAddWithVariants}
                className="flex-1 bg-primary text-white font-display font-bold py-3.5 px-5 rounded-2xl flex justify-between items-center gap-3 hover:bg-opacity-95 shadow-md shadow-primary/15 transition-all active:scale-98 cursor-pointer"
              >
                <span className="text-sm">Agregar al carrito</span>
                <span className="font-display font-black text-sm border-l border-white/20 pl-3">
                  ${modalItemTotal.toFixed(2)}
                </span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- BUSINESS INFO BOTTOM-SHEET / CENTERED MODAL ("VER MÁS") --- */}
      {isInfoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center">
          {/* Backdrop overlay */}
          <div 
            onClick={() => setIsInfoModalOpen(false)}
            className="absolute inset-0 bg-black/45 backdrop-blur-xs transition-opacity animate-fade-in"
          ></div>
          
          {/* Modal Container */}
          <div className="relative w-full max-h-[90vh] sm:max-w-lg bg-white rounded-t-4xl sm:rounded-4xl shadow-2xl flex flex-col z-10 animate-slide-up sm:animate-scale-up overflow-hidden">
            
            {/* Header banner */}
            <div className="relative h-28 w-full bg-linear-to-r from-primary to-secondary flex items-center justify-center shrink-0">
              {/* Blur pattern overlay */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
              <h4 className="font-display font-black text-lg text-white drop-shadow-md">
                Información del Negocio
              </h4>
              <button 
                onClick={() => setIsInfoModalOpen(false)}
                className="absolute top-4 right-4 bg-black/25 hover:bg-black/45 text-white p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hidden">
              
              {/* Business Profile Row */}
              <div className="flex gap-4 items-center border-b border-outline/35 pb-5">
                <div className="w-16 h-16 rounded-2xl bg-white border border-primary/20 overflow-hidden shadow-xs flex items-center justify-center shrink-0">
                  {menu.logo_url && (
                    <Image alt={menu.name} width={64} height={64} className="object-cover aspect-square" src={menu.logo_url} />
                  )}
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-foreground leading-snug">
                    {menu.name}
                  </h3>
                  <p className="text-foreground/50 text-xs font-medium leading-relaxed mt-0.5">
                    {menu.description}
                  </p>
                </div>
              </div>

              {/* Contact & Address Row Card */}
              <div className="space-y-3.5">
                <h5 className="text-[11px] font-extrabold text-foreground/45 uppercase tracking-wider pl-0.5">
                  Contacto y Ubicación
                </h5>
                <div className="bg-surface border border-outline/65 p-4 rounded-3xl space-y-4">
                  {/* Address row */}
                  <div className="flex gap-3.5 items-start">
                    <div className="bg-primary/10 text-primary p-2 rounded-xl shrink-0">
                      <MapPin className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-[10px] text-foreground/40 font-bold uppercase tracking-wider">Dirección</span>
                      <span className="block text-xs font-bold text-foreground mt-0.5 leading-relaxed">{menu.address}</span>
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(menu.name + " " + menu.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] text-primary font-black uppercase tracking-wider mt-1.5 hover:underline cursor-pointer"
                      >
                        <span>Abrir en Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Phone row */}
                  <div className="flex gap-3.5 items-start border-t border-outline/35 pt-4">
                    <div className="bg-secondary/10 text-secondary p-2 rounded-xl shrink-0">
                      <Phone className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-[10px] text-foreground/40 font-bold uppercase tracking-wider">Teléfono / WhatsApp</span>
                      <span className="block text-xs font-bold text-foreground mt-0.5 leading-relaxed">+{menu.whatsapp_phone}</span>
                      <a 
                        href={`https://wa.me/${menu.whatsapp_phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] text-secondary font-black uppercase tracking-wider mt-1.5 hover:underline cursor-pointer"
                      >
                        <span>Escribir por WhatsApp</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Networks Badge Row */}
              {(menu.facebook_url || menu.instagram_url || menu.tiktok_url) && (
                <div className="space-y-3.5">
                  <h5 className="text-[11px] font-extrabold text-foreground/45 uppercase tracking-wider pl-0.5">
                    Redes Sociales
                  </h5>
                  <div className="flex flex-wrap gap-3">
                    {menu.facebook_url && (
                      <a 
                        href={menu.facebook_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white px-4 py-3 rounded-2xl border border-[#1877F2]/15 transition-all font-display text-xs font-bold shadow-xs active:scale-95 cursor-pointer"
                      >
                        <svg className="w-4.5 h-4.5 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        <span>Facebook</span>
                      </a>
                    )}
                    {menu.instagram_url && (
                      <a 
                        href={menu.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-[#E4405F]/10 hover:bg-[#E4405F] text-[#E4405F] hover:text-white px-4 py-3 rounded-2xl border border-[#E4405F]/15 transition-all font-display text-xs font-bold shadow-xs active:scale-95 cursor-pointer"
                      >
                        <svg className="w-4.5 h-4.5 fill-none stroke-current stroke-2 shrink-0" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                        <span>Instagram</span>
                      </a>
                    )}
                    {menu.tiktok_url && (
                      <a 
                        href={menu.tiktok_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-[#000000]/10 hover:bg-[#000000] text-[#000000] hover:text-white px-4 py-3 rounded-2xl border border-[#000000]/15 transition-all font-display text-xs font-bold shadow-xs active:scale-95 cursor-pointer"
                      >
                        <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.5-1.12-.83-1.92-2.07-2.22-3.47-.02 2.44-.01 4.88-.02 7.32-.03 1.83-.52 3.73-1.74 5.09-1.39 1.56-3.64 2.4-5.75 2.13-2.61-.33-4.88-2.39-5.38-4.99-.61-3.15 1.34-6.44 4.43-7.07.7-.14 1.43-.16 2.14-.07v4.09c-.64-.09-1.31-.05-1.91.17-1.12.41-1.89 1.56-1.83 2.75.05 1.25.99 2.33 2.22 2.47 1.23.14 2.51-.62 2.86-1.8.1-.34.12-.7.11-1.05-.02-4.14-.01-8.28-.02-12.43z" />
                        </svg>
                        <span>TikTok</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Opening Hours list highlighting current day */}
              {menu.hours && menu.hours.length > 0 && (
                <div className="space-y-3.5">
                  <h5 className="text-[11px] font-extrabold text-foreground/45 uppercase tracking-wider pl-0.5">
                    Horarios de Atención
                  </h5>
                  <div className="bg-surface border border-outline/65 rounded-3xl p-4 space-y-2">
                    {(() => {
                      const currentDayName = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"][new Date().getDay()];
                      return menu.hours.map((hour, idx) => {
                        const isToday = hour.day.toLowerCase() === currentDayName.toLowerCase();
                        return (
                          <div 
                            key={idx} 
                            className={`flex justify-between items-center px-3.5 py-2.5 rounded-xl transition-all duration-200 ${
                              isToday 
                                ? "bg-primary-light text-primary border border-primary/20 font-bold scale-[1.01] shadow-xs" 
                                : "text-foreground/80 font-medium"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 text-xs">
                              <Clock className={`w-4 h-4 ${isToday ? "text-primary animate-pulse" : "text-foreground/35"}`} />
                              <span>{hour.day}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs">{hour.hours}</span>
                              {isToday && (
                                <span className="bg-primary text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                                  Hoy
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              )}

              {/* Accepted Payment Badges */}
              {menu.payment_methods && menu.payment_methods.length > 0 && (
                <div className="space-y-3.5">
                  <h5 className="text-[11px] font-extrabold text-foreground/45 uppercase tracking-wider pl-0.5">
                    Métodos de Pago Aceptados
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {menu.payment_methods.map((method, idx) => {
                      let icon = "💳";
                      if (method.toLowerCase().includes("efectivo")) icon = "💵";
                      else if (method.toLowerCase().includes("transfe") || method.toLowerCase().includes("spei")) icon = "🏦";
                      
                      return (
                        <span 
                          key={idx}
                          className="inline-flex items-center gap-1.5 bg-surface border border-outline px-3.5 py-2 rounded-2xl text-xs font-bold text-foreground/85 shadow-xs"
                        >
                          <span>{icon}</span>
                          <span>{method}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Bottom control panel */}
            <div className="p-5 border-t border-outline/50 bg-surface flex items-center justify-between gap-4">
              <button 
                onClick={() => setIsInfoModalOpen(false)}
                className="w-full bg-foreground text-background hover:bg-black font-display font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98 cursor-pointer"
              >
                Entendido
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
