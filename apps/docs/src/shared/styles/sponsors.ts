import { tv } from "tailwind-variants";

export const sponsorLogoStyles = tv({
  slots: {
    root: "inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white shadow-md ring-2 ring-white/10 transition duration-300 group-hover:scale-105 group-hover:ring-white/20",
    label: "sr-only",
  },
  variants: {
    size: {
      gold: { root: "h-16 w-16 text-base sm:h-[4.5rem] sm:w-[4.5rem] sm:text-lg" },
      silver: { root: "h-11 w-11 text-xs sm:h-12 sm:w-12 sm:text-sm" },
      bronze: { root: "h-9 w-9 text-[10px] sm:h-10 sm:w-10" },
    },
  },
  defaultVariants: { size: "silver" },
});

export const sponsorsTierStyles = tv({
  slots: {
    panel: "overflow-hidden rounded-2xl border border-border/80 bg-surface-elevated/60 dark:border-white/10 dark:bg-surface-elevated/40",
    panelGold: "relative border-echo-500/25 before:absolute before:inset-y-3 before:left-0 before:w-0.5 before:rounded-full before:bg-gradient-to-b before:from-echo-400 before:to-echo-600",
    panelSilver: "border-border/70",
    panelBronze:
      "relative border-amber-800/20 before:absolute before:inset-y-3 before:left-0 before:w-0.5 before:rounded-full before:bg-gradient-to-b before:from-amber-700/80 before:to-amber-900/50 dark:border-amber-700/25",
    header: "flex items-center gap-2 border-b border-border/80 px-5 py-3.5 dark:border-white/10",
    headerIconGold: "text-sm text-echo-500",
    headerIconSilver: "text-sm font-light text-fg-subtle",
    headerIconBronze: "text-xs text-amber-700 dark:text-amber-600",
    headerLabelGold: "text-[11px] font-bold uppercase tracking-[0.18em] text-echo-600 dark:text-echo-400",
    headerLabelSilver: "text-[11px] font-bold uppercase tracking-[0.18em] text-fg-subtle",
    headerLabelBronze:
      "text-[11px] font-bold uppercase tracking-[0.18em] text-amber-800 dark:text-amber-600/90",
    grid: "grid divide-border/80 dark:divide-white/10",
    gridGold: "grid-cols-2 divide-x divide-y",
    gridSilver: "grid-cols-2 divide-x divide-y sm:grid-cols-3 lg:grid-cols-6",
    gridBronze: "grid-cols-2 divide-x divide-y sm:grid-cols-4 lg:grid-cols-8",
    cell: [
      "group flex flex-col items-center justify-center gap-3 bg-surface/20 px-4 text-center transition",
      "hover:bg-echo-50/30 dark:hover:bg-echo-950/20",
    ].join(" "),
    cellGold: "min-h-[9.5rem] py-8 sm:min-h-[10.5rem]",
    cellSilver: "min-h-[7rem] py-6 sm:min-h-[7.5rem]",
    cellBronze: "min-h-[5.5rem] gap-2 py-4 sm:min-h-[6rem]",
    cellPlaceholder: [
      "flex min-h-[9.5rem] flex-col items-center justify-center gap-2 border-dashed bg-transparent px-4 py-8 text-center sm:min-h-[10.5rem]",
      "text-fg-subtle transition hover:bg-echo-50/20 dark:hover:bg-echo-950/15",
    ].join(" "),
    cellName: "text-xs font-semibold text-fg-muted opacity-0 transition group-hover:opacity-100 sm:text-sm",
    cellNameVisible: "text-xs font-semibold text-fg sm:text-sm",
    placeholderIcon: "flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-border text-xl text-fg-subtle dark:border-white/15",
    placeholderText: "text-xs font-medium text-fg-subtle",
  },
});

export const sponsorsBoardStyles = tv({
  slots: {
    stack: "flex flex-col gap-6",
  },
});

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
