import { tv } from 'tailwind-variants'

export const homeMobileNavStyles = tv({
  slots: {
    overlay:
      'fixed inset-x-0 bottom-0 top-[3.75rem] z-40 bg-black/40 backdrop-blur-[2px] sm:top-[4.25rem] lg:hidden',
    panel: [
      'fixed inset-x-0 bottom-0 top-[3.75rem] z-50 flex w-full max-w-none flex-col',
      'max-h-[calc(100dvh-3.75rem)] border-t border-border bg-surface-elevated shadow-xl',
      'sm:top-[4.25rem] sm:max-h-[calc(100dvh-4.25rem)] lg:hidden',
    ].join(' '),
    header:
      'flex items-center justify-between border-b border-border/80 px-4 py-3 dark:border-white/10',
    title: 'text-sm font-semibold text-fg',
    closeBtn:
      'rounded-lg border border-border px-2.5 py-1.5 text-sm text-fg-muted transition hover:bg-surface-muted hover:text-fg',
    links: 'echo-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-4',
    link: [
      'block rounded-lg px-3 py-2.5 text-sm font-medium text-fg-muted transition',
      'hover:bg-surface-muted/80 hover:text-fg',
    ].join(' '),
  },
})
