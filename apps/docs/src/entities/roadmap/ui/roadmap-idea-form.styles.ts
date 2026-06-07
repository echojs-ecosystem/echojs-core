import { tv } from 'tailwind-variants'

export const roadmapIdeaFormStyles = tv({
  slots: {
    section: [
      'rounded-2xl border border-border/80 bg-surface-elevated/50 p-6 sm:p-8',
      'dark:border-white/10 dark:bg-surface-elevated/30',
    ].join(' '),
    header: 'mb-6 max-w-2xl',
    title: 'text-xl font-semibold text-fg sm:text-2xl',
    lead: 'mt-2 text-sm leading-relaxed text-fg-muted',
    form: 'grid gap-5 sm:grid-cols-2',
    field: 'flex flex-col gap-1.5',
    fieldFull: 'sm:col-span-2',
    label: 'text-xs font-semibold uppercase tracking-wide text-fg-subtle',
    input: [
      'rounded-lg border border-border/80 bg-surface px-3 py-2 text-sm text-fg outline-none transition',
      'placeholder:text-fg-subtle/70 focus:border-echo-500/50 focus:ring-2 focus:ring-echo-500/15',
      'dark:border-white/10 dark:bg-surface/80',
    ].join(' '),
    textarea: 'min-h-[7rem] resize-y',
    select: 'cursor-pointer',
    error: 'text-xs text-red-600 dark:text-red-400',
    actions: 'flex flex-wrap items-center gap-3 sm:col-span-2',
    submitBtn: [
      'inline-flex items-center rounded-lg bg-echo-600 px-4 py-2 text-sm font-semibold text-white transition',
      'hover:bg-echo-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-echo-500 dark:hover:bg-echo-600',
    ].join(' '),
    resetBtn: [
      'inline-flex items-center rounded-lg border border-border/80 px-4 py-2 text-sm font-medium text-fg-muted transition',
      'hover:border-echo-500/35 hover:text-fg dark:border-white/10',
    ].join(' '),
    success: [
      'rounded-xl border border-emerald-500/30 bg-emerald-50/70 px-4 py-3 text-sm text-emerald-900',
      'dark:border-emerald-500/25 dark:bg-emerald-950/35 dark:text-emerald-100 sm:col-span-2',
    ].join(' '),
    successLink:
      'font-semibold underline underline-offset-2 hover:no-underline',
    hint: 'text-xs text-fg-subtle sm:col-span-2',
  },
})
