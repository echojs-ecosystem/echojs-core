import { tv } from 'tailwind-variants'

export const searchStyles = tv({
  slots: {
    root: 'relative w-full max-w-md',
    mobileTrigger:
      'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-fg-muted transition hover:border-echo-500/30 hover:bg-echo-50/80 hover:text-fg md:hidden dark:border-white/10 dark:hover:bg-echo-950/50',
    mobileOverlay: 'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden',
    mobilePanel: 'fixed inset-x-4 top-20 z-50 md:static md:inset-auto',
    input:
      'w-full rounded-xl border border-border bg-surface-muted px-4 py-2 text-sm outline-none transition focus:border-echo-500/50 focus:ring-2 focus:ring-echo-500/15',
    dropdown:
      'absolute top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-surface shadow-xl',
    list: 'max-h-80 overflow-y-auto py-2',
    item: 'block px-4 py-2 hover:bg-surface-muted',
    itemTitle: 'text-sm font-medium',
    itemMeta: 'text-xs text-fg-subtle',
  },
})
