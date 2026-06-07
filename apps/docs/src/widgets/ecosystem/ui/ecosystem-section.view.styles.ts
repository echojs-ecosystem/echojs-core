import { tv } from 'tailwind-variants'

export const ecosystemFeaturedPackageStyles = tv({
  slots: {
    root: [
      'group relative overflow-hidden rounded-2xl border border-echo-500/30 p-1',
      'bg-gradient-to-br from-echo-50/70 via-surface-elevated/40 to-transparent',
      'transition duration-300 hover:border-echo-500/45 hover:shadow-lg hover:shadow-echo-500/10',
      'dark:border-echo-500/25 dark:from-echo-950/45 dark:via-echo-950/20 dark:hover:border-echo-500/40',
    ].join(' '),
    glow: 'pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-echo-400/15 blur-3xl transition group-hover:bg-echo-400/25 dark:bg-echo-500/10',
    inner: [
      'relative flex flex-col gap-5 rounded-xl bg-surface-elevated/90 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6',
      'ring-1 ring-echo-500/15 dark:bg-surface-elevated/50 dark:ring-echo-500/20',
    ].join(' '),
    iconWrap:
      'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-echo-100 to-echo-50 text-2xl text-echo-800 ring-1 ring-echo-500/25 dark:from-echo-950/80 dark:to-echo-900/50 dark:text-echo-200 dark:ring-echo-500/35',
    copy: 'min-w-0 flex-1',
    eyebrow: 'inline-flex items-center gap-2',
    badge:
      'rounded-md bg-echo-600 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-white dark:bg-echo-500',
    label:
      'text-[11px] font-semibold uppercase tracking-[0.14em] text-echo-800 dark:text-echo-300',
    name: 'mt-2 font-mono text-base font-bold text-fg sm:text-lg',
    description: 'mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted',
    actions: 'flex shrink-0 flex-col items-start gap-2 sm:items-end',
    link: [
      'inline-flex items-center gap-1.5 rounded-xl border border-echo-500/30 bg-echo-50/80 px-4 py-2.5',
      'text-sm font-semibold text-echo-800 transition hover:border-echo-500/45 hover:bg-echo-100/90 hover:gap-2',
      'dark:border-echo-500/35 dark:bg-echo-950/50 dark:text-echo-200 dark:hover:bg-echo-950/70',
    ].join(' '),
    linkArrow: 'text-echo-600 dark:text-echo-400',
  },
})

export const ecosystemSectionStyles = tv({
  slots: {
    root: 'flex flex-col gap-6',
    divider:
      'border-t border-border/70 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-fg-subtle dark:border-white/10',
    grid: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  },
})
