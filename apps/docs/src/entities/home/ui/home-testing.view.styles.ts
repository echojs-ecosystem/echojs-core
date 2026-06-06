import { tv } from "tailwind-variants";

export const homeTestingStyles = tv({
  slots: {
    bridge:
      "mb-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left",
    bridgeText: "max-w-2xl text-sm leading-relaxed text-fg-muted",
    bridgeLink:
      "inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-echo-600 transition hover:gap-3 dark:text-echo-400",
    grid: "grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14",
    advantages: "grid gap-4 sm:grid-cols-2",
    advantageCard:
      "group relative flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface-elevated/90 p-5 no-underline transition duration-300 hover:-translate-y-0.5 hover:border-echo-500/30 hover:shadow-lg hover:shadow-echo-500/10 dark:border-white/10 dark:bg-surface-elevated/50 dark:hover:shadow-echo-500/5",
    advantageIcon:
      "inline-flex w-fit rounded-md bg-echo-500/15 px-2 py-0.5 text-[11px] font-bold tabular-nums tracking-widest text-echo-800 dark:bg-echo-500/20 dark:text-echo-300",
    advantageTitle: "mt-3 text-base font-semibold text-fg group-hover:text-echo-800 dark:group-hover:text-echo-100",
    advantageSummary: "mt-2 flex-1 text-sm leading-relaxed text-fg-muted",
    advantageHighlight:
      "mt-3 rounded-lg border border-echo-500/20 bg-echo-50/60 px-3 py-2 text-xs font-medium leading-relaxed text-echo-900 dark:border-echo-500/25 dark:bg-echo-950/40 dark:text-echo-200",
    advantageLink:
      "mt-4 inline-flex items-center gap-1 text-xs font-semibold text-echo-600 opacity-0 transition group-hover:opacity-100 dark:text-echo-400",
    codeStack: "relative flex flex-col gap-4",
    codeStackGlow:
      "pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-gradient-to-bl from-echo-400/20 via-echo-500/10 to-transparent blur-2xl dark:from-echo-500/15",
    codePanel:
      "relative overflow-hidden rounded-2xl border border-border/80 bg-surface-elevated shadow-lg shadow-black/5 dark:border-white/10 dark:bg-surface-elevated/40 dark:shadow-black/25",
    codeChrome:
      "flex items-center gap-3 border-b border-border/80 bg-surface-muted/80 px-4 py-3 dark:border-white/10 dark:bg-surface-muted/50",
    codeDots: "flex gap-1.5",
    codeDot: "h-2.5 w-2.5 rounded-full",
    codeTitle: "min-w-0 flex-1 truncate font-mono text-[11px] text-fg-muted",
    codeBadge:
      "shrink-0 rounded-md border border-echo-500/25 bg-echo-50/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-echo-800 dark:border-echo-500/30 dark:bg-echo-950/50 dark:text-echo-200",
    codeBody: "overflow-x-auto p-0",
    codeFoot:
      "border-t border-border/60 px-4 py-2.5 text-[11px] font-medium text-fg-subtle dark:border-white/[0.06]",
    splitDiagram:
      "mb-4 flex items-stretch gap-3 rounded-xl border border-border/70 bg-surface-muted/50 p-3 dark:border-white/10 dark:bg-surface-muted/30",
    splitBox:
      "flex flex-1 flex-col items-center justify-center rounded-lg border border-border/70 bg-surface-elevated px-3 py-4 text-center dark:border-white/10 dark:bg-surface-elevated/80",
    splitLabel: "font-mono text-xs font-semibold text-fg",
    splitHint: "mt-1 text-[10px] font-medium uppercase tracking-wider text-fg-subtle",
    splitArrow: "flex shrink-0 items-center text-lg text-echo-600 dark:text-echo-400",
  },
});

export const testingDotColors = ["bg-red-400/90", "bg-amber-400/90", "bg-emerald-400/90"] as const;
