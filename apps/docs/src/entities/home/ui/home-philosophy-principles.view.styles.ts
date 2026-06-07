import { tv } from 'tailwind-variants'

export const homePhilosophyStyles = tv({
  slots: {
    philosophyBridge:
      'mb-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left',
    philosophyBridgeText: 'max-w-xl text-sm leading-relaxed text-fg-muted',
    philosophyBridgeLink:
      'inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-echo-600 transition hover:gap-3 dark:text-echo-400',
    philosophyGrid: 'grid gap-4 sm:grid-cols-3',
    philosophyCardNumber:
      'inline-flex w-fit rounded-md bg-echo-500/15 px-2 py-0.5 text-[11px] font-bold tabular-nums tracking-widest text-echo-800 dark:bg-echo-500/20 dark:text-echo-300',
    philosophyCardTitle:
      'mt-2 text-base font-semibold text-fg group-hover:text-echo-800 dark:group-hover:text-echo-100',
    philosophyCardSummary: 'mt-2 flex-1 text-sm leading-relaxed text-fg-muted',
    philosophyCardExample:
      'mt-4 rounded-lg border border-border/70 bg-surface-muted/80 px-3 py-2 font-mono text-[11px] leading-relaxed text-fg-muted dark:border-white/10 dark:bg-code-bg/40 dark:text-fg-subtle',
    philosophyCardLink:
      'mt-4 inline-flex items-center gap-1 text-xs font-semibold text-echo-600 opacity-0 transition group-hover:opacity-100 dark:text-echo-400',
    philosophyCardGlow: 'hidden',
  },
})

export const philosophyCardStyles = tv({
  base: [
    'group relative flex flex-col overflow-hidden rounded-2xl border p-5 no-underline',
    'transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-echo-500/15',
    'dark:border-white/10 dark:bg-surface-elevated/50 dark:hover:border-echo-500/30 dark:hover:shadow-echo-500/5',
  ].join(' '),
  variants: {
    tone: {
      honey: 'border-border/80 bg-surface-elevated hover:border-echo-500/25',
      wheat: 'border-border/80 bg-surface-elevated hover:border-echo-500/25',
      sand: 'border-border/80 bg-surface-elevated hover:border-echo-500/25',
    },
  },
  defaultVariants: { tone: 'honey' },
})
