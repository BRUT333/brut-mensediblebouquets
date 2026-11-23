import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Award, Beer, Check, Gift, Nut, Package, PartyPopper, Plus, Truck, Wine } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useApp } from "@/context/AppContext";
import { ADDONS, BASES, PREFERENCES, SIZES } from "@/data/content";
import { BRAND, formatAMD, links, withPromo } from "@/lib/config";
import { cn } from "@/utils/cn";
import { Button, ButtonLink } from "../ui/Button";
import { WhatsAppIcon } from "../ui/Icons";
import { EASE, Reveal, SPRING } from "../ui/motion";
import { AnimatedPrice } from "../ui/Numbers";
import { Accent, SectionHeading } from "../ui/SectionHeading";

const ADDON_ICONS: Record<string, LucideIcon> = {
  cognac: Wine,
  beer: Beer,
  box: Package,
  balloons: PartyPopper,
  honey: Nut,
  ribbon: Award,
};

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function Step({ n, title, hint, children }: { n: number; title: string; hint?: string; children: ReactNode }) {
  return (
    <Reveal>
      <div className="rounded-[1.75rem] border border-white/[0.07] bg-ink-900/60 p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold-300/30 bg-gold-300/10 text-xs font-bold text-gold-200">
            {n}
          </span>
          <h3 className="text-base font-bold text-cream sm:text-lg">{title}</h3>
          {hint && <span className="ml-auto text-xs text-sand/50">{hint}</span>}
        </div>
        {children}
      </div>
    </Reveal>
  );
}

