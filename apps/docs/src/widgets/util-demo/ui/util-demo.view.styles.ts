import { tv } from 'tailwind-variants'

export const utilDemoStyles = tv({
  slots: {
    root: 'my-6 overflow-hidden rounded-xl border border-border/80 bg-surface-muted/30 dark:border-white/10',
    panel: 'p-5',
    header: 'mb-4 flex flex-col gap-1',
    title: 'text-sm font-semibold text-fg',
    hint: 'text-xs leading-relaxed text-fg-muted',
    code: 'rounded bg-surface px-1.5 py-0.5 font-mono text-[11px] text-echo-700 dark:text-echo-300',
    form: 'flex flex-col gap-3',
    row2: 'grid gap-3 sm:grid-cols-2',
    field: 'flex flex-col gap-1.5 text-sm text-fg-muted',
    input:
      'rounded-lg border border-border/80 bg-surface px-3 py-2 text-sm text-fg outline-none ring-echo-500/30 focus:border-echo-500 focus:ring-2 dark:border-white/10',
    textarea:
      'min-h-[100px] resize-y rounded-lg border border-border/80 bg-surface px-3 py-2 text-sm text-fg outline-none ring-echo-500/30 focus:border-echo-500 focus:ring-2 dark:border-white/10',
    actions: 'mt-1 flex justify-end gap-2',
    btnPrimary:
      'rounded-lg bg-echo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-echo-700',
    btnOutline:
      'rounded-lg border border-border/80 bg-surface px-3 py-1.5 text-sm text-fg hover:bg-surface-muted dark:border-white/10',
    placeholder:
      'rounded-xl border border-dashed border-border/80 px-4 py-8 text-center text-sm text-fg-muted dark:border-white/10',
  },
})
