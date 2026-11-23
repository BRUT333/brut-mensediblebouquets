import { useEffect, useState } from "react";
import { BRAND } from "./config";

export function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/** Returns the id of the section currently crossing the middle of the viewport. */
export function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const YEREVAN_UTC_OFFSET_MS = 4 * 60 * 60 * 1000;

function computeCutoff() {
  // A Date whose UTC fields represent the current wall-clock time in Yerevan (UTC+4).
  const yerevan = new Date(Date.now() + YEREVAN_UTC_OFFSET_MS);
  const target = new Date(yerevan.getTime());
  target.setUTCHours(BRAND.cutoffHour, 0, 0, 0);
  const isToday = yerevan.getUTCHours() < BRAND.cutoffHour;
  return { isToday, diff: isToday ? target.getTime() - yerevan.getTime() : 0 };
}

/** Live countdown to today's same-day-delivery cutoff (Yerevan time). */
export function useCutoffCountdown() {
  const [state, setState] = useState(computeCutoff);
  useEffect(() => {
    const id = window.setInterval(() => setState(computeCutoff()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const total = Math.max(0, Math.floor(state.diff / 1000));
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    isToday: state.isToday,
    hours: pad(Math.floor(total / 3600)),
    minutes: pad(Math.floor((total % 3600) / 60)),
    seconds: pad(total % 60),
  };
}