export function Constructor() {
  const { openOrder } = useApp();
  const [baseId, setBaseId] = useState(BASES[0].id);
  const [sizeId, setSizeId] = useState(SIZES[1].id);
  const [addons, setAddons] = useState<string[]>(["box"]);
  const [prefs, setPrefs] = useState<string[]>([]);

  const base = BASES.find((b) => b.id === baseId) ?? BASES[0];
  const size = SIZES.find((s) => s.id === sizeId) ?? SIZES[1];
  const noAlcohol = prefs.includes("Без алкоголя");
  const activeAddons = ADDONS.filter((a) => addons.includes(a.id) && !(noAlcohol && a.alcohol));
  const total = base.price + size.add + activeAddons.reduce((sum, a) => sum + a.price, 0);
  const promoTotal = withPromo(total);
  const freeDelivery = total >= BRAND.freeDeliveryFrom;
  const progress = Math.min(100, (total / BRAND.freeDeliveryFrom) * 100);

  const lines = [
    `Основа: ${base.name.toLowerCase()} (${base.note.toLowerCase()})`,
    `Размер: ${size.id} — ${size.label.toLowerCase()}, ${size.positions}`,
    ...activeAddons.map((a) => `${a.name} (${a.note})`),
    ...(prefs.length ? [`Пожелания: ${prefs.join(", ").toLowerCase()}`] : []),
  ];

  const message = `Здравствуйте! Хочу заказать букет из конструктора:\n${lines
    .map((line) => `• ${line}`)
    .join("\n")}\nИтого: ${formatAMD(total)} (с промокодом ${BRAND.promo}: ${formatAMD(promoTotal)})`;

  const summary = [
    { key: `base-${base.id}`, label: `Основа «${base.name}»`, value: formatAMD(base.price) },
    {
      key: `size-${size.id}`,
      label: `Размер ${size.id} · ${size.positions}`,
      value: size.add ? `+${formatAMD(size.add)}` : "включено",
    },
    ...activeAddons.map((a) => ({ key: a.id, label: a.name, value: `+${formatAMD(a.price)}` })),
    { key: "card", label: "Открытка и фирменная лента", value: "в подарок" },
  ];

  return (
    <section id="constructor" aria-labelledby="constructor-title" className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          id="constructor-title"
          eyebrow="Конструктор"
          icon={Gift}
          title={
            <>
              Соберите <Accent>свой букет</Accent> за минуту
            </>
          }
          description="Выберите основу, размер и дополнения — цена пересчитается мгновенно. Готовый состав отправим менеджеру в один клик."
        />

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
          <div className="space-y-5">
            {/* Mobile: sticky live total while choosing */}
            <div className="sticky top-[4.5rem] z-20 lg:hidden">
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-ink-900/85 py-2.5 pl-4 pr-2.5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl">
                <div className="min-w-0">
                  <p className="truncate text-xs text-sand/60">
                    {base.name} · {size.id}
                    {activeAddons.length ? ` · +${activeAddons.length} доп.` : ""}
                  </p>
                  <p className="text-lg font-extrabold leading-tight text-cream">
                    <AnimatedPrice value={total} announce={false} />
                  </p>
                </div>
                <Button
                  size="sm"
                  className="shrink-0"
                  onClick={() =>
                    openOrder({
                      custom: { title: `${base.name} · ${size.id}`, lines, price: total, image: base.image },
                    })
                  }
                >
                  Заказать
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>

            <Step n={1} title="Основа букета">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {BASES.map((b) => {
                  const active = b.id === baseId;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setBaseId(b.id)}
                      className={cn(
                        "group relative flex flex-col items-start gap-3 rounded-2xl border p-2.5 pb-3.5 text-left transition-all duration-300",
                        active
                          ? "border-gold-300/60 bg-gold-300/[0.07] shadow-[0_20px_40px_-24px_rgba(235,168,89,0.7)]"
                          : "border-white/[0.08] bg-white/[0.02] hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.04]"
                      )}
                    >
                      <span className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl">
                        <img
                          src={b.image}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                        />
                      </span>
                      {active && (
                        <motion.span
                          layoutId="base-check"
                          transition={SPRING}
                          className="absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full gold-fill text-ink-950 shadow-lg"
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                        </motion.span>
                      )}
                      <span className="px-1">
                        <span className="block text-[15px] font-bold text-cream">{b.name}</span>
                        <span className="mt-0.5 block text-xs leading-snug text-sand/60">{b.note}</span>
                        <span className="mt-2 block text-sm font-semibold text-gold-200">от {formatAMD(b.price)}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </Step>

            <Step n={2} title="Размер">
              <div className="grid grid-cols-2 gap-1.5 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-1.5 sm:grid-cols-4">
                {SIZES.map((s) => {
                  const active = s.id === sizeId;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSizeId(s.id)}
                      className="relative rounded-xl px-3.5 py-3 text-left"
                    >
                      {active && (
                        <motion.span
                          layoutId="size-pill"
                          transition={SPRING}
                          className="absolute inset-0 rounded-xl bg-white/[0.08] ring-1 ring-inset ring-gold-300/40"
                        />
                      )}
                      <span className="relative z-10 block">
                        <span className="flex items-baseline justify-between gap-2">
                          <span
                            className={cn(
                              "text-xl font-extrabold tracking-tight",
                              active ? "gold-text" : "text-cream/80"
                            )}
                          >
                            {s.id}
                          </span>
                          <span className="text-[11px] font-semibold text-sand/60">
                            {s.add ? `+${formatAMD(s.add)}` : "база"}
                          </span>
                        </span>
                        <span className="mt-1 block text-sm font-semibold text-cream/90">{s.label}</span>
                        <span className="block text-xs text-sand/55">{s.positions}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </Step>

            <Step n={3} title="Дополнения" hint="по желанию">
              <div className="grid gap-2.5 sm:grid-cols-2">
                {ADDONS.map((a) => {
                  const disabled = noAlcohol && a.alcohol;
                  const active = addons.includes(a.id) && !disabled;
                  const Icon = ADDON_ICONS[a.id] ?? Gift;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      aria-pressed={active}
                      disabled={disabled}
                      onClick={() => setAddons((list) => toggle(list, a.id))}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-300",
                        active
                          ? "border-gold-300/50 bg-gold-300/[0.06]"
                          : "border-white/[0.08] bg-white/[0.02] hover:border-white/20",
                        disabled && "cursor-not-allowed opacity-40"
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-300",
                          active ? "gold-fill text-ink-950" : "bg-white/[0.05] text-gold-200"
                        )}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold leading-snug text-cream">{a.name}</span>
                        <span className="block text-xs text-sand/55">
                          {a.note} · +{formatAMD(a.price)}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-all duration-300",
                          active ? "border-gold-300 bg-gold-300 text-ink-950" : "border-white/20"
                        )}
                      >
                        {active && <Check className="h-3 w-3" strokeWidth={3.5} />}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 flex items-center gap-2 text-xs text-sand/60">
                <Gift className="h-3.5 w-3.5 text-gold-300" aria-hidden="true" />
                Открытка с вашим текстом и фирменная лента — всегда в подарок
              </p>
            </Step>

            <Step n={4} title="Пожелания">
              <div className="flex flex-wrap gap-2">
                {PREFERENCES.map((pref) => {
                  const active = prefs.includes(pref);
                  return (
                    <button
                      key={pref}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setPrefs((list) => toggle(list, pref))}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                        active
                          ? "border-gold-300/60 bg-gold-300/10 text-gold-100"
                          : "border-white/10 text-sand/75 hover:border-white/25 hover:text-cream"
                      )}
                    >
                      {active ? (
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      {pref}
                    </button>
                  );
                })}
              </div>
              <AnimatePresence initial={false}>
                {noAlcohol && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden text-xs text-gold-200/90"
                  >
                    <span className="block pt-3">
                      Алкоголь заменим на безалкогольное пиво или домашний лимонад — без изменения цены.
                    </span>
                  </motion.p>
                )}
              </AnimatePresence>
            </Step>
          </div>

          {/* Live summary */}
          <div className="lg:sticky lg:top-24">
            <Reveal delay={0.1}>
              <div className="conic-ring rounded-[2rem] shadow-[0_40px_120px_-40px_rgba(235,168,89,0.35)]">
                <div className="rounded-[calc(2rem-1px)] bg-ink-850 p-5 sm:p-6">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-ink-800">
                    <AnimatePresence initial={false}>
                      <motion.img
                        key={base.id}
                        src={base.image}
                        alt={`Пример букета: ${base.name.toLowerCase()} основа`}
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </AnimatePresence>
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent"
                    />
                    <div className="absolute inset-x-4 bottom-3.5 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-200/90">Ваш букет</p>
                        <p className="text-lg font-bold text-cream">
                          {base.name} · {size.id}
                        </p>
                      </div>
                      <span className="rounded-full glass px-2.5 py-1 text-xs font-medium text-cream">
                        {size.positions}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-5 text-sm" aria-label="Состав заказа">
                    <AnimatePresence initial={false}>
                      {summary.map((row) => (
                        <motion.li
                          key={row.key}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <span className="flex items-start justify-between gap-3 pb-2.5">
                            <span className="text-sand/75">{row.label}</span>
                            <span className="shrink-0 font-semibold text-cream">{row.value}</span>
                          </span>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>

                  <div className="mt-2 border-t border-dashed border-white/10 pt-5">
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="flex items-center gap-1.5 text-sand/75">
                        <Truck className="h-3.5 w-3.5 text-gold-300" aria-hidden="true" />
                        {freeDelivery
                          ? "Доставка по Еревану — бесплатно"
                          : `До бесплатной доставки ещё ${formatAMD(BRAND.freeDeliveryFrom - total)}`}
                      </span>
                      {freeDelivery && <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />}
                    </div>
                    <div
                      className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]"
                      role="progressbar"
                      aria-label="Прогресс до бесплатной доставки"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={Math.round(progress)}
                    >
                      <motion.div
                        className={cn("h-full rounded-full", freeDelivery ? "bg-emerald-400" : "gold-fill")}
                        initial={false}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      />
                    </div>

                    <div className="mt-5 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xs text-sand/55">Итого</p>
                        <p className="text-3xl font-extrabold tracking-tight text-cream sm:text-[2rem]">
                          <AnimatedPrice value={total} />
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-sand/55">с промокодом {BRAND.promo}</p>
                        <p className="text-lg font-bold">
                          <AnimatedPrice value={promoTotal} className="gold-text" announce={false} />
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-2.5">
                      <Button
                        size="lg"
                        className="w-full"
                        onClick={() =>
                          openOrder({
                            custom: { title: `${base.name} · ${size.id}`, lines, price: total, image: base.image },
                          })
                        }
                      >
                        Заказать этот букет
                        <ArrowRight
                          className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1"
                          aria-hidden="true"
                        />
                      </Button>
                      <ButtonLink
                        size="lg"
                        variant="glass"
                        className="w-full"
                        href={links.whatsapp(message)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <WhatsAppIcon className="h-5 w-5 text-whatsapp" />
                        Отправить состав в WhatsApp
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
