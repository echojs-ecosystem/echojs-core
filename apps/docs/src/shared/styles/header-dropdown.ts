import { tv } from "tailwind-variants";

export const headerDropdownStyles = tv({
  slots: {
    root: "relative hidden md:block",
    trigger: [
      "inline-flex max-w-[9.5rem] items-center gap-1.5 rounded-lg border border-border/90",
      "bg-surface-elevated/90 px-2.5 py-1.5 text-sm font-medium text-fg-muted shadow-sm",
      "transition hover:border-echo-500/35 hover:bg-surface-muted hover:text-fg",
      "dark:border-white/10 dark:bg-white/5",
    ].join(" "),
    triggerLabel: "truncate",
    chevron: "shrink-0 text-[10px] text-fg-subtle",
    panel: [
      "absolute right-0 top-full z-50 mt-2 min-w-[11rem] overflow-hidden rounded-xl",
      "border border-border bg-surface-elevated py-1 shadow-xl",
      "dark:border-white/10 dark:bg-surface-elevated",
    ].join(" "),
    option: [
      "flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm",
      "text-fg-muted transition hover:bg-surface-muted hover:text-fg",
    ].join(" "),
    optionActive:
      "bg-echo-50/90 font-medium text-echo-800 dark:bg-echo-950/45 dark:text-echo-200",
    optionDisabled: "cursor-not-allowed opacity-40 hover:bg-transparent hover:text-fg-muted",
    optionBadge: "rounded-md bg-echo-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-echo-700 dark:text-echo-300",
  },
});
