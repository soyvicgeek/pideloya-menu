import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between bg-zinc-950 text-white overflow-hidden font-sans">
      
      {/* Decorative Gradient Blobs for premium dark glassmorphism aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none"></div>
      
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-2xl px-6 py-20 text-center select-none">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase text-primary mb-8 animate-fade-in shadow-xs backdrop-blur-md">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Próximamente
        </div>

        {/* Headline */}
        <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight leading-[1.1] text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/70 mb-6 drop-shadow-sm animate-scale-up">
          Tu propio menú digital en{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
            Ciudad Hidalgo, Michoacán
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-zinc-400 text-base sm:text-lg max-w-lg mb-10 leading-relaxed font-medium animate-fade-in">
          Moderniza tu restaurante o negocio local. Recibe pedidos organizados con carrito de compras directamente en tu WhatsApp.
        </p>

        {/* Interactive Features Card (Mocking a preview of a menu item to wow them) */}
        <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-3xl p-5 mb-12 shadow-2xl backdrop-blur-md text-left animate-fade-in hover:border-white/20 transition-all duration-300">
          <div className="flex gap-4">
            <div className="relative w-16 h-16 rounded-2xl bg-zinc-900 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
              <span className="text-2xl">🍔</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-display font-extrabold text-sm text-white">Mega Burger Especial</h3>
                <span className="text-primary font-extrabold text-sm">$129.00</span>
              </div>
              <p className="text-zinc-400 text-xs mt-1 line-clamp-2">Doble carne de res, queso cheddar fundido, tocino crujiente y aderezo especial de la casa.</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Vista Previa del Menú</span>
            <button className="bg-primary hover:bg-primary/90 text-white font-display text-[10px] font-extrabold px-3 py-1.5 rounded-xl uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-primary/20 cursor-pointer">
              + Agregar
            </button>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-12 px-6 border-t border-white/5 bg-zinc-950/50 backdrop-blur-xs flex flex-col items-center gap-3.5 animate-fade-in">
        <span className="text-[11px] font-extrabold text-zinc-500 uppercase tracking-widest pl-0.5">By</span>
        <div className="relative w-44 h-12 flex items-center justify-center">
          <Image 
            src="/logo-white.png" 
            alt="Logo Pídelo Ya" 
            fill 
            className="object-contain" 
            priority
          />
        </div>
      </footer>

    </div>
  );
}
