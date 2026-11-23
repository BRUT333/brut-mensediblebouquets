import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { CATEGORIES, PRODUCTS, type CategoryId, type Product } from "@/data/content";
import { formatAMD, links } from "@/lib/config";
import { cn } from "@/utils/cn";
import { Button, ButtonLink } from "../ui/Button";
import { IconBadge } from "../ui/IconBadge";
import { WhatsAppIcon } from "../ui/Icons";
import { EASE, Reveal, SPRING } from "../ui/motion";
import { Accent, SectionHeading } from "../ui/SectionHeading";
import { SpotlightCard } from "../ui/SpotlightCard";

function ProductCard({ product }: { product: Product }) {
  const { openOrder } = useApp();
  return (
    <SpotlightCard className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-ink-850/80 transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-white/15 hover:shadow-[0_30px_80px_-30px_rgba(235,168,89,0.35)]">
      <div className="relative aspect-[10/9] overflow-hidden">
        <img
          src={product.image}
          alt={`Букет «${product.name}»: ${product.items.join(", ")}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-850 via-ink-850/10 to-transparent"
        />
        <span className="absolute left-4 top-4 rounded-full gold-fill px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-950 shadow-lg">
          {product.badge}
        </span>
        <span className="absolute right-4 top-4 rounded-full glass-strong px-3 py-1 text-xs font-semibold text-cream">
          {product.weight}
        </span>
      </div>

      <div className="relative -mt-8 flex flex-1 flex-col px-6 pb-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-300/90">{product.positions}</p>
        <h3 className="mt-2 text-xl font-bold tracking-tight text-cream">{product.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-sand/75">{product.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Состав">
          {product.items.map((item) => (
            <li
              key={item}
              className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs text-sand/85"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between gap-3 pt-6">
          <div>
            <p className="text-xs text-sand/55">Цена</p>
            <p className="text-2xl font-extrabold tracking-tight text-cream">{formatAMD(product.price)}</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={links.whatsapp(`Здравствуйте! Хочу заказать букет «${product.name}» (${formatAMD(product.price)}).`)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Заказать «${product.name}» в WhatsApp`}
              className="grid h-11 w-11 place-items-center rounded-full glass transition-colors hover:bg-white/10"
            >
              <WhatsAppIcon className="h-5 w-5 text-whatsapp" />
            </a>
            <Button
              size="sm"
              className="h-11 px-5"
              onClick={() => openOrder({ productId: product.id })}
              aria-label={`Заказать букет «${product.name}»`}
            >
              Заказать
            </Button>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

export function Catalog() {
  const [filter, setFilter] = useState<CategoryId>("all");
  const visible = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.categories.includes(filter));

  return (
    <section id="catalog" aria-labelledby="catalog-title" className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-20 -z-10 h-[28rem] w-[28rem] rounded-full bg-wine-500/15 blur-[130px]"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <SectionHeading
            id="catalog-title"
            align="left"
            className="xl:max-w-xl"
            eyebrow="Каталог"
            icon={ShoppingBag}
            title={
              <>
                Хиты, которые <Accent>дарят чаще всего</Accent>
              </>
            }
            description="Любой букет изменим под получателя: заменим пиво на коньяк, уберём свинину или добавим острый суджух — без доплаты за замену."
          />
          <Reveal delay={0.1} className="min-w-0">
            <div
              role="group"
              aria-label="Фильтр букетов"
              className="-mx-5 overflow-x-auto px-5 scrollbar-none sm:mx-0 sm:px-0"
            >
              <div className="flex w-max gap-1 rounded-full border border-white/[0.07] bg-white/[0.03] p-1">
                {CATEGORIES.map((category) => {
                  const active = filter === category.id;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setFilter(category.id)}
                      className="relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold"
                    >
                      {active && (
                        <motion.span
                          layoutId="filter-pill"
                          transition={SPRING}
                          className="absolute inset-0 rounded-full gold-fill shadow-[0_8px_24px_-10px_rgba(235,168,89,0.8)]"
                        />
                      )}
                      <span
                        className={cn(
                          "relative z-10 transition-colors duration-300",
                          active ? "text-ink-950" : "text-sand/75 hover:text-cream"
                        )}
                      >
                        {category.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((product, i) => (
              <motion.li
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: EASE }}
              >
                <ProductCard product={product} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <Reveal className="mt-12">
          <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[1.75rem] border border-gold-300/15 bg-gradient-to-r from-gold-500/[0.12] via-gold-300/[0.04] to-transparent p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="flex items-center gap-4">
              <IconBadge icon={Sparkles} />
              <div>
                <p className="text-lg font-bold text-cream">Не нашли идеальный вариант?</p>
                <p className="mt-0.5 text-sm text-sand/75">
                  Соберите свой букет в конструкторе — цена считается онлайн.
                </p>
              </div>
            </div>
            <ButtonLink href="#constructor" variant="glass" className="shrink-0">
              Открыть конструктор
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                aria-hidden="true"
              />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
