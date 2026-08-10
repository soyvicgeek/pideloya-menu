import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Store } from "lucide-react";

import type { ShowcaseBusiness } from "@/lib/showcase";

/**
 * The businesses that already have their menu: logo, name and their link.
 *
 * This is social proof, so it stays deliberately thin. Adding dishes or prices
 * here would compete with the pricing section right below it, and that one has
 * to win the attention.
 */
export function Showcase({ businesses }: { businesses: ShowcaseBusiness[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {businesses.map((business) => (
        <li key={business.slug}>
          {/*
            New tab on purpose: whoever is reading the landing is deciding
            whether to sign up. Sending them into somebody else's menu in the
            same tab means they have to find their way back to the pricing.
          */}
          <Link
            href={`/${business.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full flex-col items-center rounded-3xl border border-outline/70 bg-white p-5 text-center shadow-xs transition-all hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-md"
          >
            {business.logo ? (
              <Image
                src={business.logo}
                alt={`Logo de ${business.name}`}
                width={72}
                height={72}
                className="size-18 rounded-2xl border border-outline/50 object-cover"
              />
            ) : (
              // A business without a logo is not hidden: the gap gets painted
              // in the brand colors. Someone is there, and it should show.
              <span className="flex size-18 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <Store className="size-7" />
              </span>
            )}

            <h3 className="mt-4 line-clamp-2 font-display text-sm font-extrabold text-foreground">
              {business.name}
            </h3>

            <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-brand-600">
              Ver menú
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
