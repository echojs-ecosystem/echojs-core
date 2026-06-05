import { tv } from "tailwind-variants";

export const playgroundStyles = tv({
  slots: {
    root: "my-8 space-y-4",
    header: "flex flex-wrap items-center justify-between gap-3",
    title: "text-sm font-semibold text-fg",
    hint: "text-xs text-fg-subtle",
    grid: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(220px,320px)]",
    preview:
      "min-h-[200px] rounded-xl border border-border/80 bg-surface-elevated/80 p-5 shadow-sm dark:border-white/10",
    statePanel:
      "flex min-h-[200px] flex-col overflow-hidden rounded-xl border border-border/80 bg-surface-muted/40 dark:border-white/10",
    stateLabel:
      "shrink-0 border-b border-border/80 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-fg-subtle dark:border-white/10",
    stateBody: "echo-scrollbar min-h-0 flex-1 overflow-auto p-4",
    statePre: "font-mono text-[11px] leading-relaxed whitespace-pre-wrap text-fg-muted",
    actions: "flex flex-wrap gap-2",
    btn: "rounded-lg border border-border/80 bg-surface px-3 py-1.5 text-sm font-medium text-fg transition hover:border-echo-500/40 hover:bg-echo-50/80 dark:hover:bg-echo-950/40",
    btnPrimary:
      "rounded-lg bg-echo-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-echo-700",
    metric: "mt-3 font-mono text-2xl font-bold tabular-nums text-echo-700 dark:text-echo-300",
    row: "mt-2 text-sm text-fg-muted",
    input:
      "mt-2 w-full max-w-xs rounded-lg border border-border/80 bg-surface px-3 py-2 text-sm dark:border-white/15",
    unavailable:
      "rounded-xl border border-dashed border-border/80 bg-surface-muted/30 p-8 text-center text-sm text-fg-muted",
  },
});
