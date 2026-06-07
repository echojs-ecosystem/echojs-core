import { tv } from 'tailwind-variants'

export const packageOverviewStyles = tv({
  slots: {
    root: 'not-prose my-8 space-y-10',
    hero: [
      'relative overflow-hidden rounded-2xl border border-border/80',
      'bg-gradient-to-br from-echo-50/70 via-surface-elevated to-surface-elevated',
      'dark:border-white/10 dark:from-echo-950/35 dark:via-surface-elevated/90 dark:to-surface-elevated/80',
    ].join(' '),
    heroGlow:
      'pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-echo-400/18 blur-3xl dark:bg-echo-500/12',
    heroInner:
      'relative flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:gap-6 sm:p-6 lg:p-7',
    heroIconWrap: 'shrink-0',
    heroIcon:
      'flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-echo-100 to-echo-50 text-xl ring-1 ring-echo-500/25 sm:h-14 sm:w-14 sm:rounded-2xl sm:text-2xl dark:from-echo-950 dark:to-echo-900/60 dark:ring-echo-500/35',
    heroContent: 'min-w-0 flex-1',
    heroEyebrow:
      'font-mono text-xs font-medium text-echo-700 dark:text-echo-300',
    heroHeadline:
      'mt-1.5 text-xl font-semibold leading-snug tracking-tight text-fg sm:text-2xl',
    heroSummary:
      'mt-2.5 max-w-2xl text-sm leading-relaxed text-fg-muted sm:text-[15px]',
    pillRow: 'mt-4 flex flex-wrap gap-2',
    pill: 'rounded-full border border-echo-500/25 bg-echo-50/80 px-3 py-1 text-xs font-medium text-echo-800 dark:bg-echo-950/50 dark:text-echo-200',
    sectionTitle:
      'text-sm font-bold uppercase tracking-[0.14em] text-fg-subtle',
    pillarGrid:
      'mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 [&>*]:min-h-[8.5rem]',
    section: 'space-y-4',
    twoCol: 'mt-4 grid gap-4 md:grid-cols-2',
    list: 'mt-3 space-y-2 text-sm text-fg-muted',
    listItem: 'flex gap-2 leading-relaxed',
    listBullet: 'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-echo-500',
    learnGrid: 'mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3',
    learnCard: [
      'group flex flex-col rounded-xl border border-border/80 bg-surface-elevated/80 p-4 transition',
      'hover:-translate-y-0.5 hover:border-echo-500/30 hover:shadow-md dark:border-white/10',
    ].join(' '),
    learnTitle: 'font-semibold text-fg',
    learnDesc: 'mt-1 flex-1 text-xs leading-relaxed text-fg-muted',
    learnLink:
      'mt-3 inline-flex items-center gap-1 text-xs font-semibold text-echo-700 transition group-hover:gap-2 dark:text-echo-300',
    relatedGrid: 'mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3',
    lifecycleGrid: 'mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4',
    lifecycleCard:
      'rounded-xl border border-border/80 bg-surface-elevated/80 p-4 dark:border-white/10',
    lifecycleStep:
      'mb-2 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-echo-100 text-xs font-bold text-echo-800 dark:bg-echo-950 dark:text-echo-200',
    lifecycleTitle: 'mt-1 text-sm font-semibold text-fg',
    lifecycleBody: 'mt-1.5 text-xs leading-relaxed text-fg-muted',
    whyGrid: 'mt-4 grid gap-4 sm:grid-cols-2',
    whyCard:
      'rounded-xl border border-border/80 bg-surface-elevated/80 p-5 dark:border-white/10',
    whyCardIcon: 'text-lg font-semibold text-echo-700 dark:text-echo-300',
    whyCardTitle: 'mt-3 text-base font-semibold text-fg',
    whyCardBody: 'mt-2 text-sm leading-relaxed text-fg-muted',
    codeSection:
      'mt-4 overflow-hidden rounded-xl border border-border/80 dark:border-white/10',
    codeSectionTitle:
      'border-b border-border/80 bg-surface-muted/50 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-fg-subtle dark:border-white/10',
    heroTitle:
      'mt-2 text-2xl font-bold leading-tight tracking-tight text-fg sm:text-3xl lg:text-[2rem]',
    importPathsLink:
      'mt-3 inline-flex text-xs font-medium text-echo-700 underline-offset-2 transition hover:text-echo-800 hover:underline dark:text-echo-300 dark:hover:text-echo-200',
    heroFeaturedBanner: [
      'mb-3 inline-flex items-center gap-1.5 rounded-full border border-echo-500/30',
      'bg-echo-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-echo-800',
      'dark:border-echo-500/35 dark:bg-echo-950/60 dark:text-echo-200',
    ].join(' '),
  },
})

export const featureCardStyles = tv({
  slots: {
    root: [
      'group relative overflow-hidden rounded-2xl border border-border/80 bg-surface-elevated p-6',
      'transition duration-300 hover:-translate-y-1 hover:border-echo-500/25 hover:shadow-lg hover:shadow-black/5',
      'dark:border-white/10 dark:bg-surface-elevated/80 dark:hover:border-echo-500/30',
    ].join(' '),
    iconWrap:
      'mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-echo-50 text-lg font-semibold text-echo-700 ring-1 ring-echo-500/20 dark:bg-echo-950/80 dark:text-echo-300 dark:ring-echo-500/30',
    title: 'text-lg font-semibold text-fg',
    body: 'mt-2 text-sm leading-relaxed text-fg-muted',
    shine: 'hidden',
  },
})
