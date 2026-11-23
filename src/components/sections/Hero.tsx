import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, ArrowUpRight, Camera, Copy, ShieldCheck, Sparkles, Star, Timer, Truck } from "lucide-react";
import { useId, useRef, type PointerEvent } from "react";
import { useApp } from "@/context/AppContext";
import { HERO_IMAGE } from "@/data/content";
import { BRAND, copyText, formatAMD, links } from "@/lib/config";
import { cn } from "@/utils/cn";
import { Button, ButtonLink } from "../ui/Button";
import { WhatsAppIcon } from "../ui/Icons";
import { EASE, fadeUp, fadeUpBlur, stagger } from "../ui/motion";
import { Accent } from "../ui/SectionHeading";

const AVATARS = [
  { letter: "А", bg: "linear-gradient(135deg,#fbe3b8,#d9873a)" },
  { letter: "Н", bg: "linear-gradient(135deg,#f3d1b0,#a65a3a)" },
  { letter: "Л", bg: "linear-gradient(135deg,#ead2b4,#8e5a35)" },
  { letter: "Д", bg: "linear-gradient(135deg,#ffd9a0,#c2703a)" },
];

function RotatingBadge({ className }: { className?: string }) {
  const id = `badge-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <div className={cn("relative grid place-items-center rounded-full", className)}>
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-white/10 bg-ink-950/70 backdrop-blur-md"
      />
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
        <defs>
          <path id={id} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text className="fill-gold-100 text-[9.5px] font-bold">
          <textPath href={`#${id}`} textLength="272" lengthAdjust="spacing">
            РУЧНАЯ РАБОТА • СВЕЖИЕ ПРОДУКТЫ • ЕРЕВАН •
          </textPath>
        </text>
      </svg>
      <span className="relative grid h-10 w-10 place-items-center rounded-full gold-fill text-ink-950 shadow-lg sm:h-11 sm:w-11">
        <Sparkles className="h-5 w-5" aria-hidden="true" />
      </span>
    </div>
  );
}

interface FloatingCardProps {
  icon: LucideIcon;
  title: string;
  text: string;
  className?: string;
  delay: number;
  floatClass?: string;
}

