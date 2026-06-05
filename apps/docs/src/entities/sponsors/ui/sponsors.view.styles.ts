import { tv } from "tailwind-variants";

export const sponsorsPageStyles = tv({
  slots: {
    root: "relative min-h-dvh overflow-hidden bg-surface",
    mesh: "pointer-events-none absolute inset-0 bg-hero-mesh opacity-80 dark:opacity-60",
    main: "relative",
    container: "mx-auto max-w-5xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12",
    header: "mb-12 max-w-2xl",
    title: "text-4xl font-bold tracking-tight text-fg sm:text-5xl",
    lead: "mt-4 text-base leading-relaxed text-fg-muted sm:text-lg",
    tiers: "mt-10",
    ctaBlock: "mt-14 rounded-2xl border border-border/80 bg-surface-elevated/50 p-8 text-center dark:border-white/10 dark:bg-surface-elevated/30 sm:p-10",
    ctaTitle: "text-xl font-semibold text-fg",
    ctaBody: "mx-auto mt-3 max-w-md text-sm leading-relaxed text-fg-muted",
    ctaActions: "mt-6 flex flex-wrap justify-center gap-3",
  },
});
