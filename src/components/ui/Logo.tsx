import { useId } from "react";
import { cn } from "@/utils/cn";

export function LogoMark({ className }: { className?: string }) {
  const id = `logo-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FBE3B8" />
          <stop offset="0.55" stopColor="#EBA859" />
          <stop offset="1" stopColor="#B8662A" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${id})`} />
      <circle cx="10.5" cy="11" r="3.2" fill="#0B0B0D" />
      <circle cx="16" cy="8.6" r="3.2" fill="#0B0B0D" />
      <circle cx="21.5" cy="11" r="3.2" fill="#0B0B0D" />
      <path d="M8 14.6h16L16 26.6z" fill="#0B0B0D" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-9 shrink-0 drop-shadow-[0_6px_18px_rgba(235,168,89,0.35)]" />
      <span className="flex flex-col leading-none">
        <span className="text-[17px] font-extrabold tracking-[0.24em] text-cream">BRUT</span>
        <span className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-sand/55">
          съедобные букеты
        </span>
      </span>
    </span>
  );
}
