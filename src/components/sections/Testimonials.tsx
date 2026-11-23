import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/content";
import { cn } from "@/utils/cn";
import { EASE, Reveal } from "../ui/motion";
import { Accent, SectionHeading } from "../ui/SectionHeading";
import { SpotlightCard } from "../ui/SpotlightCard";

const AVATAR_BG = [
  "linear-gradient(135deg,#fbe3b8,#d9873a)",
  "linear-gradient(135deg,#f0c8a0,#9b4f2e)",
  "linear-gradient(135deg,#e8d4b8,#8e6a3f)",
  "linear-gradient(135deg,#ffd6a5,#c46a3c)",
  "linear-gradient(135deg,#f5e0c0,#a8743f)",
  "linear-gradient(135deg,#e7b98f,#7c3b2a)",
  "linear-gradient(135deg,#fde7bf,#b8662a)",
];

function Stars({ className }: { className?: string }) {
  return (
    <div role="img" aria-label="Оценка 5 из 5" className={cn("flex items-center gap-0.5 text-gold-300", className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="reviews-title"
            align="left"
            eyebrow="Отзывы"
            icon={Star}
            title={
              <>
                640+ отзывов — и <Accent>ни одного букета в вазе</Accent>
              </>
            }
            description="Истории наших клиентов: жён, сестёр, невесток, кумов и коллег."
          />
          <Reveal delay={0.1} className="shrink-0">
            <div className="flex items-center gap-5 rounded-3xl border border-white/[0.08] bg-ink-850/70 p-5 pr-7">
              <p className="text-5xl font-extrabold tracking-[-0.05em] text-cream">4,9</p>
              <div>
                <Stars />
                <p className="mt-1.5 text-sm font-semibold text-cream/90">Средняя оценка</p>
                <p className="text-xs text-sand/55">Google · Instagram · Яндекс Карты</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: EASE }}
              className="mb-5 inline-block w-full break-inside-avoid"
            >
              <SpotlightCard className="rounded-[1.75rem] border border-white/[0.08] bg-ink-850/70 p-6 transition-colors duration-300 hover:border-white/15 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <Stars />
                  <span className="rounded-full border border-gold-300/20 bg-gold-300/[0.06] px-2.5 py-1 text-[11px] font-semibold text-gold-200">
                    {t.product}
                  </span>
                </div>
                <blockquote className="mt-5 text-[15px] leading-relaxed text-cream/90">
                  <p>«{t.text}»</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-extrabold text-ink-950"
                    style={{ backgroundImage: AVATAR_BG[i % AVATAR_BG.length] }}
                  >
                    {t.name[0]}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-cream">
                      {t.name} <span className="font-normal text-sand/55">· {t.city}</span>
                    </span>
                    <span className="block truncate text-xs text-sand/55">{t.occasion}</span>
                  </span>
                </figcaption>
              </SpotlightCard>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
