import { tv } from "tailwind-variants";

export const homeButtonStyles = tv({
  slots: {
    primary:
      "inline-flex items-center justify-center rounded-xl bg-echo-500 px-6 py-3 text-sm font-semibold text-stone-950 shadow-sm transition hover:bg-echo-400 active:scale-[0.98]",
    secondary:
      "inline-flex items-center justify-center rounded-xl border border-border bg-surface-elevated px-6 py-3 text-sm font-semibold text-fg shadow-sm transition hover:border-echo-500/25 hover:bg-echo-50/60 dark:hover:bg-echo-950/30",
  },
});
