import { tv } from "tailwind-variants";

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
