import { motion } from "framer-motion";
import { Camera, ChefHat, Crown, Gift, Heart, Medal, Truck } from "lucide-react";
import { useState } from "react";
import { CRAFT_IMAGE } from "@/data/content";
import { cn } from "@/utils/cn";
import { IconBadge } from "../ui/IconBadge";
import { fadeUp, SPRING, stagger } from "../ui/motion";
import { Accent, SectionHeading } from "../ui/SectionHeading";
import { SpotlightCard } from "../ui/SpotlightCard";

const DELICACIES = [
  "Бастурма",
  "Суджух",
  "Сыр лори",
  "Чанах",
  "Чечил",
  "Севанский сиг",
  "Коньяк 10 лет",
  "Армянская курага",
];

const TIMELINE = [
  { time: "14:05", label: "Заказ принят" },
  { time: "15:10", label: "Фото букета в WhatsApp" },
  { time: "15:35", label: "Вручение получателю" },
];

const CARD = "h-full rounded-[1.75rem] border border-white/[0.08] bg-ink-850/80 p-7";

function TasteToggles() {
  const [state, setState] = useState<Record<string, boolean>>({
    "Без свинины": true,
    "Без алкоголя": false,
    Поострее: true,
  });
  return (
    <div className="mt-6 space-y-2">
      {Object.entries(state).map(([label, on]) => (
        <button
          key={label}
          type="button"
          role="switch"
          aria-checked={on}
          onClick={() => setState((s) => ({ ...s, [label]: !s[label] }))}
          className="flex w-full items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.025] px-3.5 py-2.5 text-sm text-cream/90 transition-colors hover:bg-white/[0.05]"
        >
          {label}
          <span
            className={cn(
              "flex h-5 w-9 items-center rounded-full p-0.5 transition-colors duration-300",
              on ? "justify-end bg-gold-400" : "justify-start bg-white/15"
            )}
          >
            <motion.span layout transition={SPRING} className="h-4 w-4 rounded-full bg-white shadow-md" />
          </span>
        </button>
      ))}
    </div>
  );
}