function FloatingCard({ icon: Icon, title, text, className, delay, floatClass = "animate-float" }: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={cn("absolute z-20", className)}
    >
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl glass-strong p-2.5 pr-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.85)]",
          floatClass
        )}
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl gold-fill text-ink-950">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="leading-tight">
          <span className="block whitespace-nowrap text-sm font-bold text-cream">{title}</span>
          <span className="block whitespace-nowrap text-xs text-sand/70">{text}</span>
        </span>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const { openOrder, showToast } = useApp();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(rawY, { stiffness: 150, damping: 18 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rawY.set(px * 8);
    rawX.set(-py * 8);
  };
  const resetTilt = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const copyPromo = async () => {
    if (await copyText(BRAND.promo)) showToast(`Промокод ${BRAND.promo} скопирован`);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-20 pt-10 sm:pt-14 lg:pb-28 lg:pt-16"
    >
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid fade-radial opacity-70" />
        <div className="absolute -top-48 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 animate-blob rounded-full bg-gold-500/20 blur-[130px]" />
        <div className="absolute -right-48 top-24 h-[32rem] w-[32rem] animate-blob rounded-full bg-wine-500/25 blur-[130px] [animation-delay:-9s]" />
        <div className="absolute -left-40 bottom-0 h-[26rem] w-[26rem] animate-blob rounded-full bg-gold-700/25 blur-[120px] [animation-delay:-16s]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* Copy */}
        <motion.div className="lg:col-span-7" variants={stagger(0.09, 0.05)} initial="hidden" animate="show">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2.5 rounded-full glass px-3.5 py-1.5 text-[13px] font-medium text-sand">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inset-0 animate-ping-slow rounded-full bg-emerald-400" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Принимаем заказы на сегодня до {BRAND.cutoffHour}:00
            </span>
          </motion.div>

          <motion.h1
            id="hero-title"
            variants={fadeUpBlur}
            className="mt-7 text-balance text-[2.55rem] font-extrabold leading-[1.02] tracking-[-0.045em] text-cream sm:text-6xl lg:text-[4.1rem] xl:text-[4.6rem]"
          >
            Букет, который он <Accent>не поставит в вазу</Accent>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-sand/80 sm:text-xl"
          >
            Что подарить мужчине, у которого всё есть? <span className="font-semibold text-cream">Вкус.</span>{" "}
            Съедобные букеты из бастурмы, суджуха, армянских сыров, коньяка и пива — собираем вручную в день доставки и
            привозим по Еревану за 90 минут.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" onClick={() => openOrder()}>
              Заказать букет
              <ArrowRight
                className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1"
                aria-hidden="true"
              />
            </Button>
            <ButtonLink size="lg" variant="glass" href={links.whatsapp()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-5 w-5 text-whatsapp" />
              Написать в WhatsApp
            </ButtonLink>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-5 flex flex-wrap items-center gap-2 text-sm text-sand/75">
            <Sparkles className="h-4 w-4 text-gold-300" aria-hidden="true" />
            <span>−10% на первый заказ по промокоду</span>
            <button
              type="button"
              onClick={copyPromo}
              aria-label={`Скопировать промокод ${BRAND.promo}`}
              className="group inline-flex items-center gap-1.5 rounded-lg border border-dashed border-gold-300/40 bg-gold-300/[0.06] px-2 py-0.5 font-mono text-[13px] font-bold text-gold-200 transition-colors hover:border-gold-300/70 hover:bg-gold-300/10"
            >
              {BRAND.promo}
              <Copy className="h-3.5 w-3.5 opacity-60 transition-opacity group-hover:opacity-100" aria-hidden="true" />
            </button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-white/[0.07] pt-8"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5" aria-hidden="true">
                {AVATARS.map((a) => (
                  <span
                    key={a.letter}
                    className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink-950 text-xs font-extrabold text-ink-950"
                    style={{ backgroundImage: a.bg }}
                  >
                    {a.letter}
                  </span>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-gold-300" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                  <span className="ml-1.5 text-sm font-bold text-cream">4,9</span>
                </div>
                <p className="text-xs text-sand/65">640+ отзывов</p>
                <span className="sr-only">Рейтинг 4,9 из 5 на основе более 640 отзывов в Google и Instagram</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-sand/80">
              <ShieldCheck className="h-5 w-5 text-gold-300" aria-hidden="true" />
              Оплата после фото
            </div>
            <div className="flex items-center gap-2.5 text-sm text-sand/80">
              <Timer className="h-5 w-5 text-gold-300" aria-hidden="true" />
              Доставка от 90 мин
            </div>
          </motion.div>
        </motion.div>

        {/* Visual */}
        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.15, ease: EASE }}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetTilt}
            className="relative mx-auto w-full max-w-[25rem] sm:max-w-[28rem] lg:max-w-none"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(235,168,89,0.35),transparent)] blur-2xl"
            />
            <motion.div
              style={{ rotateX, rotateY, transformPerspective: 1200 }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-ink-850 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.95)] sm:rounded-[2.5rem]"
            >
              <motion.img
                src={HERO_IMAGE}
                alt="Мужской съедобный букет: розы из бастурмы, салями, сыр, чечил, орехи, курага и армянский коньяк в чёрной упаковке"
                style={{ y: imageY }}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-x-0 -top-[7%] h-[114%] w-full object-cover object-[50%_30%]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/0 to-ink-950/10"
              />
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl glass-strong p-3 pl-4 sm:inset-x-4 sm:bottom-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-200/90">
                    Собираем в день доставки
                  </p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-cream">Букеты от {formatAMD(14900)}</p>
                </div>
                <a
                  href="#catalog"
                  aria-label="Смотреть каталог букетов"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full gold-fill text-ink-950 transition-transform duration-300 hover:scale-110"
                >
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </motion.div>

            <FloatingCard
              icon={Truck}
              title="Доставка сегодня"
              text="Ереван · от 90 минут"
              className="-left-3 top-10 sm:-left-10"
              delay={0.7}
            />
            <FloatingCard
              icon={Camera}
              title="Фото перед отправкой"
              text="Оплата после одобрения"
              className="-right-3 top-[46%] sm:-right-8"
              delay={0.9}
              floatClass="animate-float-slow"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 1.1, ease: EASE }}
              className="absolute -right-2 -top-8 z-20 sm:-right-6 sm:-top-10"
            >
              <RotatingBadge className="h-24 w-24 sm:h-28 sm:w-28" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
