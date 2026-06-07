import { tv } from 'tailwind-variants'

export const homeArchitectureStyles = tv({
  slots: {
    shell: [
      'relative overflow-hidden rounded-2xl border border-border/80 p-3 sm:p-4',
      'bg-gradient-to-br from-surface-elevated via-surface-elevated/90 to-echo-50/15',
      'shadow-lg shadow-black/5 ring-1 ring-black/[0.04]',
      'dark:border-white/10 dark:from-surface-elevated/90 dark:via-surface-elevated/60 dark:to-echo-950/20 dark:ring-white/[0.06]',
    ].join(' '),
    shellGlow:
      'pointer-events-none absolute -left-16 top-0 h-40 w-40 rounded-full bg-echo-400/10 blur-3xl dark:bg-echo-500/10',
    shellGlowRight:
      'pointer-events-none absolute -right-12 bottom-0 h-36 w-36 rounded-full bg-echo-500/10 blur-3xl dark:bg-echo-500/15',
    layerStrip: [
      'relative mb-4 overflow-hidden rounded-2xl border border-border/70',
      'bg-gradient-to-b from-surface/90 to-surface-elevated/60 p-4 sm:p-5',
      'dark:border-white/10 dark:from-surface-elevated/70 dark:to-surface-elevated/30',
    ].join(' '),
    layerStripGlow:
      'pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-echo-500/8 to-transparent dark:from-echo-500/12',
    layerRow:
      'relative flex w-full items-stretch gap-1 overflow-x-auto pb-0.5 sm:gap-1.5 sm:overflow-visible sm:pb-0',
    layerArrow:
      'flex shrink-0 items-center self-center px-0.5 text-base font-semibold text-echo-600 sm:text-lg dark:text-echo-400',
    layerCell: [
      'flex min-w-[4.75rem] flex-1 shrink-0 flex-col items-center justify-center rounded-xl border px-2 py-3 text-center sm:min-w-0 sm:shrink sm:px-3 sm:py-4',
      'transition duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-echo-500/10',
    ].join(' '),
    layerName: 'font-mono text-sm font-bold leading-none sm:text-base',
    layerHint:
      'mt-2 text-[9px] font-semibold uppercase leading-tight tracking-wide opacity-75 sm:text-[10px]',
    layerFooter:
      'relative mt-4 flex flex-col gap-2 border-t border-border/60 pt-3 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.06]',
    layerCaption:
      'text-[10px] font-semibold uppercase tracking-[0.14em] text-fg-subtle sm:text-[11px]',
    topLink:
      'inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-echo-500/25 bg-echo-50/50 px-3 py-1.5 text-xs font-semibold text-echo-700 transition hover:border-echo-500/40 hover:bg-echo-100/60 hover:gap-2 dark:border-echo-500/30 dark:bg-echo-950/40 dark:text-echo-300 dark:hover:bg-echo-950/60',
    editor:
      'overflow-hidden rounded-xl border border-border/80 bg-code-bg shadow-xl ring-1 ring-black/10 dark:border-white/10 dark:ring-white/10',
    editorTabs:
      'flex gap-1 overflow-x-auto border-b border-white/10 bg-black/40 px-2.5 py-1.5',
    editorTab: [
      'shrink-0 rounded-md px-2.5 py-1 text-left transition',
      'text-[11px] font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200',
    ].join(' '),
    editorTabActive: 'bg-white/10 text-slate-100 ring-1 ring-white/10',
    editorChrome:
      'flex items-center gap-2.5 border-b border-white/10 bg-black/50 px-3 py-2',
    editorDots: 'flex gap-1.5',
    editorTitle: 'min-w-0 flex-1 truncate font-mono text-[11px] text-slate-400',
    editorBadge:
      'shrink-0 rounded-md bg-white/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-400',
    editorBody:
      'p-0 [&_.group]:my-0 [&_.group]:rounded-none [&_.group]:border-0',
    editorFoot:
      'border-t border-white/10 bg-black/30 px-3 py-2 text-[10px] leading-snug text-slate-500',
    advantages: 'mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4',
    advantageCard: [
      'group flex flex-col rounded-xl border border-border/70 bg-surface/80 p-3 no-underline',
      'transition hover:border-echo-500/35 hover:bg-echo-50/40 dark:border-white/10 dark:bg-surface-elevated/40 dark:hover:bg-echo-950/30',
    ].join(' '),
    advantageIcon:
      'inline-flex w-fit rounded bg-echo-500/15 px-1.5 py-0.5 text-[10px] font-bold tabular-nums tracking-widest text-echo-800 dark:bg-echo-500/20 dark:text-echo-300',
    advantageTitle:
      'mt-2 text-xs font-semibold leading-snug text-fg group-hover:text-echo-800 dark:group-hover:text-echo-100',
    advantageSummary: 'mt-1 line-clamp-2 text-[11px] leading-snug text-fg-muted',
  },
  variants: {
    emphasis: {
      default: {
        layerCell:
          'border-border bg-surface-elevated/95 text-fg dark:border-white/10 dark:bg-surface-elevated/80',
      },
      foundation: {
        layerCell:
          'border-echo-500/40 bg-echo-50 text-echo-900 ring-1 ring-echo-500/20 shadow-sm shadow-echo-500/10 dark:border-echo-500/40 dark:bg-echo-950/55 dark:text-echo-100 dark:ring-echo-500/25 dark:shadow-echo-500/5',
      },
    },
  },
  defaultVariants: { emphasis: 'default' },
})
