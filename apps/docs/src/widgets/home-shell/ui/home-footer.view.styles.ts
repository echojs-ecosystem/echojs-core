import { tv } from 'tailwind-variants'

export const homeFooterStyles = tv({
  slots: {
    root: 'mt-16 border-t border-border/80 bg-surface-muted/30 dark:bg-surface-muted/20',
    inner:
      'mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-14 sm:px-8 lg:flex-row lg:justify-between',
    brand: 'max-w-xs shrink-0',
    brandName: 'text-lg font-bold tracking-tight text-fg',
    brandTag: 'mt-2 text-sm leading-relaxed text-fg-muted',
    columns: 'grid flex-1 gap-10 sm:grid-cols-3 sm:gap-8',
    column: 'min-w-0',
    columnTitle:
      'text-xs font-semibold uppercase tracking-wider text-fg-subtle',
    columnList: 'mt-4 space-y-2.5',
    columnLink:
      'text-sm text-fg-muted transition hover:text-echo-600 dark:hover:text-echo-400',
    bottom:
      'mx-auto flex w-full max-w-7xl flex-col gap-2 border-t border-border/60 px-4 py-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8',
    bottomNote: 'text-fg-subtle',
  },
})
