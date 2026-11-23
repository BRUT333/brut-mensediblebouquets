import { motion, useScroll, useSpring } from "framer-motion";
import { Clock, ShieldCheck } from "lucide-react";
import { useRef } from "react";
import { useApp } from "@/context/AppContext";
import { STEPS } from "@/data/content";
import { Button } from "../ui/Button";
import { EASE, Reveal } from "../ui/motion";
import { Accent, SectionHeading } from "../ui/SectionHeading";

export function Process() {
  const { openOrder } = useApp();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="how" aria-labelledby="how-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          id="how-title"
          eyebrow="Как заказать"
          icon={Clock}
          title={
            <>
              Заказать проще, <Accent>чем выбрать галстук</Accent>
            </>
          }
          description="Четыре шага и около двух минут вашего времени. Остальное — наша забота."
        />

        <div ref={trackRef} className="relative mt-16">
          {/* Desktop progress line */}
          <div aria-hidden="true" className="absolute left-7 right-7 top-7 hidden h-px bg-white/[0.08] lg:block">
            <motion.div style={{ scaleX: progress }} className="h-full origin-left gold-fill" />
          </div>
          {/* Mobile progress line */}
          <div aria-hidden="true" className="absolute bottom-7 left-7 top-7 w-px bg-white/[0.08] lg:hidden">
            <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top gold-fill" />
          </div>

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
                  className="relative flex gap-5 lg:flex-col lg:gap-6"
                >
                  <div className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/10 bg-ink-850 shadow-[0_0_0_8px_var(--color-ink-950)]">
                    <Icon className="h-6 w-6 text-gold-300" strokeWidth={1.8} aria-hidden="true" />
                    <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full gold-fill text-[11px] font-extrabold text-ink-950">
                      {i + 1}
                    </span>
                  </div>
                  <div className="pt-1 lg:pt-0">
                    <h3 className="text-lg font-bold text-cream">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-sand/75">{step.text}</p>
                    <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-gold-300/15 bg-gold-300/[0.05] px-2.5 py-1 text-xs font-semibold text-gold-200/90">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {step.time}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <Reveal className="mt-16">
          <div className="flex flex-col items-start gap-5 rounded-[1.75rem] border border-emerald-400/15 bg-gradient-to-br from-emerald-400/[0.07] to-transparent p-6 sm:flex-row sm:items-center sm:p-8">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-emerald-400/10 text-emerald-300">
              <ShieldCheck className="h-7 w-7" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <p className="text-lg font-bold text-cream">Гарантия свежести и качества</p>
              <p className="mt-1 text-sm leading-relaxed text-sand/75">
                Если букет не понравится при вручении — бесплатно заменим или вернём деньги. Без споров и долгих
                переписок.
              </p>
            </div>
            <Button variant="glass" onClick={() => openOrder()} className="shrink-0">
              Заказать без риска
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
