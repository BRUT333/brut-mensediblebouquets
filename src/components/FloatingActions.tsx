import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BRAND, links } from "@/lib/config";
import { useScrolled } from "@/lib/hooks";
import { Button } from "./ui/Button";
import { WhatsAppIcon } from "./ui/Icons";

/** Sticky mobile CTA bar + desktop WhatsApp bubble (appear after scrolling past the hero). */
export function FloatingActions() {
  const { openOrder, order } = useApp();
  const visible = useScrolled(640) && !order;

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            key="mobile-cta"
            initial={{ y: 110, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 110, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-ink-900/85 p-2 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.7)] backdrop-blur-xl">
              <Button className="min-h-12 flex-1 px-4" onClick={() => openOrder()}>
                Заказать букет
                <span className="hidden rounded-full bg-ink-950/15 px-1.5 py-0.5 text-[11px] font-bold min-[360px]:inline">
                  −10%
                </span>
              </Button>
              <a
                href={links.whatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Написать в WhatsApp"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-whatsapp/15 text-whatsapp transition-colors hover:bg-whatsapp/25"
              >
                <WhatsAppIcon className="h-6 w-6" />
              </a>
              <a
                href={BRAND.phoneHref}
                aria-label="Позвонить"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-cream transition-colors hover:bg-white/10"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.a
            key="desktop-wa"
            href={links.whatsapp()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Написать в WhatsApp — ответим за 5 минут"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="group fixed bottom-6 right-6 z-40 hidden items-center gap-3 lg:flex"
          >
            <span className="pointer-events-none translate-x-2 rounded-full border border-white/10 bg-ink-900/90 px-4 py-2 text-sm font-medium text-cream opacity-0 shadow-xl backdrop-blur-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              Ответим за 5 минут
            </span>
            <span className="relative grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_12px_30px_-6px_rgba(37,211,102,0.55)] transition-transform duration-300 group-hover:scale-110">
              <span aria-hidden="true" className="absolute inset-0 animate-ping-slow rounded-full bg-whatsapp/60" />
              <WhatsAppIcon className="relative h-7 w-7" />
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
