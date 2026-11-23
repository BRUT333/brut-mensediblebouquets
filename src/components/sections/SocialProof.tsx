import { motion } from "framer-motion";
import { OCCASIONS, RECIPIENTS, STATS } from "@/data/content";
import { cn } from "@/utils/cn";
import { fadeUp, stagger } from "../ui/motion";
import { CountUp } from "../ui/Numbers";

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="group flex overflow-hidden fade-x">
      <ul
        className={cn(
          "flex w-max shrink-0 gap-3 pr-3 group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {doubled.map((item, i) => (
          <li
            key={`${item}-${i}`}
            aria-hidden={i >= items.length ? true : undefined}
            className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/[0.07] bg-white/[0.025] px-5 py-2.5 text-sm font-medium text-sand/85"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SocialProof() {
  return (
    <section
      id="proof"
      aria-label="Нам доверяют"
      className="relative border-y border-white/[0.06] bg-ink-900/40 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.ul
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-white/[0.06]"
        >
          {STATS.map((stat) => (
            <motion.li key={stat.label} variants={fadeUp} className="text-center lg:px-6">
              <p className="text-4xl font-extrabold tracking-[-0.045em] text-cream sm:text-5xl">
                <CountUp to={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm font-semibold text-cream/90">{stat.label}</p>
              <p className="mt-0.5 text-xs text-sand/55">{stat.sub}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <div className="mt-14 space-y-3">
        <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.22em] text-sand/50">
          Дарят на любой мужской повод
        </p>
        <Marquee items={OCCASIONS} />
        <Marquee items={RECIPIENTS} reverse />
      </div>
    </section>
  );
}
