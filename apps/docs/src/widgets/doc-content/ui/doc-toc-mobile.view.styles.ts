import { tv } from "tailwind-variants";

export const docTocMobileStyles = tv({
  slots: {
    root: "mb-6 xl:hidden",
    toggle: [
      "flex w-full items-center justify-between gap-3 rounded-xl border border-border/80",
      "bg-surface-elevated/70 px-4 py-3 text-left text-sm font-medium text-fg",
      "transition hover:border-echo-500/30 hover:bg-surface-muted/60",
      "dark:border-white/10 dark:bg-surface-elevated/40",
    ].join(" "),
    toggleLabel: "text-[11px] font-bold uppercase tracking-[0.14em] text-fg-subtle",
    toggleChevron: "text-xs text-fg-subtle transition-transform duration-200",
    toggleChevronOpen: "rotate-180",
    panel: "mt-3 rounded-2xl border border-border/80 bg-surface-elevated/60 p-4 dark:border-white/10 dark:bg-surface-elevated/40",
    list: "flex flex-col gap-1 border-l border-border/80 pl-4 dark:border-white/10",
    link: "block break-words rounded-md py-1.5 pl-2.5 text-[13px] leading-snug text-fg-muted transition hover:bg-echo-50/80 hover:text-echo-800 dark:hover:bg-echo-950/40 dark:hover:text-echo-200",
    linkDepth3: "pl-4 text-[12px]",
  },
});
