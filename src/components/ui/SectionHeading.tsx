import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Reveal } from "./motion";

export function Accent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("gold-text pr-[0.08em] font-serif font-semibold italic tracking-[-0.01em]", className)}>
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  id?: string;
  eyebrow: string;
  icon?: LucideIcon;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  icon: Icon,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-gold-300/20 bg-gold-300/[0.06] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-200">
          {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.06} blur>
        <h2
          id={id}
          className="mt-5 text-balance text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-cream sm:text-5xl lg:text-[3.4rem]"
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-5 text-pretty text-base leading-relaxed text-sand/75 sm:text-lg",
              centered && "mx-auto max-w-2xl"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
