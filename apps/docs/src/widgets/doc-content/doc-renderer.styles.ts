import { tv } from "tailwind-variants";

export const docStyles = tv({
  slots: {
    prose: "doc-prose",
    title: "text-3xl font-bold tracking-tight text-fg sm:text-4xl",
    lead: "mt-3 text-base leading-relaxed text-fg-muted sm:text-lg",
    paragraph: "my-4 leading-7 text-fg-muted",
    hr: "my-10 border-0 border-t border-border/80 dark:border-white/10",
    inlineCode:
      "rounded-md border border-border/60 bg-surface-muted/80 px-1.5 py-0.5 font-mono text-[0.9em] text-fg dark:border-white/10",
    proseLink:
      "font-medium text-echo-700 underline decoration-echo-500/30 underline-offset-2 transition hover:text-echo-800 hover:decoration-echo-500/60 dark:text-echo-300 dark:hover:text-echo-200",
    list: "my-4 ml-6 list-disc space-y-2 text-fg-muted",
    orderedList: "my-4 ml-6 list-decimal space-y-2 text-fg-muted",
    tableWrap: "my-8 overflow-x-auto rounded-xl border border-border/80 shadow-sm dark:border-white/10",
    table: "w-full text-left text-sm",
    tableHead: "bg-surface-muted/80 dark:bg-surface-muted/50",
    th: "px-4 py-3 font-semibold text-fg",
    tr: "border-t border-border/80 dark:border-white/10",
    td: "px-4 py-3 text-fg-muted",
    tabs: "my-8 overflow-hidden rounded-xl border border-border/80 shadow-sm dark:border-white/10",
    tabsList: "flex gap-1 overflow-x-auto border-b border-border/80 bg-surface-muted/60 p-2 dark:border-white/10",
    tabsPanel: "p-6",
    badge:
      "my-4 inline-flex items-center rounded-full border border-echo-500/30 bg-echo-50 px-3 py-1 font-mono text-sm text-echo-800 dark:bg-echo-950/50 dark:text-echo-200",
    packageInstall: "my-8 not-prose",
  },
});

export const docHeadingStyles = tv({
  base: "scroll-mt-28 font-bold tracking-tight text-fg group",
  variants: {
    level: {
      1: "mt-2 mb-4 text-2xl sm:text-3xl",
      2: "mt-10 mb-3 border-b border-border/60 pb-2 text-xl font-semibold sm:mt-12 sm:text-2xl dark:border-white/10",
      3: "mt-7 mb-2 text-lg font-semibold sm:mt-8 sm:text-xl",
      4: "mt-5 mb-2 text-base font-medium sm:mt-6 sm:text-lg",
    },
  },
  defaultVariants: {
    level: 1,
  },
});

export const calloutStyles = tv({
  slots: {
    root: "my-6 overflow-hidden rounded-xl border shadow-sm",
    header: "flex items-start gap-3 px-4 py-3",
    icon: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold",
    headerText: "min-w-0 flex-1 pt-0.5",
    title: "text-sm font-semibold text-fg",
    body: "border-t border-border/50 px-4 py-3 text-sm leading-relaxed text-fg-muted dark:border-white/10",
  },
  variants: {
    variant: {
      note: {
        root: "border-sky-500/25 bg-sky-50/60 dark:border-sky-500/30 dark:bg-sky-950/25",
        icon: "bg-sky-500/15 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300",
      },
      info: {
        root: "border-sky-500/25 bg-sky-50/50 dark:border-sky-500/30 dark:bg-sky-950/20",
        icon: "bg-sky-500/15 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300",
      },
      tip: {
        root: "border-emerald-500/30 bg-emerald-50/60 dark:border-emerald-500/30 dark:bg-emerald-950/25",
        icon: "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
      },
      recommendation: {
        root: "border-echo-500/35 bg-echo-50/70 dark:border-echo-500/35 dark:bg-echo-950/30",
        icon: "bg-echo-500/20 text-echo-800 dark:bg-echo-500/25 dark:text-echo-200",
      },
      warning: {
        root: "border-amber-500/35 bg-amber-50/70 dark:border-amber-500/35 dark:bg-amber-950/25",
        icon: "bg-amber-500/20 text-amber-800 dark:bg-amber-500/25 dark:text-amber-300",
      },
      danger: {
        root: "border-red-500/35 bg-red-50/70 dark:border-red-500/35 dark:bg-red-950/25",
        icon: "bg-red-500/15 text-red-700 dark:bg-red-500/20 dark:text-red-300",
      },
      important: {
        root: "border-violet-500/30 bg-violet-50/60 dark:border-violet-500/30 dark:bg-violet-950/25",
        icon: "bg-violet-500/15 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300",
      },
    },
  },
  defaultVariants: {
    variant: "note",
  },
});

export const tabButtonStyles = tv({
  base: "shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition",
  variants: {
    active: {
      true: "bg-surface-elevated text-fg shadow-sm ring-1 ring-border/80 dark:ring-white/10",
      false: "text-fg-muted hover:bg-surface-muted/80 hover:text-fg",
    },
  },
});
