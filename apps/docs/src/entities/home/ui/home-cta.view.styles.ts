import { tv } from "tailwind-variants";

export const homeCtaStyles = tv({
  slots: {
    cta: [
      "relative overflow-hidden rounded-3xl border border-border/80 bg-surface-elevated p-6 shadow-xl shadow-black/5 ring-1 ring-black/[0.04]",
      "sm:p-8 dark:border-white/10 dark:bg-surface-elevated/70 dark:ring-white/[0.06]",
    ].join(" "),
    ctaMesh:
      "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_100%_0%,color-mix(in_srgb,var(--color-echo-500)_18%,transparent),transparent_55%)] dark:opacity-90",
    ctaGrid: "relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-center lg:gap-10",
    ctaCopy: "flex flex-col",
    ctaEyebrow: "text-xs font-semibold uppercase tracking-[0.2em] text-echo-700 dark:text-echo-400",
    ctaTitle: "text-2xl font-bold tracking-tight text-fg sm:text-3xl",
    ctaBody: "mt-3 max-w-xl text-sm leading-relaxed text-fg-muted sm:text-base",
    ctaBodyEm: "font-medium text-fg",
    ctaSteps: "mt-6 flex flex-wrap gap-2",
    ctaStep:
      "inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/80 px-3 py-1.5 text-xs font-medium text-fg-muted dark:border-white/10 dark:bg-surface/50",
    ctaStepNum:
      "flex h-5 w-5 items-center justify-center rounded-full bg-echo-500/15 text-[10px] font-bold text-echo-700 dark:bg-echo-500/20 dark:text-echo-300",
    ctaActions: "mt-8 flex flex-wrap items-center gap-3",
    ctaAside: "min-w-0",
    ctaAsideLabel: "text-sm font-semibold text-fg",
    ctaAsideHint: "mt-1 text-xs text-fg-subtle",
    ctaInstall: "mt-4 min-w-0",
  },
});