export function Features() {
  return (
    <section id="why" aria-labelledby="why-title" className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-40 -z-10 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-gold-600/10 blur-[140px]"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          id="why-title"
          eyebrow="Почему BRUT"
          icon={Crown}
          title={
            <>
              Не просто закуски. <Accent>Подарок с характером</Accent>
            </>
          }
          description="Армянское гостеприимство и эстетика премиальной флористики: каждый букет свежий, продуман до мелочей и собран под конкретного человека."
        />

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-6"
        >
          {/* Hand-made — large */}
          <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-4 lg:row-span-2">
            <SpotlightCard className="group relative flex h-full min-h-[26rem] flex-col justify-end overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-ink-850">
              <img
                src={CRAFT_IMAGE}
                alt="Мастер вручную собирает мужской букет из бастурмы и сыра"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/0"
              />
              <div className="relative p-7 sm:p-10">
                <IconBadge icon={ChefHat} />
                <h3 className="mt-5 max-w-lg text-2xl font-bold tracking-tight text-cream sm:text-[2rem] sm:leading-tight">
                  Собираем вручную в день доставки
                </h3>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-sand/80 sm:text-base">
                  Никаких заготовок «со вчера». Нарезаем бастурму, сворачиваем розы из суджуха и упаковываем за 1–3 часа
                  до вручения — букет приезжает свежим и пахнет так, что его хочется съесть сразу.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {["Ручная работа", "Пищевая упаковка", "Проверенные фермеры"].map((tag) => (
                    <li key={tag} className="rounded-full glass px-3 py-1.5 text-xs font-medium text-cream/90">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Delivery */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <SpotlightCard className={CARD}>
              <IconBadge icon={Truck} />
              <h3 className="mt-5 text-xl font-bold tracking-tight text-cream">Доставка от 90 минут</h3>
              <p className="mt-2 text-sm leading-relaxed text-sand/75">
                По Еревану — бесплатно от 25 000 ֏. В регионы Армении — на следующий день.
              </p>
              <ol className="mt-6">
                {TIMELINE.map((step, i) => {
                  const last = i === TIMELINE.length - 1;
                  return (
                    <li key={step.time} className="relative flex items-center gap-3 pb-4 last:pb-0">
                      {!last && (
                        <span
                          aria-hidden="true"
                          className="absolute left-[6.5px] top-4 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-gold-300/60 to-white/10"
                        />
                      )}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "relative h-3.5 w-3.5 shrink-0 rounded-full border-2",
                          last ? "border-emerald-400 bg-emerald-400/30" : "border-gold-300 bg-ink-850"
                        )}
                      />
                      <span className="font-mono text-xs tabular-nums text-sand/55">{step.time}</span>
                      <span className="text-sm text-cream/90">{step.label}</span>
                    </li>
                  );
                })}
              </ol>
            </SpotlightCard>
          </motion.div>

          {/* Photo before sending */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <SpotlightCard className={CARD}>
              <IconBadge icon={Camera} />
              <h3 className="mt-5 text-xl font-bold tracking-tight text-cream">Фото перед отправкой</h3>
              <p className="mt-2 text-sm leading-relaxed text-sand/75">
                Пришлём фото готового букета в WhatsApp. Оплата — только после вашего «да».
              </p>
              <div className="mt-6 space-y-2 rounded-2xl bg-[#0b141a] p-3 text-[13px]" aria-hidden="true">
                <div className="ml-auto w-fit max-w-[85%] rounded-xl rounded-tr-sm bg-[#005c4b] px-3 py-1.5 text-white/95">
                  Покажете букет перед отправкой?
                </div>
                <div className="w-fit max-w-[88%] rounded-xl rounded-tl-sm bg-[#202c33] p-1.5 text-white/90">
                  <img src="images/meat.jpg" alt="" loading="lazy" className="h-24 w-full rounded-lg object-cover" />
                  <p className="px-1.5 pb-0.5 pt-1.5">Готово! Выезжаем через 10 минут.</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Delicacies */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <SpotlightCard className={CARD}>
              <IconBadge icon={Medal} />
              <h3 className="mt-5 text-xl font-bold tracking-tight text-cream">Армянские деликатесы</h3>
              <p className="mt-2 text-sm leading-relaxed text-sand/75">
                Бастурма и суджух от проверенных фермеров, сыры из Лори и Ширака, коньяк от 5 до 20 лет выдержки.
              </p>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {DELICACIES.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-gold-300/15 bg-gold-300/[0.05] px-3 py-1.5 text-xs font-medium text-gold-100/90 transition-colors hover:border-gold-300/40"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </motion.div>

          {/* Personal taste */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <SpotlightCard className={CARD}>
              <IconBadge icon={Heart} />
              <h3 className="mt-5 text-xl font-bold tracking-tight text-cream">Под его вкус</h3>
              <p className="mt-2 text-sm leading-relaxed text-sand/75">
                Без свинины, без алкоголя, поострее или только любимое пиво — учтём любые пожелания бесплатно.
              </p>
              <TasteToggles />
            </SpotlightCard>
          </motion.div>

          {/* Surprise */}
          <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-2">
            <SpotlightCard className={CARD}>
              <IconBadge icon={Gift} />
              <h3 className="mt-5 text-xl font-bold tracking-tight text-cream">Сюрприз точно ко времени</h3>
              <p className="mt-2 text-sm leading-relaxed text-sand/75">
                Анонимно — домой, в офис или ресторан. Открытка с вашим текстом — в подарок.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                {[
                  ["30 мин", "интервал"],
                  ["0 ֏", "открытка"],
                  ["100%", "анонимно"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-2 py-3">
                    <p className="text-base font-extrabold text-cream">{value}</p>
                    <p className="text-[11px] text-sand/60">{label}</p>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
