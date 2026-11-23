import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Users } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { useApp } from "@/context/AppContext";
import { PERSONAS, PRODUCTS } from "@/data/content";
import { formatAMD } from "@/lib/config";
import { cn } from "@/utils/cn";
import { Button } from "../ui/Button";
import { EASE, Reveal, SPRING } from "../ui/motion";
import { Accent, SectionHeading } from "../ui/SectionHeading";

export function ForWhom() {
  const { openOrder } = useApp();
  const [activeId, setActiveId] = useState(PERSONAS[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const persona = PERSONAS.find((p) => p.id === activeId) ?? PERSONAS[0];
  const product = PRODUCTS.find((p) => p.id === persona.productId) ?? PRODUCTS[0];

  const select = (index: number) => {
    setActiveId(PERSONAS[index].id);
    const tab = tabRefs.current[index];
    tab?.focus();
    tab?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = PERSONAS.findIndex((p) => p.id === activeId);
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % PERSONAS.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + PERSONAS.length) % PERSONAS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = PERSONAS.length - 1;
    else return;
    event.preventDefault();
    select(next);
  };

  return (
    <section id="for-whom" aria-labelledby="for-whom-title" className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[30rem] w-[30rem] rounded-full bg-wine-500/15 blur-[140px]"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          id="for-whom-title"
          eyebrow="Кому дарим"
          icon={Users}
          title={
            <>
              Подберём букет <Accent>для каждого мужчины</Accent> в вашей жизни
            </>
          }
          description="Муж, кум, брат, свёкор или руководитель — у каждого свой вкус. Мы знаем, что понравится каждому."
        />

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <div className="-mx-5 max-w-[calc(100%+2.5rem)] overflow-x-auto px-5 scrollbar-none sm:mx-0 sm:max-w-full sm:px-0">
            <div
              role="tablist"
              aria-label="Кому подарок"
              onKeyDown={handleKeyDown}
              className="flex w-max gap-1 rounded-full border border-white/[0.07] bg-white/[0.03] p-1"
            >
              {PERSONAS.map((p, i) => {
                const active = p.id === activeId;
                return (
                  <button
                    key={p.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    id={`tab-${p.id}`}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls="persona-panel"
                    tabIndex={active ? 0 : -1}
                    onClick={() => select(i)}
                    className="relative shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold sm:px-5"
                  >
                    {active && (
                      <motion.span
                        layoutId="persona-pill"
                        transition={SPRING}
                        className="absolute inset-0 rounded-full bg-cream shadow-[0_8px_30px_-10px_rgba(246,241,233,0.5)]"
                      />
                    )}
                    <span
                      className={cn(
                        "relative z-10 transition-colors duration-300",
                        active ? "text-ink-950" : "text-sand/75 hover:text-cream"
                      )}
                    >
                      {p.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div id="persona-panel" role="tabpanel" aria-labelledby={`tab-${persona.id}`} className="mt-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="grid gap-3 rounded-[2rem] border border-white/[0.08] bg-ink-850/70 p-3 lg:grid-cols-2"
            >
              <div className="relative min-h-[18rem] overflow-hidden rounded-[1.5rem] sm:min-h-[22rem] lg:min-h-[30rem]">
                <motion.img
                  src={product.image}
                  alt={`Букет «${product.name}»`}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent"
                />
                <div className="absolute inset-x-4 bottom-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-200/90">
                    Чаще всего дарят на
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {persona.occasions.map((occasion) => (
                      <li
                        key={occasion}
                        className="rounded-full glass-strong px-3 py-1.5 text-xs font-medium text-cream"
                      >
                        {occasion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col justify-center p-4 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">{persona.kicker}</p>
                <h3 className="mt-3 text-balance text-2xl font-extrabold leading-tight tracking-tight text-cream sm:text-[2.1rem]">
                  {persona.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-sand/80 sm:text-lg">{persona.text}</p>
                <ul className="mt-6 space-y-3">
                  {persona.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[15px] text-sand/85">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-300/15 text-gold-300">
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt=""
                      loading="lazy"
                      className="h-14 w-14 shrink-0 rounded-xl object-cover ring-1 ring-white/10"
                    />
                    <div>
                      <p className="text-xs text-sand/55">Рекомендуем</p>
                      <p className="font-bold text-cream">«{product.name}»</p>
                      <p className="text-sm font-semibold text-gold-200">{formatAMD(product.price)}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => openOrder({ productId: product.id, persona: persona.recipient })}
                    className="shrink-0"
                  >
                    {persona.cta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                      aria-hidden="true"
                    />
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
