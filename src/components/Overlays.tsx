import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { CircleCheck } from "lucide-react";
import { useApp } from "@/context/AppContext";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left gold-fill"
    />
  );
}

export function Toast() {
  const { toast } = useApp();
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-20 z-[80] flex justify-center px-4"
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast}
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-ink-800/95 px-4 py-2.5 text-sm font-medium text-cream shadow-2xl shadow-black/50 backdrop-blur-xl"
          >
            <CircleCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Subtle film grain for a premium, tactile feel. */
export function Grain() {
  return <div aria-hidden="true" className="noise pointer-events-none fixed inset-0 z-[90] opacity-[0.035]" />;
}
