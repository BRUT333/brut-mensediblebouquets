import type { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export function IconBadge({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span
      className={cn(
        "grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-gold-300/20 bg-gradient-to-b from-gold-300/15 to-gold-300/[0.03] text-gold-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        className
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
    </span>
  );
}
