import { tv } from "tailwind-variants";

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
