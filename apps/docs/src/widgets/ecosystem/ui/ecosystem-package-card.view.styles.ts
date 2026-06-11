import { tv } from 'tailwind-variants'

export const ecosystemPackageStyles = tv({
  slots: {
    root: [
      'group relative flex flex-col rounded-2xl border border-border/70 p-5 bg-surface-elevated',
      'transition duration-300 hover:-translate-y-0.5 hover:border-echo-500/30 hover:shadow-md hover:shadow-black/5',
      'dark:border-white/[0.07] dark:bg-white/[0.02] dark:hover:border-echo-500/35 dark:hover:bg-echo-950/25',
    ].join(' '),
    topLine:
      'pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-echo-500/50 to-transparent opacity-70 transition group-hover:via-echo-400/80',
    hoverWash:
      'pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-echo-500/[0.07] via-transparent to-echo-400/[0.04] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-echo-500/[0.1] dark:to-echo-600/[0.05]',
    content: 'relative z-[1] flex flex-1 flex-col',
    icon: 'mb-0 flex h-11 w-11 items-center justify-center rounded-xl bg-echo-50 text-echo-700 ring-1 ring-echo-500/20 dark:bg-echo-950/80 dark:text-echo-300 dark:ring-echo-500/30',
    iconGlyph: 'h-5 w-5',
    name: 'mt-3 font-mono text-sm font-bold text-fg',
    description: 'mt-2 flex-1 text-xs leading-relaxed text-fg-muted',
    link: 'mt-4 inline-flex items-center gap-1 bg-gradient-to-r from-echo-700 to-echo-500 bg-clip-text text-sm font-semibold text-transparent transition group-hover:gap-2 dark:from-echo-300 dark:to-echo-400',
    linkArrow: 'text-echo-600 dark:text-echo-400',
  },
})
