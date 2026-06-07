import { tv } from 'tailwind-variants'

export const homeCtaStyles = tv({
  slots: {
    cta: [
      'relative overflow-hidden rounded-2xl border border-border/80 p-4 sm:p-5',
      'bg-gradient-to-br from-surface-elevated via-surface-elevated/95 to-echo-50/20',
      'shadow-lg shadow-black/5 ring-1 ring-black/[0.04]',
      'dark:border-white/10 dark:from-surface-elevated/90 dark:via-surface-elevated/70 dark:to-echo-950/25 dark:ring-white/[0.06]',
    ].join(' '),
    ctaGlow:
      'pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-echo-500/12 blur-3xl dark:bg-echo-500/15',
    ctaMesh:
      'pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,color-mix(in_srgb,var(--color-echo-500)_14%,transparent),transparent_50%)]',
    ctaTop:
      'relative mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6',
    ctaCopy: 'min-w-0',
    ctaEyebrow:
      'text-[11px] font-bold uppercase tracking-[0.18em] text-echo-700 dark:text-echo-400',
    ctaTitle: 'mt-2 text-2xl font-bold tracking-tight text-fg sm:text-[1.75rem]',
    ctaBody: 'mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted',
    ctaBodyEm: 'font-medium text-fg',
    ctaActions: 'flex shrink-0 flex-wrap items-center gap-2.5',
    ctaInstallWrap: [
      'relative overflow-hidden rounded-xl border border-white/10 bg-code-bg',
      'shadow-xl shadow-black/20 ring-1 ring-white/[0.06]',
    ].join(' '),
    ctaFooter:
      'relative mt-4 flex flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.06]',
    ctaSteps: 'flex flex-wrap items-center gap-1.5 sm:gap-2',
    ctaStep: [
      'inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-surface/80 px-2.5 py-1.5',
      'text-[11px] font-medium text-fg-muted dark:border-white/10 dark:bg-surface-elevated/50',
    ].join(' '),
    ctaStepNum:
      'flex h-4 w-4 items-center justify-center rounded-full bg-echo-500/15 text-[9px] font-bold text-echo-700 dark:bg-echo-500/20 dark:text-echo-300',
    ctaStepArrow: 'text-[10px] font-semibold text-echo-600/70 dark:text-echo-400/70',
    ctaFooterHint: 'text-[11px] text-fg-subtle',
  },
})
