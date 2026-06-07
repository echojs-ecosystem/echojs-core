import { tv } from 'tailwind-variants'

export const homeTestingStyles = tv({
  slots: {
    shell: [
      'relative overflow-hidden rounded-3xl border border-border/80 p-4 sm:p-6',
      'bg-gradient-to-br from-surface-elevated via-surface-elevated/90 to-echo-50/15',
      'shadow-xl shadow-black/5 ring-1 ring-black/[0.04]',
      'dark:border-white/10 dark:from-surface-elevated/90 dark:via-surface-elevated/60 dark:to-echo-950/20 dark:ring-white/[0.06]',
    ].join(' '),
    shellGlow:
      'pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-echo-400/10 blur-3xl dark:bg-echo-500/10',
    shellGlowRight:
      'pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-echo-500/10 blur-3xl dark:bg-echo-500/15',
    bridge:
      'relative mb-8 flex flex-col items-start gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.06]',
    bridgeText: 'max-w-2xl text-sm leading-relaxed text-fg-muted',
    bridgeLink:
      'inline-flex shrink-0 items-center gap-2 rounded-xl border border-echo-500/30 bg-echo-50/70 px-4 py-2 text-sm font-semibold text-echo-800 transition hover:border-echo-500/45 hover:bg-echo-100/80 hover:gap-2.5 dark:border-echo-500/35 dark:bg-echo-950/45 dark:text-echo-200 dark:hover:bg-echo-950/65',
    grid: 'relative grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10',
    leftCol: 'min-w-0',
    pills: 'mb-5 flex flex-wrap gap-2',
    pill: [
      'rounded-full border border-echo-500/25 bg-echo-50/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-echo-800',
      'dark:border-echo-500/30 dark:bg-echo-950/45 dark:text-echo-200',
    ].join(' '),
    advantages: 'grid gap-3 sm:grid-cols-2',
    advantageCard: [
      'group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-surface/80 p-4 no-underline',
      'transition duration-300 hover:-translate-y-0.5 hover:border-echo-500/35 hover:bg-echo-50/40 hover:shadow-md hover:shadow-echo-500/10',
      'dark:border-white/10 dark:bg-surface-elevated/40 dark:hover:border-echo-500/40 dark:hover:bg-echo-950/30',
    ].join(' '),
    advantageTopLine:
      'pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-echo-500/40 to-transparent opacity-0 transition group-hover:opacity-100',
    advantageHead: 'flex items-start gap-3',
    advantageIcon:
      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-echo-50 text-base ring-1 ring-echo-500/20 dark:bg-echo-950/60 dark:ring-echo-500/30',
    advantageTitle:
      'text-sm font-semibold leading-snug text-fg group-hover:text-echo-800 dark:group-hover:text-echo-100',
    advantageSummary: 'mt-2 text-xs leading-relaxed text-fg-muted',
    advantageHighlight:
      'mt-3 rounded-lg border border-echo-500/15 bg-echo-50/50 px-2.5 py-2 text-[11px] font-medium leading-relaxed text-echo-900 dark:border-echo-500/20 dark:bg-echo-950/35 dark:text-echo-200',
    advantageLink:
      'mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-echo-600 opacity-0 transition group-hover:opacity-100 dark:text-echo-400',
    rightCol: 'min-w-0',
    pipeline:
      'mb-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-2xl border border-echo-500/20 bg-echo-50/40 p-3 dark:border-echo-500/25 dark:bg-echo-950/30',
    pipelineNode:
      'rounded-xl border border-border/70 bg-surface-elevated/95 px-3 py-3 text-center dark:border-white/10 dark:bg-surface-elevated/80',
    pipelineNodePrimary:
      'border-echo-500/30 bg-echo-50/80 ring-1 ring-echo-500/15 dark:border-echo-500/35 dark:bg-echo-950/50 dark:ring-echo-500/20',
    pipelineLabel: 'font-mono text-xs font-semibold text-fg',
    pipelineHint:
      'mt-1 text-[10px] font-medium uppercase tracking-wider text-fg-subtle',
    pipelineArrow: 'text-lg font-semibold text-echo-600 dark:text-echo-400',
    editor:
      'overflow-hidden rounded-2xl border border-border/80 bg-code-bg shadow-2xl ring-1 ring-black/10 dark:border-white/10 dark:ring-white/10',
    editorTabs:
      'flex gap-1 overflow-x-auto border-b border-white/10 bg-black/40 px-3 py-2',
    editorTab: [
      'shrink-0 rounded-lg px-3 py-1.5 text-left transition',
      'text-[11px] font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200',
    ].join(' '),
    editorTabActive: 'bg-white/10 text-slate-100 ring-1 ring-white/10',
    editorChrome:
      'flex items-center gap-3 border-b border-white/10 bg-black/50 px-4 py-2.5',
    editorDots: 'flex gap-1.5',
    editorDot: 'h-2.5 w-2.5 rounded-full',
    editorTitle: 'min-w-0 flex-1 truncate font-mono text-xs text-slate-400',
    editorBadge:
      'shrink-0 rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400',
    editorBody:
      'p-0 [&_.group]:my-0 [&_.group]:rounded-none [&_.group]:border-0',
    editorFoot:
      'border-t border-white/10 bg-black/30 px-4 py-2.5 text-[11px] text-slate-500',
  },
})
