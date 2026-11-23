import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { formatAMD } from "@/lib/config";
import { cn } from "@/utils/cn";
import { EASE } from "./motion";

interface CountUpProps {
  to: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}

function formatNumber(value: number, decimals: number, suffix: string) {
  return (
    value.toLocaleString("ru-RU", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix
  );
}

/** Counts up from 0 when scrolled into view. */
export function CountUp({ to, decimals = 0, suffix = "", duration = 2.2 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    if (reduce) {
      node.textContent = formatNumber(to, decimals, suffix);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = formatNumber(v, decimals, suffix);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, decimals, suffix, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {formatNumber(0, decimals, suffix)}
    </span>
  );
}

/** Price that smoothly springs between values. */
export function AnimatedPrice({
  value,
  className,
  announce = true,
}: {
  value: number;
  className?: string;
  /** Announce changes to screen readers (disable for duplicated prices). */
  announce?: boolean;
}) {
  const motionValue = useMotionValue(value);
  const spring = useSpring(motionValue, { stiffness: 140, damping: 22, mass: 0.6 });
  const text = useTransform(spring, (v) => formatAMD(Math.round(v / 10) * 10));

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  return (
    <>
      <motion.span aria-hidden="true" className={cn("tabular-nums", className)}>
        {text}
      </motion.span>
      {announce ? (
        <span className="sr-only" aria-live="polite">
          {formatAMD(value)}
        </span>
      ) : (
        <span className="sr-only">{formatAMD(value)}</span>
      )}
    </>
  );
}
