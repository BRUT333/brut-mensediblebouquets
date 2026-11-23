import { motion } from "framer-motion";
import { EASE } from "./motion";

export function SuccessMark() {
  return (
    <div className="relative mx-auto h-20 w-20">
      <span aria-hidden="true" className="absolute inset-0 animate-ping-slow rounded-full bg-emerald-400/20" />
      <svg viewBox="0 0 52 52" className="relative h-20 w-20" aria-hidden="true">
        <circle cx="26" cy="26" r="25" className="fill-emerald-400/10" />
        <motion.circle
          cx="26"
          cy="26"
          r="24"
          fill="none"
          stroke="#34d399"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        />
        <motion.path
          d="M15.5 27.5l7 7 14-15"
          fill="none"
          stroke="#34d399"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
        />
      </svg>
    </div>
  );
}
