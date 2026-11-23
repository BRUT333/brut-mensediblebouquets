import { AnimatePresence, motion } from "framer-motion";
import { Info, Phone, Plus } from "lucide-react";
import { useState } from "react";
import { FAQS } from "@/data/content";
import { BRAND, links } from "@/lib/config";
import { cn } from "@/utils/cn";
import { ButtonLink } from "../ui/Button";
import { TelegramIcon, WhatsAppIcon } from "../ui/Icons";
import { EASE, Reveal } from "../ui/motion";
import { Accent, SectionHeading } from "../ui/SectionHeading";

interface FaqItemProps {
  index: number;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}

function FaqItem({ index, question, answer, open, onToggle }: FaqItemProps) {
  const id = `faq-${index}`;
  return (
    <Reveal delay={Math.min(index * 0.04, 0.24)}>
      <div
        className={cn(
          "rounded-2xl border transition-colors duration-300",
          open ? "border-gold-300/25 bg-white/[0.035]" : "border-white/[0.07] bg-white/[0.015] hover:border-white/15"
        )}
      >
        <h3>
          <button
            id={`${id}-button`}
            type="button"
            aria-expanded={open}
            aria-controls={`${id}-panel`}
            onClick={onToggle}
            className="flex w-full items-center justify-between gap-6 rounded-2xl px-5 py-5 text-left sm:px-6"
          >
            <span className="text-base font-semibold text-cream sm:text-[17px]">{question}</span>
            <span
              aria-hidden="true"
              className={cn(
                "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                open ? "rotate-45 border-gold-300/40 bg-gold-300/10 text-gold-200" : "border-white/10 text-sand/70"
              )}
            >
              <Plus className="h-4 w-4" />
            </span>
          </button>
        </h3>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={`${id}-panel`}
              role="region"
              aria-labelledby={`${id}-button`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden"
            >
              <p className="px-5 pb-6 text-[15px] leading-relaxed text-sand/80 sm:px-6">{answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-title"
            align="left"
            eyebrow="Вопросы"
            icon={Info}
            title={
              <>
                Отвечаем <Accent>честно</Accent>
              </>
            }
            description="Собрали ответы на самые частые вопросы о доставке, свежести и оплате."
          />
          <Reveal delay={0.2}>
            <div className="mt-8 rounded-3xl border border-white/[0.08] bg-ink-850/70 p-6">
              <p className="font-bold text-cream">Остались вопросы?</p>
              <p className="mt-1 text-sm text-sand/70">Напишите нам — ответим за 5 минут, с 09:00 до 22:00.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <ButtonLink size="sm" variant="glass" href={links.whatsapp()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
                  WhatsApp
                </ButtonLink>
                <ButtonLink size="sm" variant="glass" href={links.telegram} target="_blank" rel="noopener noreferrer">
                  <TelegramIcon className="h-4 w-4 text-[#2AABEE]" />
                  Telegram
                </ButtonLink>
                <ButtonLink size="sm" variant="glass" href={BRAND.phoneHref}>
                  <Phone className="h-4 w-4 text-gold-300" aria-hidden="true" />
                  Позвонить
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.q}
              index={i}
              question={item.q}
              answer={item.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
