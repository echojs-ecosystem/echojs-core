import { tv } from "tailwind-variants";

export const sponsorsSectionStyles = tv({
  slots: {
    root: "relative overflow-hidden border-t border-border/60 py-20 sm:py-24",
    inner: "relative z-10",
    headerRow: "mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
    header: "max-w-xl",
    eyebrow: "mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-echo-700 dark:text-echo-400",
    title: "text-3xl font-bold tracking-tight text-fg sm:text-4xl",
    lead: "mt-3 text-sm leading-relaxed text-fg-muted sm:text-base",
    viewAll:
      "inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-echo-600 transition hover:gap-2 dark:text-echo-400",
    actions: "mt-10 flex flex-wrap items-center justify-center gap-4 sm:justify-start",
    becomeBtn:
      "inline-flex items-center justify-center gap-2 rounded-xl border border-echo-500/30 bg-gradient-to-r from-echo-50/90 via-echo-100/40 to-echo-50/80 px-6 py-3 text-sm font-semibold text-echo-900 shadow-sm shadow-echo-500/10 transition hover:border-echo-500/50 hover:from-echo-100 hover:to-echo-50 active:scale-[0.98] dark:border-echo-500/35 dark:from-echo-950/60 dark:via-echo-900/40 dark:to-echo-950/50 dark:text-echo-100 dark:hover:from-echo-900/80",
    becomeIcon: "text-echo-600 dark:text-echo-400",
  },
});
