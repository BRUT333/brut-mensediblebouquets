import { useRef, type HTMLAttributes, type MouseEvent } from "react";
import { cn } from "@/utils/cn";

/** Card with a soft gold light + glowing border that follows the cursor. */
export function SpotlightCard({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} onMouseMove={handleMove} className={cn("spotlight", className)} {...props}>
      {children}
    </div>
  );
}
