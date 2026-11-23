import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type Variant = "primary" | "glass" | "ghost";
type Size = "sm" | "md" | "lg";

const BASE =
  "group/btn relative inline-flex select-none items-center justify-center gap-2 rounded-full text-center font-semibold leading-tight tracking-[-0.01em] transition-all duration-300 ease-out-expo active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  primary:
    "btn-shine gold-fill text-ink-950 shadow-[0_12px_40px_-14px_rgba(235,168,89,0.8),inset_0_1px_0_rgba(255,255,255,0.55)] hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-14px_rgba(235,168,89,0.95),inset_0_1px_0_rgba(255,255,255,0.6)]",
  glass: "glass text-cream hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08]",
  ghost: "text-sand hover:bg-white/5 hover:text-cream",
};

const SIZES: Record<Size, string> = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-12 px-6 py-2.5 text-[15px]",
  lg: "min-h-14 px-7 py-3 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={buttonClasses(variant, size, className)} {...props} />;
}
