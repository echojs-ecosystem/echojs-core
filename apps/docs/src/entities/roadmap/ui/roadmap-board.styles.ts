import { tv } from "tailwind-variants";

export const roadmapBoardStyles = tv({
  slots: {
    board: "grid gap-5 lg:grid-cols-3",
    column: [
      "flex min-h-[18rem] flex-col rounded-2xl border border-border/80 bg-surface-elevated/40 p-4",
      "dark:border-white/10 dark:bg-surface-elevated/25",
    ].join(" "),
    columnHeader: "mb-4 border-b border-border/60 pb-3 dark:border-white/10",
    columnTitle: "text-sm font-semibold uppercase tracking-[0.12em] text-fg",
    columnDesc: "mt-1 text-xs leading-relaxed text-fg-subtle",
    columnBody: "flex flex-1 flex-col gap-3",
    card: [
      "rounded-xl border border-border/70 bg-surface p-3.5 shadow-sm transition",
      "hover:border-echo-500/30 hover:shadow-md dark:border-white/10 dark:bg-surface/80",
    ].join(" "),
    cardTitle: "text-sm font-semibold leading-snug text-fg",
    cardDesc: "mt-1.5 text-xs leading-relaxed text-fg-muted",
    cardTags: "mt-2.5 flex flex-wrap gap-1.5",
    tag: [
      "rounded-md border border-border/70 bg-surface-muted/60 px-1.5 py-0.5",
      "text-[10px] font-medium uppercase tracking-wide text-fg-subtle dark:border-white/10",
    ].join(" "),
    statusPlanned: "text-sky-600 dark:text-sky-400",
    statusProgress: "text-amber-600 dark:text-amber-400",
    statusShipped: "text-emerald-600 dark:text-emerald-400",
    communityCard: [
      "rounded-xl border border-dashed border-echo-500/35 bg-echo-50/40 p-3.5",
      "dark:border-echo-500/25 dark:bg-echo-950/30",
    ].join(" "),
    communityMeta: "mt-2 text-[10px] font-medium uppercase tracking-wide text-fg-subtle",
  },
  variants: {
    status: {
      planned: { columnTitle: "text-sky-600 dark:text-sky-400" },
      "in-progress": { columnTitle: "text-amber-600 dark:text-amber-400" },
      shipped: { columnTitle: "text-emerald-600 dark:text-emerald-400" },
    },
  },
});
