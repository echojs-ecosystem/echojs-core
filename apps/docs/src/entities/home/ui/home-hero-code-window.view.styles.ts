import { tv } from "tailwind-variants";

export const homeHeroCodeWindowStyles = tv({
  slots: {
    codeWindow:
      "overflow-hidden rounded-2xl border border-border/80 bg-surface-elevated shadow-xl shadow-black/8 ring-1 ring-black/[0.04] dark:border-white/10 dark:bg-surface-elevated dark:shadow-black/50 dark:ring-echo-500/15",
    codeWindowChrome:
      "flex items-center gap-2 border-b border-border/80 bg-surface-muted/80 px-4 py-3 dark:border-white/10 dark:bg-black/20",
    codeDot: "h-3 w-3 rounded-full",
    codeDotRed: "bg-[#ff5f57]",
    codeDotYellow: "bg-[#febc2e]",
    codeDotGreen: "bg-[#28c840]",
    codeWindowTitle: "ml-2 font-mono text-xs text-fg-subtle",
    codeWindowBody: "[&_.doc-code]:my-0 [&_.group]:my-0 [&_.group]:rounded-none [&_.group]:border-0",
  },
});
