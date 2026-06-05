import { tv } from "tailwind-variants";

export const homeArchitectureStyles = tv({
  slots: {
    bridge:
      "mb-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left",
    bridgeText: "max-w-2xl text-sm leading-relaxed text-fg-muted",
    bridgeLink:
      "inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-echo-600 transition hover:gap-3 dark:text-echo-400",
    grid: "grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14",
    diagram:
      "relative overflow-hidden rounded-2xl border border-border/80 bg-surface-elevated p-6 shadow-lg shadow-black/5 sm:p-8 dark:border-white/10 dark:bg-surface-elevated/40 dark:shadow-black/25",
    diagramGlow:
      "pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-bl from-echo-400/25 via-echo-500/10 to-transparent blur-2xl dark:from-echo-500/20",
    diagramInner: "relative z-10 mx-auto flex max-w-sm flex-col items-center gap-2",
    diagramCaption:
      "relative z-10 mt-5 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-subtle",
    connector: "h-2 w-px bg-border dark:bg-white/15",
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
  },
});

export const archLayerStyles = tv({
  slots: {
    wrap: "flex w-full flex-col items-center",
    layer: [
      "w-full rounded-xl border px-4 py-3 text-center transition duration-300",
      "hover:-translate-y-0.5 hover:shadow-md",
    ].join(" "),
    name: "font-mono text-sm font-semibold",
    hint: "mt-0.5 text-[10px] font-medium uppercase tracking-wider opacity-70",
  },
  variants: {
    emphasis: {
      default: {
        layer:
          "border-border bg-surface-elevated text-fg dark:border-white/10 dark:bg-surface-elevated/90",
      },
      foundation: {
        layer:
          "border-echo-500/30 bg-echo-50 text-echo-900 ring-1 ring-echo-500/15 dark:border-echo-500/35 dark:bg-echo-950/50 dark:text-echo-100 dark:ring-echo-500/20",
      },
    },
  },
  defaultVariants: { emphasis: "default" },
});
