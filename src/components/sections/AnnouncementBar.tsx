import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { BRAND, copyText } from "@/lib/config";

export function AnnouncementBar() {
  const { showToast } = useApp();
  const [visible, setVisible] = useState(true);

  const handleCopy = async () => {
    if (await copyText(BRAND.promo)) showToast(`Промокод ${BRAND.promo} скопирован`);
  };

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden border-b border-white/[0.06] bg-gradient-to-r from-ink-950 via-gold-700/20 to-ink-950"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-2.5 px-11 py-2 text-center text-[12.5px] text-sand/80 sm:text-[13px]">
            <Sparkles className="hidden h-3.5 w-3.5 shrink-0 text-gold-300 sm:block" aria-hidden="true" />
            <p>
              <span className="font-semibold text-cream">−10% на первый заказ</span> по промокоду{" "}
              <button
                type="button"
                onClick={handleCopy}
                aria-label={`Скопировать промокод ${BRAND.promo}`}
                className="rounded-md border border-dashed border-gold-300/45 px-1.5 py-px font-mono text-[12px] font-bold text-gold-200 transition-colors hover:bg-gold-300/10"
              >
                {BRAND.promo}
              </button>
              <span className="hidden md:inline"> · Доставка по Еревану от 90 минут · Фото букета до оплаты</span>
            </p>
            <button
              type="button"
              onClick={() => setVisible(false)}
              aria-label="Скрыть объявление"
              className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-sand/50 transition-colors hover:bg-white/5 hover:text-cream"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
