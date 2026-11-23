import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BadgePercent, Check, ChevronDown, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useApp, type OrderRequest } from "@/context/AppContext";
import { HERO_IMAGE, PRODUCTS, RECIPIENT_OPTIONS, TIME_SLOTS } from "@/data/content";
import { BRAND, copyText, formatAMD, formatDateRu, links, todayISO, withPromo } from "@/lib/config";
import { cn } from "@/utils/cn";
import { Button, ButtonLink } from "./ui/Button";
import { Field, inputCls, labelCls } from "./ui/Field";
import { TelegramIcon, WhatsAppIcon } from "./ui/Icons";
import { EASE, SPRING } from "./ui/motion";
import { SuccessMark } from "./ui/SuccessMark";

type Channel = "whatsapp" | "telegram";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

export function OrderModal() {
  const { order, closeOrder } = useApp();
  return (
    <AnimatePresence>{order && <OrderDialog key="order-dialog" request={order} onClose={closeOrder} />}</AnimatePresence>
  );
}

function OrderDialog({ request, onClose }: { request: OrderRequest; onClose: () => void }) {
  const initialBouquet = request.productId ?? (request.custom ? "custom" : request.plan ? "plan" : "help");
  const [bouquet, setBouquet] = useState(initialBouquet);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [recipient, setRecipient] = useState(request.persona ?? "");
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState(TIME_SLOTS[0]);
  const [address, setAddress] = useState("");
  const [card, setCard] = useState("");
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [done, setDone] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const product = PRODUCTS.find((p) => p.id === bouquet);

  // Scroll lock, Escape to close, focus trap and focus restore.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 80);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  const header = (() => {
    if (product) {
      return {
        title: `«${product.name}»`,
        subtitle: `${formatAMD(product.price)} · с промокодом ${formatAMD(withPromo(product.price))}`,
        image: product.image,
      };
    }
    if (bouquet === "custom" && request.custom) {
      return {
        title: "Букет из конструктора",
        subtitle: `${request.custom.title} · ${formatAMD(request.custom.price)}`,
        image: request.custom.image,
      };
    }
    if (bouquet === "plan" && request.plan) {
      return { title: `Пакет «${request.plan}»`, subtitle: "Менеджер поможет собрать состав", image: HERO_IMAGE };
    }
    return { title: "Подберём идеальный букет", subtitle: "Ответим в течение 5 минут", image: HERO_IMAGE };
  })();

  const buildMessage = () => {
    let bouquetLine = "помогите подобрать";
    if (product) bouquetLine = `«${product.name}» — ${formatAMD(product.price)}`;
    else if (bouquet === "custom" && request.custom)
      bouquetLine = `свой (${request.custom.title}) — ${formatAMD(request.custom.price)}\n${request.custom.lines
        .map((line) => `   • ${line}`)
        .join("\n")}`;
    else if (bouquet === "plan" && request.plan) bouquetLine = `пакет «${request.plan}»`;

    return [
      `Здравствуйте! Хочу оформить заказ в ${BRAND.name} 🎁`,
      `Букет: ${bouquetLine}`,
      recipient && `Кому: ${recipient.toLowerCase()}`,
      `Доставка: ${formatDateRu(date)}, ${time.toLowerCase()}`,
      address.trim() && `Адрес: ${address.trim()}`,
      card.trim() && `Текст открытки: «${card.trim()}»`,
      `Имя: ${name.trim()}`,
      `Телефон: ${phone.trim()}`,
      `Промокод: ${BRAND.promo}`,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: { name?: string; phone?: string } = {};
    if (name.trim().length < 2) next.name = "Как к вам обращаться?";
    if (phone.replace(/\D/g, "").length < 8) next.phone = "Укажите номер — по нему мы свяжемся";
    setErrors(next);
    if (next.name) return nameRef.current?.focus();
    if (next.phone) return phoneRef.current?.focus();

    const message = buildMessage();
    // Hand-off to messenger (no backend required). Plug a CRM / bot webhook here if needed.
    if (channel === "whatsapp") {
      window.open(links.whatsapp(message), "_blank", "noopener,noreferrer");
    } else {
      void copyText(message);
      window.open(links.telegram, "_blank", "noopener,noreferrer");
    }
    setDone(true);
  };

  const channelLabel = channel === "whatsapp" ? "WhatsApp" : "Telegram";

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <motion.div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-title"
        aria-describedby="order-subtitle"
        variants={{ hidden: { opacity: 0, y: 48, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1 } }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative flex max-h-[94dvh] w-full max-w-xl flex-col overflow-hidden rounded-t-[2rem] border border-white/10 bg-ink-900 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] sm:rounded-[2rem]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[28rem] -translate-x-1/2 rounded-full bg-gold-500/20 blur-3xl"
        />

        {/* Header */}
        <div className="relative border-b border-white/[0.06] px-5 pb-5 pt-3 sm:px-7 sm:pt-6">
          <div aria-hidden="true" className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/15 sm:hidden" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть окно заказа"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/[0.06] text-sand transition-all duration-300 hover:rotate-90 hover:bg-white/10 hover:text-cream sm:right-5 sm:top-5"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-4 pr-10">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={header.image}
                src={header.image}
                alt=""
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="h-16 w-16 shrink-0 rounded-2xl object-cover ring-1 ring-white/10"
              />
            </AnimatePresence>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-300">
                {done ? "Почти готово" : "Оформление заказа"}
              </p>
              <h2 id="order-title" className="mt-1 truncate text-xl font-bold tracking-tight text-cream">
                {header.title}
              </h2>
              <p id="order-subtitle" className="truncate text-sm text-sand/70">
                {header.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="relative overflow-y-auto overscroll-contain">
          <AnimatePresence mode="wait" initial={false}>
            {!done ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-4 px-5 py-5 sm:px-7 sm:py-6"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="order-name" label="Ваше имя" error={errors.name}>
                    <input
                      ref={nameRef}
                      id="order-name"
                      name="name"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Например, Анна"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "order-name-error" : undefined}
                      className={inputCls}
                    />
                  </Field>
                  <Field id="order-phone" label="Телефон / WhatsApp" error={errors.phone}>
                    <input
                      ref={phoneRef}
                      id="order-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^\d+\s()-]/g, "").slice(0, 20))}
                      placeholder="+374 99 123 456"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "order-phone-error" : undefined}
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field id="order-bouquet" label="Букет">
                  <div className="relative">
                    <select
                      id="order-bouquet"
                      value={bouquet}
                      onChange={(e) => setBouquet(e.target.value)}
                      className={cn(inputCls, "appearance-none pr-10")}
                    >
                      {request.custom && (
                        <option value="custom" className="bg-ink-900">
                          {`Мой букет из конструктора — ${formatAMD(request.custom.price)}`}
                        </option>
                      )}
                      {request.plan && (
                        <option value="plan" className="bg-ink-900">
                          {`Пакет «${request.plan}»`}
                        </option>
                      )}
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.id} className="bg-ink-900">
                          {`${p.name} — ${formatAMD(p.price)}`}
                        </option>
                      ))}
                      <option value="help" className="bg-ink-900">
                        Помогите подобрать
                      </option>
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-sand/60"
                      aria-hidden="true"
                    />
                  </div>
                </Field>

                <fieldset>
                  <legend className={labelCls}>Кому подарок</legend>
                  <div className="flex flex-wrap gap-2">
                    {RECIPIENT_OPTIONS.map((option) => {
                      const active = recipient === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setRecipient(active ? "" : option)}
                          className={cn(
                            "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
                            active
                              ? "border-gold-300/70 bg-gold-300/15 text-gold-100"
                              : "border-white/10 text-sand/75 hover:border-white/25 hover:text-cream"
                          )}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <Field id="order-date" label="Дата">
                    <input
                      id="order-date"
                      type="date"
                      min={todayISO()}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={cn(inputCls, "min-h-[50px]")}
                    />
                  </Field>
                  <Field id="order-time" label="Время">
                    <div className="relative">
                      <select
                        id="order-time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className={cn(inputCls, "min-h-[50px] appearance-none pr-9")}
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot} className="bg-ink-900">
                            {slot}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand/60"
                        aria-hidden="true"
                      />
                    </div>
                  </Field>
                </div>

                <Field id="order-address" label="Город и адрес" hint="можно уточнить позже">
                  <input
                    id="order-address"
                    autoComplete="street-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ереван, ул. Туманяна, 5"
                    className={inputCls}
                  />
                </Field>

                <Field id="order-card" label="Текст открытки" hint="необязательно">
                  <textarea
                    id="order-card"
                    rows={2}
                    maxLength={240}
                    value={card}
                    onChange={(e) => setCard(e.target.value)}
                    placeholder="С юбилеем, дорогой! Ты — наша гордость."
                    className={cn(inputCls, "resize-none")}
                  />
                </Field>

                <fieldset>
                  <legend className={labelCls}>Куда отправить заказ</legend>
                  <div className="grid grid-cols-2 gap-1 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-1">
                    {(["whatsapp", "telegram"] as const).map((option) => {
                      const active = channel === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setChannel(option)}
                          className="relative flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold"
                        >
                          {active && (
                            <motion.span
                              layoutId="channel-pill"
                              transition={SPRING}
                              className="absolute inset-0 rounded-xl bg-white/[0.09] ring-1 ring-inset ring-white/10"
                            />
                          )}
                          <span
                            className={cn(
                              "relative z-10 flex items-center gap-2 transition-colors",
                              active ? "text-cream" : "text-sand/60"
                            )}
                          >
                            {option === "whatsapp" ? (
                              <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
                            ) : (
                              <TelegramIcon className="h-4 w-4 text-[#2AABEE]" />
                            )}
                            {option === "whatsapp" ? "WhatsApp" : "Telegram"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="flex items-start gap-2.5 rounded-xl border border-gold-300/20 bg-gold-300/[0.06] px-3.5 py-3 text-sm text-gold-100/90">
                  <BadgePercent className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
                  <span>
                    Промокод <b className="font-bold">{BRAND.promo}</b> применится автоматически: −10% на первый заказ
                  </span>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Отправить заказ в {channelLabel}
                  <ArrowRight
                    className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
                <p className="flex items-center justify-center gap-1.5 text-center text-xs text-sand/50">
                  <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                  Оплата — только после фото готового букета
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="done"
                role="status"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="px-6 py-10 text-center sm:px-10"
              >
                <SuccessMark />
                <h3 className="mt-6 text-2xl font-bold tracking-tight text-cream">Заявка сформирована!</h3>
                <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-sand/75">
                  {channel === "whatsapp"
                    ? "Мы открыли WhatsApp с готовым сообщением — просто нажмите «Отправить». Менеджер ответит в течение 5 минут."
                    : "Текст заказа скопирован. Вставьте его в чат Telegram и отправьте — менеджер ответит в течение 5 минут."}
                </p>
                <div className="mt-8 grid gap-2.5">
                  <ButtonLink
                    href={channel === "whatsapp" ? links.whatsapp(buildMessage()) : links.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                    className="w-full"
                  >
                    {channel === "whatsapp" ? (
                      <WhatsAppIcon className="h-5 w-5" />
                    ) : (
                      <TelegramIcon className="h-5 w-5" />
                    )}
                    Открыть {channelLabel} ещё раз
                  </ButtonLink>
                  <Button variant="ghost" size="lg" className="w-full" onClick={onClose}>
                    Вернуться на сайт
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
