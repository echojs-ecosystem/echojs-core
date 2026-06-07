import { tv } from 'tailwind-variants'

export const homeFooterStyles = tv({
  slots: {
    root: 'mt-8 border-t border-border/80 py-12',
    inner: 'flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between',
    brand: 'max-w-xs',
    brandName: 'text-lg font-bold text-fg',
    brandTag: 'mt-2 text-sm text-fg-muted',
    links: 'flex flex-wrap gap-x-8 gap-y-3',
    link: 'text-sm font-medium text-fg-muted transition hover:text-echo-600 dark:hover:text-echo-400',
    bottom:
      'mt-10 flex flex-col gap-2 border-t border-border/60 pt-8 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between',
  },
})
