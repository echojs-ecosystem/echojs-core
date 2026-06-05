import { tv } from "tailwind-variants";

export const docLayoutStyles = tv({
  slots: {
    article: "flex w-full",
    main: "flex min-w-0 flex-1 justify-center px-5 sm:px-8 lg:px-10",
    mainInner: "w-full min-w-0 max-w-3xl",
    tocAside: "hidden w-72 shrink-0 xl:block xl:pr-6 2xl:w-80 2xl:pr-10",
    tocSticky: "sticky top-24 pb-8",
  },
});

export const docTocStyles = tv({
  slots: {
    root: [
      "flex w-full max-h-[calc(100vh-6.5rem)] flex-col rounded-2xl border border-border/80",
      "bg-surface-elevated/60 p-5 dark:border-white/10 dark:bg-surface-elevated/40",
    ].join(" "),
    title: "mb-3 shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-fg-subtle",
    list: [
      "echo-scrollbar flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto border-l border-border/80 pl-4 pr-1",
      "dark:border-white/10",
    ].join(" "),
    link: "block break-words rounded-md py-1.5 pl-2.5 text-[13px] leading-snug text-fg-muted transition hover:bg-echo-50/80 hover:text-echo-800 dark:hover:bg-echo-950/40 dark:hover:text-echo-200",
    linkActive: "bg-echo-50/90 font-medium text-echo-800 dark:bg-echo-950/50 dark:text-echo-200",
    linkDepth2: "text-[13px]",
    linkDepth3: "pl-4 text-[12px]",
    empty: "text-xs text-fg-subtle",
  },
});

export const docStyles = tv({
  slots: {
    prose: "doc-prose",
    title: "text-4xl font-bold tracking-tight text-fg",
    lead: "mt-3 text-lg leading-relaxed text-fg-muted",
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
      1: "mt-2 mb-4 text-3xl",
      2: "mt-12 mb-3 text-2xl font-semibold border-b border-border/60 pb-2 dark:border-white/10",
      3: "mt-8 mb-2 text-xl font-semibold",
      4: "mt-6 mb-2 text-lg font-medium",
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

export const docPagerStyles = tv({
  slots: {
    root: "not-prose mt-12 flex flex-col gap-3 border-t border-border/80 pt-8 sm:flex-row sm:items-stretch sm:justify-between sm:gap-4 dark:border-white/10",
    cell: "min-w-0 sm:max-w-[min(100%,17.5rem)]",
    cellNext: "sm:ml-auto",
    link: [
      "group flex w-full items-center gap-3 rounded-2xl border border-border/80 bg-surface-elevated/70 px-4 py-3.5",
      "no-underline shadow-sm transition duration-200",
      "hover:border-echo-500/40 hover:bg-echo-50/40 hover:shadow-md",
      "active:scale-[0.99] dark:border-white/10 dark:bg-surface-elevated/40",
      "dark:hover:border-echo-500/35 dark:hover:bg-echo-950/35",
    ].join(" "),
    linkNext: "sm:flex-row-reverse sm:text-right",
    icon: [
      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
      "border border-echo-500/20 bg-echo-500/10 text-echo-700",
      "transition group-hover:border-echo-500/35 group-hover:bg-echo-500/20 group-hover:text-echo-800",
      "dark:text-echo-300 dark:group-hover:text-echo-200",
    ].join(" "),
    body: "flex min-w-0 flex-1 flex-col gap-0.5",
    label: "text-[11px] font-bold uppercase tracking-[0.14em] text-fg-subtle",
    title: "truncate text-[15px] font-semibold leading-snug text-fg group-hover:text-echo-800 dark:group-hover:text-echo-200",
    meta: "truncate text-xs text-fg-muted",
  },
});
