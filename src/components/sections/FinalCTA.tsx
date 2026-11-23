import { AnimatePresence, motion } from "framer-motion";
import { BadgePercent, Camera, ChevronDown, Phone, ShieldCheck, Timer, Truck } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { GIFT_IMAGE, LEAD_OCCASIONS } from "@/data/content";
import { BRAND, links } from "@/lib/config";
import { useCutoffCountdown } from "@/lib/hooks";
import { cn } from "@/utils/cn";
import { Button, ButtonLink } from "../ui/Button";
import { Field, inputCls } from "../ui/Field";
import { TelegramIcon, WhatsAppIcon } from "../ui/Icons";
import { EASE, Reveal } from "../ui/motion";
import { Accent } from "../ui/SectionHeading";
import { SuccessMark } from "../ui/SuccessMark";

const PERKS = [
  { icon: BadgePercent, text: "−10% на первый заказ" },
  { icon: Camera, text: "Фото букета до оплаты" },
  { icon: Truck, text: "Доставка от 90 минут" },
  { icon: ShieldCheck, text: "Гарантия свежести" },
];

const QUICK_LINK =
  "flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] py-3 text-xs font-medium text-sand/85 transition-colors hover:border-white/20 hover:bg-white/[0.06]";

export function FinalCTA() {
  const { isToday, hours, minutes, seconds } = useCutoffCountdown();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState(LEAD_OCCASIONS[0]);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [sent, setSent] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const message = `Здравствуйте! Меня зовут ${name.trim()}. Хочу подобрать мужской букет.\nПовод: ${occasion}\nТелефон: ${phone.trim()}\nПромокод: ${BRAND.promo} (−10% на первый заказ)`;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: { name?: string; phone?: string } = {};
    if (name.trim().length < 2) next.name = "Как к вам обращаться?";
    if (phone.replace(/\D/g, "").length < 8) next.phone = "Укажите номер — по нему мы свяжемся";
    setErrors(next);
    if (next.name) return nameRef.current?.focus();
    if (next.phone) return phoneRef.current?.focus();
    window.open(links.whatsapp(message), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section id="order" aria-labelledby="order-cta-title" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 sm:rounded-[2.5rem]">
            <img
              src={GIFT_IMAGE}
              alt=""
              loading="lazy"
              className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_50%]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/95 via-ink-950/90 to-ink-950/85 lg:bg-gradient-to-r lg:from-ink-950 lg:via-ink-950/90 lg:to-ink-950/45"
            />
            <div
              aria-hidden="true"
              className="absolute -left-24 -top-24 -z-10 h-96 w-96 animate-blob rounded-full bg-gold-500/25 blur-[110px]"
            />

            <div className="grid gap-10 p-4 pt-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:p-14">
              <div className="flex flex-col justify-center">
                <div className="inline-flex items-center gap-3 self-start rounded-2xl glass px-4 py-2.5">
                  <Timer className="h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
                  {isToday ? (
                    <span className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                      <span className="text-sm text-sand/85">До конца приёма заказов на сегодня</span>
                      <span role="timer" className="font-mono text-base font-bold tabular-nums text-cream">
                        {hours}:{minutes}:{seconds}
                      </span>
                    </span>
                  ) : (
                    <span className="text-sm text-sand/85">
                      Сегодня приём закрыт — бронируйте доставку на завтра с 10:00
                    </span>
                  )}
                </div>

                <h2
                  id="order-cta-title"
                  className="mt-7 text-balance text-[2rem] font-extrabold leading-[1.06] tracking-[-0.035em] text-cream sm:text-5xl"
                >
                  Подарите эмоцию, о которой <Accent>будут вспоминать годами</Accent>
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-sand/80 sm:text-lg">
                  Оставьте заявку — менеджер ответит за 5 минут, поможет подобрать состав под повод и бюджет и закрепит
                  за вами скидку −10%.
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {PERKS.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3 text-sm font-medium text-cream/90">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-gold-300/20 bg-gold-300/10 text-gold-200">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.75rem] glass-strong p-6 shadow-2xl shadow-black/40 sm:p-8">
                <AnimatePresence mode="wait" initial={false}>
                  {!sent ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      noValidate
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                      aria-label="Заявка на подбор букета"
                    >
                      <div className="flex items-center gap-3">
                        <span className="rounded-full gold-fill px-3 py-1 text-xs font-extrabold text-ink-950">−10%</span>
                        <p className="text-lg font-bold text-cream">Скидка на первый заказ</p>
                      </div>
                      <p className="text-sm text-sand/70">Подберём букет под ваш повод и бюджет.</p>

                      <Field id="lead-name" label="Ваше имя" error={errors.name}>
                        <input
                          ref={nameRef}
                          id="lead-name"
                          name="name"
                          autoComplete="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Например, Анна"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "lead-name-error" : undefined}
                          className={inputCls}
                        />
                      </Field>
                      <Field id="lead-phone" label="Телефон / WhatsApp" error={errors.phone}>
                        <input
                          ref={phoneRef}
                          id="lead-phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/[^\d+\s()-]/g, "").slice(0, 20))}
                          placeholder="+374 99 123 456"
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "lead-phone-error" : undefined}
                          className={inputCls}
                        />
                      </Field>
                      <Field id="lead-occasion" label="Повод">
                        <div className="relative">
                          <select
                            id="lead-occasion"
                            value={occasion}
                            onChange={(e) => setOccasion(e.target.value)}
                            className={cn(inputCls, "appearance-none pr-10")}
                          >
                            {LEAD_OCCASIONS.map((o) => (
                              <option key={o} value={o} className="bg-ink-900">
                                {o}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-sand/60"
                            aria-hidden="true"
                          />
                        </div>
                      </Field>

                      <Button type="submit" size="lg" className="w-full">
                        Подобрать букет −10%
                      </Button>
                      <p className="text-center text-xs text-sand/50">Ответим в WhatsApp за 5 минут · Без спама</p>

                      <div className="flex items-center gap-3 pt-1">
                        <span className="h-px flex-1 bg-white/10" />
                        <span className="text-xs text-sand/45">или напишите сразу</span>
                        <span className="h-px flex-1 bg-white/10" />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <a href={links.whatsapp()} target="_blank" rel="noopener noreferrer" className={QUICK_LINK}>
                          <WhatsAppIcon className="h-5 w-5 text-whatsapp" />
                          WhatsApp
                        </a>
                        <a href={links.telegram} target="_blank" rel="noopener noreferrer" className={QUICK_LINK}>
                          <TelegramIcon className="h-5 w-5 text-[#2AABEE]" />
                          Telegram
                        </a>
                        <a href={BRAND.phoneHref} className={QUICK_LINK}>
                          <Phone className="h-5 w-5 text-gold-300" aria-hidden="true" />
                          Позвонить
                        </a>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="sent"
                      role="status"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="py-6 text-center"
                    >
                      <SuccessMark />
                      <h3 className="mt-6 text-2xl font-bold tracking-tight text-cream">Отлично, {name.trim()}!</h3>
                      <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-sand/75">
                        Мы открыли WhatsApp с готовым сообщением — нажмите «Отправить», и менеджер ответит в течение 5
                        минут. Скидка −10% закреплена за вами.
                      </p>
                      <div className="mt-7 grid gap-2.5">
                        <ButtonLink
                          href={links.whatsapp(message)}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="lg"
                          className="w-full"
                        >
                          <WhatsAppIcon className="h-5 w-5" />
                          Открыть WhatsApp ещё раз
                        </ButtonLink>
                        <Button variant="ghost" onClick={() => setSent(false)} className="w-full">
                          Изменить данные
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
