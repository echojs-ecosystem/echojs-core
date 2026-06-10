import { tv } from 'tailwind-variants'

export const ecosystemPackageCompactStyles = tv({
  slots: {
    root: [
      'group flex flex-col rounded-xl border border-border/70 bg-surface-elevated p-3',
      'transition duration-200 hover:border-echo-500/35 hover:bg-echo-50/40 hover:shadow-sm',
      'dark:border-white/[0.07] dark:bg-white/[0.02] dark:hover:border-echo-500/35 dark:hover:bg-echo-950/30',
    ].join(' '),
    head: 'flex items-center gap-2',
    icon: [
      'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-echo-50 text-base',
      'text-echo-800 ring-1 ring-echo-500/20 dark:bg-echo-950/60 dark:text-echo-200 dark:ring-echo-500/30',
    ].join(' '),
    name: 'min-w-0 truncate font-mono text-xs font-bold text-fg',
    description: 'mt-1.5 line-clamp-2 text-[10px] leading-snug text-fg-muted',
    arrow:
      'ml-auto shrink-0 text-[10px] text-echo-600 opacity-0 transition group-hover:opacity-100 dark:text-echo-400',
  },
})
