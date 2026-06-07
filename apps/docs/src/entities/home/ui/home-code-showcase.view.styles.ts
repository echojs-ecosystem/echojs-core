import { tv } from 'tailwind-variants'

export const homeCodeShowcaseStyles = tv({
  slots: {
    sectionEyebrow:
      'mb-4 inline-flex items-center rounded-full border border-echo-500/25 bg-echo-500/12 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-echo-800 dark:border-echo-500/30 dark:bg-echo-500/10 dark:text-echo-400',
    codeShowcase:
      'relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-surface-elevated via-surface-elevated/90 to-echo-50/15 p-4 shadow-xl shadow-black/5 ring-1 ring-black/[0.04] sm:p-5 dark:border-white/10 dark:from-surface-elevated/90 dark:via-surface-elevated/60 dark:to-echo-950/20 dark:ring-white/[0.06]',
    codeShowcaseGlow:
      'pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-echo-500/10 blur-3xl dark:bg-echo-500/15',
    codeShowcaseGrid:
      'relative grid gap-5 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-6',
    codeTabRail:
      'flex flex-row gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0',
    codeTabBtn: [
      'flex min-w-[9.5rem] shrink-0 flex-col rounded-xl border border-transparent px-3 py-2.5 text-left transition',
      'hover:border-border/80 hover:bg-surface/80 dark:hover:border-white/10 dark:hover:bg-surface-elevated/80',
    ].join(' '),
    codeTabBtnActive: [
      'border-echo-500/30 bg-echo-50/80 shadow-sm ring-1 ring-echo-500/15',
      'dark:border-echo-500/35 dark:bg-echo-950/40 dark:ring-echo-500/20',
    ].join(' '),
    codeTabLayer:
      'text-[10px] font-semibold uppercase tracking-wider text-fg-subtle',
    codeTabLabel: 'mt-0.5 truncate font-mono text-xs font-medium text-fg',
    codeTabIcon: 'mb-1 text-base leading-none',
    codeDetail: 'hidden min-w-0 lg:block lg:pt-1',
    codeDetailTitle: 'text-lg font-semibold text-fg',
    codeDetailBody: 'mt-2 text-sm leading-relaxed text-fg-muted',
    codeDetailList: 'mt-4 space-y-2.5',
    codeDetailItem: 'flex gap-2.5 text-sm text-fg-muted',
    codeDetailBullet:
      'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-echo-500/15 text-[10px] font-bold text-echo-700 dark:bg-echo-500/20 dark:text-echo-300',
    codeEditor:
      'min-w-0 overflow-hidden rounded-2xl border border-border/80 bg-code-bg shadow-2xl ring-1 ring-black/10 dark:border-white/10 dark:ring-white/10',
    codeEditorChrome:
      'flex items-center gap-3 border-b border-white/10 bg-black/50 px-4 py-2.5',
    codeEditorDots: 'flex gap-1.5',
    codeEditorTitle: 'min-w-0 flex-1 truncate font-mono text-xs text-slate-400',
    codeEditorBadge:
      'shrink-0 rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400',
    codeEditorBody:
      'p-0 [&_.group]:my-0 [&_.group]:rounded-none [&_.group]:border-0',
    codeEditorFoot:
      'border-t border-white/10 bg-black/30 px-4 py-2 text-[11px] text-slate-500',
  },
})
