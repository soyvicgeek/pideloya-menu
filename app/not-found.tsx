import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-6 py-12 text-center bg-surface font-sans relative overflow-hidden">
      
      {/* Decorative Blur Background Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-primary/5 blur-[80px] pointer-events-none"></div>

      <div className="relative z-10 max-w-md w-full flex flex-col items-center">
        
        {/* Icon Container */}
        <div className="bg-primary/10 text-primary p-5 rounded-3xl mb-6 flex items-center justify-center shadow-xs">
          <FileQuestion className="w-12 h-12" />
        </div>

        {/* 404 Badge */}
        <span className="text-[10px] font-extrabold text-primary tracking-widest uppercase bg-primary-light px-3 py-1 rounded-full mb-3">
          Error 404
        </span>

        {/* Title */}
        <h1 className="font-display font-black text-3xl sm:text-4xl text-foreground tracking-tight mb-3">
          Página No Encontrada
        </h1>

        {/* Message */}
        <p className="text-foreground/50 text-sm font-medium leading-relaxed mb-8">
          Lo sentimos, el menú o la sección que buscas no existe, ha cambiado de dirección o se encuentra temporalmente desactivada.
        </p>

        {/* Return Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/95 text-white font-display text-sm font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all active:scale-95 duration-150 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </Link>

      </div>
    </div>
  );
}
