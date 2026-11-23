import { Building2, Check, MapPin, Truck, Wallet } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { PLANS } from "@/data/content";
import { cn } from "@/utils/cn";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/motion";
import { Accent, SectionHeading } from "../ui/SectionHeading";

type Plan = (typeof PLANS)[number];

function PlanCard({ plan }: { plan: Plan }) {
  const { openOrder } = useApp();
  const featured = plan.featured;

  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden p-7 sm:p-8",
        featured
          ? "rounded-[calc(2rem-1px)] bg-ink-850"
          : "rounded-[2rem] border border-white/[0.08] bg-ink-900/60 transition-colors duration-300 hover:border-white/15"
      )}
    >
      {featured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gold-400/15 to-transparent"
        />
      )}
      <div className="relative flex items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-cream">{plan.name}</h3>
        {plan.badge && (
          <span className="rounded-full gold-fill px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-950">
            {plan.badge}
          </span>
        )}
      </div>
      <p className="relative mt-2 text-sm text-sand/70">{plan.for}</p>
      <div className="relative mt-7 flex items-baseline gap-2">
        <span className="text-sm text-sand/60">от</span>
        <span className="text-5xl font-extrabold tracking-[-0.045em] text-cream">
          {plan.price.toLocaleString("ru-RU")}
        </span>
        <span className="text-2xl font-bold text-sand/80">֏</span>
      </div>
      <p className="relative mt-1.5 text-xs text-sand/55">{plan.size}</p>
      <ul className="relative mt-8 space-y-3.5 text-sm">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sand/85">
            <span
              className={cn(
                "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
                featured ? "gold-fill text-ink-950" : "bg-white/[0.06] text-sand/80"
              )}
            >
              <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
            </span>
            {feature}
          </li>
        ))}
      </ul>
      <div className="relative mt-auto pt-9">
        <Button
          variant={featured ? "primary" : "glass"}
          size="lg"
          className="w-full"
          onClick={() => openOrder({ plan: plan.name })}
        >
          {plan.cta}
        </Button>
      </div>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[min(60rem,100%)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-600/10 blur-[150px]"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          id="pricing-title"
          eyebrow="Цены"
          icon={Wallet}
          title={
            <>
              Честные цены. <Accent>Без сюрпризов</Accent> — кроме самого подарка
            </>
          }
          description="Фиксированная стоимость без скрытых доплат. Открытка, лента и фото перед отправкой — всегда бесплатно."
        />

        <div className="mt-16 grid items-stretch gap-5 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1} className={cn(plan.featured && "lg:-my-4")}>
              {plan.featured ? (
                <div className="conic-ring h-full rounded-[2rem] shadow-[0_40px_120px_-40px_rgba(235,168,89,0.45)]">
                  <PlanCard plan={plan} />
                </div>
              ) : (
                <PlanCard plan={plan} />
              )}
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <ul className="flex flex-col items-center justify-center gap-x-8 gap-y-3 text-sm text-sand/70 sm:flex-row sm:flex-wrap">
            <li className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-gold-300" aria-hidden="true" />
              Ереван — 1 500 ֏, бесплатно от 25 000 ֏
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold-300" aria-hidden="true" />
              Регионы Армении — от 2 500 ֏
            </li>
            <li className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gold-300" aria-hidden="true" />
              Компаниям — скидка до 15% и безнал
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
