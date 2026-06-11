import { tv } from 'tailwind-variants'

export const ecosystemPackageCompactStyles = tv({
  slots: {
    root: [
      'group relative flex h-full flex-col rounded-2xl border border-border/60 p-4',
      'bg-surface-elevated transition duration-200',
      'hover:border-echo-500/30 hover:shadow-md hover:shadow-black/5',
      'dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:border-echo-500/25 dark:hover:bg-white/[0.03]',
    ].join(' '),
    header: 'flex items-start justify-between gap-3',
    icon: 'flex h-7 w-7 shrink-0 items-center justify-center text-echo-700 dark:text-echo-300',
    iconGlyph: 'h-4 w-4',
    copy: 'mt-3 min-w-0 flex-1',
    name: 'truncate font-mono text-sm font-semibold tracking-tight text-fg',
    description: 'mt-1.5 line-clamp-2 text-xs leading-relaxed text-fg-muted',
    status: [
      'shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold leading-none',
    ].join(' '),
  },
  variants: {
    tone: {
      green: {
        status: [
          'border-emerald-500/30 bg-emerald-500/10 text-emerald-700',
          'dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-400',
        ].join(' '),
      },
      yellow: {
        status: [
          'border-amber-500/35 bg-amber-500/10 text-amber-700',
          'dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400',
        ].join(' '),
      },
      red: {
        status: [
          'border-red-500/30 bg-red-500/10 text-red-700',
          'dark:border-red-500/25 dark:bg-red-500/10 dark:text-red-400',
        ].join(' '),
      },
    },
  },
})
