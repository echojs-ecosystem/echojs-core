import { tv } from "tailwind-variants";

export const searchStyles = tv({
  slots: {
    root: "relative w-full max-w-md",
    input:
      "w-full rounded-xl border border-border bg-surface-muted px-4 py-2 text-sm outline-none transition focus:border-echo-500/50 focus:ring-2 focus:ring-echo-500/15",
    dropdown:
      "absolute top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-surface shadow-xl",
    list: "max-h-80 overflow-y-auto py-2",
    item: "block px-4 py-2 hover:bg-surface-muted",
    itemTitle: "text-sm font-medium",
    itemMeta: "text-xs text-fg-subtle",
  },
});
