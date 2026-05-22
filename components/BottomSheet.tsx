"use client";

import React from "react";
import { Drawer } from "vaul";

export interface BottomSheetProps {
  /** Controlled open state */
  open: boolean;
  /** Called when the sheet wants to close (drag-dismiss, overlay tap, ESC) */
  onOpenChange: (open: boolean) => void;
  /** Optional title rendered at the top — also used for a11y */
  title?: string;
  /** Optional description for screen-readers */
  description?: string;
  /**
   * Snap points expressed as fractions or CSS values.
   * Example: [0.45, 1] → snaps at 45% and 100% of viewport.
   */
  snapPoints?: (number | string)[];
  /** Index into snapPoints to start at (0-based). Defaults to 0. */
  activeSnapPoint?: number | string | null;
  /** Called when snap point changes */
  onActiveSnapPointChange?: (snapPoint: number | string | null) => void;
  /** Whether the background should scale down when open */
  shouldScaleBackground?: boolean;
  /**
   * "default" — renders grab-handle, title, description and a scrollable padded area.
   * "bare" — renders only the grab-handle; children control the full internal layout
   *           (useful for custom headers, sticky footers, images, etc.).
   */
  variant?: "default" | "bare";
  /** Content to render inside the drawer */
  children: React.ReactNode;
}

/**
 * A mobile-native Bottom Sheet built on top of **Vaul**.
 *
 * Features:
 * - Drag-to-dismiss with spring physics & inertia
 * - Blurred dark overlay backdrop
 * - Grab-handle indicator
 * - Full keyboard / screen-reader accessibility (focus trap, ESC to close)
 * - Optional snap-point support
 * - "bare" variant for fully custom internal layouts
 */
export function BottomSheet({
  open,
  onOpenChange,
  title,
  description,
  snapPoints,
  activeSnapPoint,
  onActiveSnapPointChange,
  shouldScaleBackground = false,
  variant = "default",
  children,
}: BottomSheetProps) {
  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={snapPoints}
      activeSnapPoint={activeSnapPoint}
      setActiveSnapPoint={onActiveSnapPointChange}
      shouldScaleBackground={shouldScaleBackground}
    >
      <Drawer.Portal>
        {/* ── Overlay ── */}
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />

        {/* ── Content panel ── */}
        <Drawer.Content
          className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[94vh] w-full flex-col rounded-t-3xl bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.12)] outline-none sm:max-w-lg sm:rounded-t-4xl overflow-hidden"
        >
          {/* Grab-handle bar — always visible for drag affordance */}
          <div className="flex w-full items-center justify-center pt-3 pb-1 absolute top-0 left-0 right-0 z-20">
            <div className="h-1.5 w-12 rounded-full bg-black/15" />
          </div>

          {/* Hidden a11y title & description (always required by Radix) */}
          <Drawer.Title className={title && variant === "default" ? "px-6 pb-1 pt-6 font-display text-lg font-extrabold text-foreground" : "sr-only"}>
            {title || "Panel"}
          </Drawer.Title>
          <Drawer.Description className={description && variant === "default" ? "px-6 pb-3 text-xs text-foreground/50" : "sr-only"}>
            {description || "Contenido del panel deslizable"}
          </Drawer.Description>

          {variant === "bare" ? (
            /* Bare mode: children control the full layout */
            <>{children}</>
          ) : (
            /* Default mode: scrollable padded container */
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-8 scrollbar-hidden">
              {children}
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
