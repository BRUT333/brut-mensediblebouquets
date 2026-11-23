import { motion } from "framer-motion";
import { ArrowRight, Check, Flame, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { COMPARISON } from "@/data/content";
import { Button } from "../ui/Button";
import { LogoMark } from "../ui/Logo";
import { fadeUp, Reveal, stagger } from "../ui/motion";
import { Accent, SectionHeading } from "../ui/SectionHeading";

export function Benefits() {
  const { openOrder } = useApp();

  return (
    <section id="benefits" aria-labelledby="benefits-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          id="benefits-title"
          eyebrow="Почему съедобный букет"
          icon={Flame}
          title={
            <>
              Цветы завянут. <Accent>Впечатление останется</Accent>
            </>
          }
          description="Мужчины редко радуются цветам и парфюму «на всякий случай». А букет из любимых деликатесов — это эмоция, которую разделят с семьёй и друзьями."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="h-full rounded-[2rem] border border-white/[0.07] bg-ink-900/60 p-7 sm:p-9">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.04] text-sand/50">
                  <X className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sand/45">Обычный подарок</p>
                  <h3 className="mt-1 text-xl font-bold text-sand/80">Цветы, парфюм, конверт</h3>
                </div>
              </div>
              <motion.ul
                variants={stagger(0.08, 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="mt-8 space-y-4"
              >
                {COMPARISON.typical.map((item) => (
                  <motion.li key={item} variants={fadeUp} className="flex items-start gap-3 text-[15px] text-sand/55">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/[0.05]">
                      <X className="h-3 w-3" aria-hidden="true" />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-gold-300/25 bg-gradient-to-br from-gold-400/[0.13] via-ink-850 to-ink-850 p-7 shadow-[0_40px_120px_-50px_rgba(235,168,89,0.55)] sm:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold-400/20 blur-3xl"
              />
              <div className="relative flex items-center gap-4">
                <LogoMark className="h-12 w-12" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-300">Букет BRUT</p>
                  <h3 className="mt-1 text-xl font-bold text-cream">Подарок, который запомнят</h3>
                </div>
              </div>
              <motion.ul
                variants={stagger(0.08, 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="relative mt-8 space-y-4"
              >
                {COMPARISON.brut.map((item) => (
                  <motion.li key={item} variants={fadeUp} className="flex items-start gap-3 text-[15px] text-cream/90">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full gold-fill text-ink-950">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
              <div className="relative mt-9">
                <Button onClick={() => openOrder()}>
                  Выбрать подарок
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
