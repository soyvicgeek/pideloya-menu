import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full min-w-0 rounded-xl border border-outline bg-white px-4 py-2 text-base font-medium",
        "placeholder:text-foreground/35 transition-all outline-none",
        "focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20",
        "disabled:cursor-not-allowed disabled:opacity-60",
        // aria-invalid lo pone el formulario cuando el servidor devuelve error
        "aria-invalid:border-red-500 aria-invalid:ring-2 aria-invalid:ring-red-500/15",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
