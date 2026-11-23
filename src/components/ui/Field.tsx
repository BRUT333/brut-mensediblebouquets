import type { ReactNode } from "react";

export const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-cream placeholder:text-sand/40 outline-none transition duration-200 focus:border-gold-300/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-gold-300/10 aria-[invalid=true]:border-red-400/60";

export const labelCls = "mb-1.5 flex items-center justify-between gap-2 text-[13px] font-semibold text-sand/90";

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}

export function Field({ id, label, hint, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
        {hint && <span className="font-normal text-sand/45">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
