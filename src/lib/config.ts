/**
 * Brand & contact configuration.
 * Replace the placeholder contacts below with real ones before going live.
 */
export const BRAND = {
  name: "BRUT",
  tagline: "Мужские съедобные букеты",
  phoneDisplay: "+374 99 123-456",
  phoneHref: "tel:+37499123456",
  whatsapp: "37499123456",
  telegram: "brut_bouquets",
  instagram: "brut.yerevan",
  address: "Ереван, ул. Абовяна, 12",
  hours: "Ежедневно 09:00–22:00",
  promo: "BRUT10",
  promoPercent: 10,
  cutoffHour: 19,
  freeDeliveryFrom: 25000,
  deliveryPrice: 1500,
} as const;

export const WA_GREETING = "Здравствуйте! Хочу заказать мужской букет. Подскажете варианты?";

export const links = {
  whatsapp: (text: string = WA_GREETING) =>
    `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(text)}`,
  telegram: `https://t.me/${BRAND.telegram}`,
  instagram: `https://instagram.com/${BRAND.instagram}`,
};

export function formatAMD(value: number): string {
  return `${Math.round(value).toLocaleString("ru-RU")} ֏`;
}

/** Price with the first-order promo applied, rounded to 100 ֏. */
export function withPromo(value: number): number {
  return Math.round((value * (100 - BRAND.promoPercent)) / 10000) * 100;
}

export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall back below */
  }
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

export function todayISO(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export function formatDateRu(iso: string): string {
  if (!iso) return "по согласованию";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("ru-RU", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });
}
