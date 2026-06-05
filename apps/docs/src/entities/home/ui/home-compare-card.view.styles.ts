import { tv } from "tailwind-variants";

export const compareCardStyles = tv({
  slots: {
    root: "rounded-2xl border p-6 transition duration-300",
    title: "text-sm font-semibold uppercase tracking-wider",
    list: "mt-5 space-y-3",
    item: "flex items-start gap-2 text-sm leading-relaxed",
    bullet: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
  },
  variants: {
    tone: {
      muted: {
        root: "border-border/80 bg-surface-elevated dark:border-white/10 dark:bg-surface-elevated/60",
        title: "text-fg-subtle",
        item: "text-fg-muted",
        bullet: "bg-fg-subtle",
      },
      accent: {
        root: "border-echo-500/40 bg-gradient-to-br from-echo-100/90 via-echo-50/50 to-surface-elevated shadow-md shadow-echo-500/15 ring-1 ring-echo-500/25 dark:border-echo-500/35 dark:from-echo-950/40 dark:via-surface-elevated/80 dark:to-surface-elevated/80 dark:ring-echo-500/25",
        title: "text-echo-700 dark:text-echo-400",
        item: "text-fg",
        bullet: "bg-echo-500",
      },
    },
  },
  defaultVariants: { tone: "muted" },
});
