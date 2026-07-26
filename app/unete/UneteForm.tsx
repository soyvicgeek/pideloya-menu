"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { enviarSolicitud } from "./actions";
import { ESTADO_INICIAL, type EstadoFormulario, type FieldName } from "./validation";

function Campo({
  name,
  label,
  requerido = false,
  error,
  defaultValue,
  ...rest
}: {
  name: FieldName;
  label: string;
  requerido?: boolean;
  error?: string;
  defaultValue?: string;
} & React.ComponentProps<typeof Input>) {
  const errorId = `${name}-error`;

  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>
        {label}
        {requerido && <span className="text-brand-600">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />
      {error && (
        <p id={errorId} className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function BotonEnviar() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Enviando…
        </>
      ) : (
        "Quiero mi menú"
      )}
    </Button>
  );
}

function Exito() {
  return (
    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center">
      <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
        <CheckCircle2 className="size-7" />
      </div>
      <h2 className="font-display text-xl font-black text-emerald-900">
        ¡Solicitud recibida!
      </h2>
      <p className="mt-2 text-sm font-medium leading-relaxed text-emerald-800/80">
        Nos vamos a comunicar contigo por teléfono o WhatsApp para activar el menú de tu
        negocio. No necesitas hacer nada más por ahora.
      </p>
    </div>
  );
}

export function UneteForm() {
  const [estado, formAction] = useActionState<EstadoFormulario, FormData>(
    enviarSolicitud,
    ESTADO_INICIAL,
  );

  if (estado.ok) return <Exito />;

  const e = estado.errores;
  const v = estado.valores ?? {};

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {e._form && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
          {e._form}
        </div>
      )}

      <fieldset className="space-y-4">
        <legend className="mb-3 text-[11px] font-extrabold uppercase tracking-widest text-brand-600">
          Tus datos
        </legend>

        <Campo
          name="nombre"
          label="Nombre"
          requerido
          error={e.nombre}
          defaultValue={v.nombre}
          autoComplete="given-name"
          placeholder="Juan"
        />
        <Campo
          name="apellido_paterno"
          label="Apellido paterno"
          requerido
          error={e.apellido_paterno}
          defaultValue={v.apellido_paterno}
          autoComplete="family-name"
          placeholder="Pérez"
        />
        <Campo
          name="apellido_materno"
          label="Apellido materno"
          requerido
          error={e.apellido_materno}
          defaultValue={v.apellido_materno}
          placeholder="López"
        />
        <Campo
          name="correo"
          label="Correo electrónico"
          requerido
          error={e.correo}
          defaultValue={v.correo}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="tucorreo@ejemplo.com"
        />
        <Campo
          name="telefono"
          label="Teléfono de contacto"
          requerido
          error={e.telefono}
          defaultValue={v.telefono}
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={14}
          placeholder="786 123 4567"
        />
      </fieldset>

      <fieldset className="space-y-4 border-t border-outline/60 pt-5">
        <legend className="mb-3 text-[11px] font-extrabold uppercase tracking-widest text-brand-600">
          Tu negocio
        </legend>

        <Campo
          name="negocio"
          label="Nombre del negocio"
          requerido
          error={e.negocio}
          defaultValue={v.negocio}
          placeholder="Tacos El Güero"
        />
      </fieldset>

      <fieldset className="space-y-4 border-t border-outline/60 pt-5">
        <legend className="mb-1 text-[11px] font-extrabold uppercase tracking-widest text-brand-600">
          Redes sociales
        </legend>
        <p className="!mt-0 mb-3 text-xs font-medium text-foreground/45">
          Opcionales. Si no tienes, déjalas vacías.
        </p>

        <Campo
          name="facebook_url"
          label="Facebook"
          error={e.facebook_url}
          defaultValue={v.facebook_url}
          inputMode="url"
          placeholder="facebook.com/tunegocio"
        />
        <Campo
          name="instagram_url"
          label="Instagram"
          error={e.instagram_url}
          defaultValue={v.instagram_url}
          inputMode="url"
          placeholder="instagram.com/tunegocio"
        />
        <Campo
          name="tiktok_url"
          label="TikTok"
          error={e.tiktok_url}
          defaultValue={v.tiktok_url}
          inputMode="url"
          placeholder="tiktok.com/@tunegocio"
        />
      </fieldset>

      {/* Trampa para bots: invisible y fuera del orden de tabulación.
          Una persona nunca la llena; un robot que rellena todo, sí. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">No llenar</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <BotonEnviar />

      <p className="text-center text-xs font-medium leading-relaxed text-foreground/45">
        Al enviar, aceptas que te contactemos por teléfono o WhatsApp para activar tu menú.
      </p>
    </form>
  );
}
