import { tv } from "tailwind-variants";

export const frameworkStrengthStyles = tv({
  slots: {
    root:
      "relative overflow-hidden rounded-2xl border border-border/80 bg-surface-elevated p-6 shadow-lg shadow-black/5 sm:p-8 dark:border-white/10 dark:bg-surface-elevated/40 dark:shadow-black/25",
    glow: "pointer-events-none absolute -left-8 -top-8 h-36 w-36 rounded-full bg-gradient-to-br from-echo-400/20 via-transparent to-transparent blur-2xl dark:from-echo-500/15",
    grid: "relative z-10 grid gap-4 sm:grid-cols-2 sm:gap-5",
    echoWrap: "relative",
    echoBadge:
      "absolute -top-2 right-3 z-10 rounded-full border border-echo-500/35 bg-echo-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-echo-800 dark:border-echo-500/40 dark:bg-echo-500/20 dark:text-echo-300",
  },
});
