import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { NAV_LINKS, SECTION_IDS } from "@/data/content";
import { BRAND, links } from "@/lib/config";
import { useScrolled, useScrollSpy } from "@/lib/hooks";
import { cn } from "@/utils/cn";
import { Button, ButtonLink } from "../ui/Button";
import { WhatsAppIcon } from "../ui/Icons";
import { Logo } from "../ui/Logo";
import { EASE, fadeUp, SPRING, stagger } from "../ui/motion";

export function Navbar() {
  const { openOrder } = useApp();
  const scrolled = useScrolled(16);
  const active = useScrollSpy(SECTION_IDS);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const highlighted = hovered ?? active;
  const solid = scrolled || open;

  return (
    <header className="sticky top-0 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-ink-950/70 backdrop-blur-md lg:hidden"
          />
        )}
      </AnimatePresence>

      <div
        className={cn(
          "relative z-10 border-b transition-colors duration-500",
          solid
            ? "border-white/[0.06] bg-ink-950/75 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent"
        )}
      >
        <nav
          aria-label="Основная навигация"
          className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:h-[72px] lg:px-8"
        >
          <a href="#top" aria-label="BRUT — наверх" className="rounded-xl">
            <Logo />
          </a>

          <ul
            className="hidden items-center gap-0.5 rounded-full border border-white/[0.07] bg-white/[0.03] p-1 backdrop-blur-md lg:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {NAV_LINKS.map((item) => (
              <li key={item.id} className="relative">
                {highlighted === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={SPRING}
                    className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-inset ring-white/10"
                  />
                )}
                <a
                  href={`#${item.id}`}
                  onMouseEnter={() => setHovered(item.id)}
                  onFocus={() => setHovered(item.id)}
                  onBlur={() => setHovered(null)}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                    highlighted === item.id ? "text-cream" : "text-sand/70 hover:text-cream"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={BRAND.phoneHref}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-cream/90 transition-colors hover:text-gold-200 xl:inline-flex"
            >
              <Phone className="h-4 w-4 text-gold-300" aria-hidden="true" />
              {BRAND.phoneDisplay}
            </a>
            <Button size="sm" onClick={() => openOrder()} className="hidden sm:inline-flex">
              Заказать букет
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] transition-colors hover:bg-white/[0.08] lg:hidden"
            >
              <span className="relative block h-3.5 w-[18px]" aria-hidden="true">
                <motion.span
                  className="absolute left-0 h-0.5 w-full rounded-full bg-cream"
                  initial={false}
                  animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
                <motion.span
                  className="absolute left-0 top-1.5 h-0.5 w-full rounded-full bg-cream"
                  initial={false}
                  animate={{ opacity: open ? 0 : 1, scaleX: open ? 0.3 : 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute left-0 h-0.5 w-full rounded-full bg-cream"
                  initial={false}
                  animate={open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute inset-x-0 top-full z-10 px-4 pt-3 lg:hidden"
          >
            <div className="max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-3xl border border-white/10 bg-ink-900/95 p-3 shadow-2xl shadow-black/60 backdrop-blur-xl">
              <motion.ul variants={stagger(0.045, 0.05)} initial="hidden" animate="show">
                {NAV_LINKS.map((item) => (
                  <motion.li key={item.id} variants={fadeUp}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-semibold text-cream transition-colors hover:bg-white/5"
                    >
                      {item.label}
                      <ArrowUpRight className="h-4 w-4 text-sand/50" aria-hidden="true" />
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="mt-2 grid gap-2 border-t border-white/[0.06] p-2 pt-4">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    setOpen(false);
                    openOrder();
                  }}
                >
                  Заказать букет · −10%
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <ButtonLink variant="glass" href={links.whatsapp()} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
                    WhatsApp
                  </ButtonLink>
                  <ButtonLink variant="glass" href={BRAND.phoneHref}>
                    <Phone className="h-4 w-4 text-gold-300" aria-hidden="true" />
                    Позвонить
                  </ButtonLink>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
