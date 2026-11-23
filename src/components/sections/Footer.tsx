import { Clock, MapPin, Phone, Truck } from "lucide-react";
import { NAV_LINKS, PRODUCTS } from "@/data/content";
import { BRAND, links } from "@/lib/config";
import { InstagramIcon, TelegramIcon, WhatsAppIcon } from "../ui/Icons";
import { Logo } from "../ui/Logo";

const SOCIALS = [
  { label: "WhatsApp", href: links.whatsapp(), icon: WhatsAppIcon },
  { label: "Telegram", href: links.telegram, icon: TelegramIcon },
  { label: "Instagram", href: links.instagram, icon: InstagramIcon },
];

const LINK = "text-sm text-sand/65 transition-colors hover:text-cream";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-ink-950 pt-16 sm:pt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-sand/65">
              Мужские съедобные букеты в Ереване. Бастурма, суджух, армянские сыры, коньяк и пиво — в подарке, который
              не завянет, а будет съеден с удовольствием.
            </p>
            <div className="mt-6 flex gap-2">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-sand/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300/40 hover:text-gold-200"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Навигация в подвале">
            <h3 className="text-sm font-bold text-cream">Навигация</h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className={LINK}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#how" className={LINK}>
                  Как заказать
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-bold text-cream">Букеты</h3>
            <ul className="mt-5 space-y-3">
              {PRODUCTS.map((product) => (
                <li key={product.id}>
                  <a href="#catalog" className={LINK}>
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-cream">Контакты</h3>
            <ul className="mt-5 space-y-3.5 text-sm text-sand/65">
              <li>
                <a href={BRAND.phoneHref} className="flex items-center gap-2.5 transition-colors hover:text-cream">
                  <Phone className="h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
                  {BRAND.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
                {BRAND.address}
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
                {BRAND.hours}
              </li>
              <li className="flex items-start gap-2.5">
                <Truck className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
                Ереван, Абовян, Эчмиадзин, Гюмри, Ванадзор, Дилижан
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.06] py-8 text-xs text-sand/45 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {BRAND.name}. {BRAND.tagline}. Все права защищены.
          </p>
          <p className="max-w-xl lg:text-right">
            Продажа алкоголя лицам младше 18 лет запрещена. Чрезмерное употребление алкоголя вредит вашему здоровью.
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none -mb-[0.18em] select-none bg-gradient-to-b from-white/[0.07] to-transparent bg-clip-text pb-24 text-center text-[26vw] font-extrabold leading-[0.8] tracking-[-0.06em] text-transparent lg:pb-0 lg:text-[17rem]"
      >
        BRUT
      </div>
    </footer>
  );
}
