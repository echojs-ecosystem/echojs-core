import { tv } from "tailwind-variants";

export const frameworkComparisonStyles = tv({
  slots: {
    block: "mt-16",
    blockTitle: "text-lg font-semibold text-fg sm:text-xl",
    blockLead: "mt-2 max-w-2xl text-sm text-fg-muted",
    tableWrap: "mt-6 overflow-x-auto rounded-2xl border border-border/80 dark:border-white/10",
    tableInner: "min-w-[44rem]",
    gridCols: "grid-cols-[minmax(10.5rem,1.28fr)_repeat(6,minmax(0,1fr))]",
    gridRow: "grid w-full",
    gridHeadRow:
      "border-b border-border/80 bg-surface-muted/80 dark:border-white/10 dark:bg-surface-muted/50",
    gridBodyRow:
      "border-b border-border/60 transition last:border-b-0 hover:bg-surface-muted/40 dark:border-white/[0.06] dark:hover:bg-white/[0.02]",
    gridCell: "min-w-0",
    gridHeadCell: "flex items-center justify-center px-2 py-3",
    gridFeatureHead:
      "sticky left-0 z-10 justify-start bg-surface-muted/95 px-4 text-xs font-semibold uppercase tracking-wider text-fg-subtle backdrop-blur-sm dark:bg-surface-muted/90",
    gridFrameworkHead: "text-center text-[11px] font-semibold uppercase tracking-wider text-fg-subtle",
    gridFeatureCell:
      "sticky left-0 z-10 flex flex-col justify-center bg-surface-elevated/95 px-4 py-3.5 text-left text-sm font-medium text-fg backdrop-blur-sm dark:bg-surface-elevated/90",
    gridFrameworkCell: "flex items-center justify-center px-2 py-3.5",
    gridEchoColumn: "bg-echo-50/50 dark:bg-echo-950/30",
    gridEchoHead: "font-bold text-echo-900 dark:text-echo-200",
    featureHint: "mt-0.5 block text-xs font-normal text-fg-subtle",
    cellYes:
      "inline-flex h-7 w-7 items-center justify-center rounded-full bg-echo-500/20 text-sm font-bold text-echo-800 ring-1 ring-echo-500/30 dark:bg-echo-950 dark:text-echo-300 dark:ring-echo-500/20",
    cellPartial:
      "inline-flex h-7 w-7 items-center justify-center rounded-full bg-surface-muted text-sm text-fg-muted",
    cellNo: "inline-flex h-7 w-7 items-center justify-center text-sm text-fg-subtle",
    perfValue: "font-mono text-sm tabular-nums",
    perfBest: "font-semibold text-echo-700 dark:text-echo-300",
    perfUnit: "ml-0.5 text-xs text-fg-subtle",
    disclaimer: "mt-4 text-xs leading-relaxed text-fg-subtle",
    reasons: "mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4",
    reasonCard: [
      "group relative flex flex-col rounded-2xl border border-border/70 bg-surface-elevated p-4",
      "transition duration-300 hover:-translate-y-0.5 hover:border-echo-500/25 hover:shadow-md hover:shadow-black/5",
      "dark:border-white/10 dark:bg-surface-elevated/50 dark:hover:border-echo-500/30",
    ].join(" "),
    reasonCardGlow:
      "pointer-events-none absolute -right-3 -top-3 h-16 w-16 rounded-full bg-echo-400/10 blur-xl transition group-hover:bg-echo-400/20 dark:bg-echo-500/10",
    reasonIconWrap:
      "mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-echo-50 ring-1 ring-echo-500/20 dark:bg-echo-950/60 dark:ring-echo-500/25",
    reasonIcon: "text-sm font-bold leading-none text-echo-700 dark:text-echo-300",
    reasonTitle: "text-sm font-semibold leading-snug text-fg",
    reasonBody: "mt-2 text-xs leading-relaxed text-fg-muted",
    deepDive: [
      "mt-10 overflow-hidden rounded-2xl border border-border/80",
      "bg-gradient-to-br from-surface-elevated/90 via-surface-elevated/50 to-echo-50/20",
      "p-5 sm:p-6 dark:border-white/10 dark:from-surface-elevated/80 dark:via-surface-elevated/40 dark:to-echo-950/20",
    ].join(" "),
    deepDiveLayout: "flex flex-col gap-6",
    deepDiveIntro: "max-w-2xl",
    deepDiveTitle: "text-base font-semibold text-fg sm:text-lg",
    deepDiveLead: "mt-2 text-sm leading-relaxed text-fg-muted",
    deepDiveIndexLink:
      "mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-echo-700 transition hover:text-echo-600 dark:text-echo-300 dark:hover:text-echo-200",
    deepDiveGrid:
      "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5",
    deepDiveCard: [
      "group relative flex aspect-square flex-col rounded-2xl border border-border/70 bg-surface/90 p-4 text-left shadow-sm shadow-black/[0.02]",
      "transition duration-300 hover:-translate-y-0.5 hover:border-echo-500/35 hover:bg-echo-50/50 hover:shadow-lg hover:shadow-echo-500/10",
      "dark:border-white/10 dark:bg-surface-elevated/60 dark:hover:border-echo-500/40 dark:hover:bg-echo-950/40",
    ].join(" "),
    deepDiveCardGlow:
      "pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full bg-echo-400/10 blur-2xl transition group-hover:bg-echo-400/20 dark:bg-echo-500/10",
    deepDiveCardIconWrap:
      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-muted/90 ring-1 ring-border/80 dark:bg-surface-muted/50 dark:ring-white/10",
    deepDiveCardIcon: "h-6 w-6",
    deepDiveCardCopy: "mt-3 flex min-h-0 flex-1 flex-col",
    deepDiveCardEyebrow: "text-[10px] font-bold uppercase tracking-[0.12em] text-fg-subtle",
    deepDiveCardTitle:
      "mt-1.5 line-clamp-3 flex-1 text-sm font-semibold leading-snug text-fg group-hover:text-echo-800 dark:group-hover:text-echo-100",
    deepDiveCardFooter: "mt-auto flex items-center justify-between gap-2 pt-3",
    deepDiveCardArrow:
      "text-sm font-semibold text-echo-600 transition group-hover:translate-x-0.5 dark:text-echo-400",
    deepDiveCardSoon:
      "flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border/70 p-4 text-center text-sm text-fg-subtle dark:border-white/10",
    deepDiveCardSoonLabel: "min-w-0 truncate",
    deepDiveCardSoonBadge: "shrink-0 rounded-md bg-surface-muted px-2 py-0.5 text-[10px] font-medium uppercase",
  },
});
