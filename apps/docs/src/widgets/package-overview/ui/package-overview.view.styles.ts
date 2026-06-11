import { tv } from 'tailwind-variants'

const cardShell = [
  'group relative overflow-hidden rounded-2xl border border-border/70',
  'bg-surface-elevated transition duration-300',
  'hover:border-echo-500/25 hover:shadow-md hover:shadow-echo-500/[0.06]',
  'dark:border-white/[0.07] dark:bg-white/[0.02]',
  'dark:hover:border-echo-500/30 dark:hover:bg-echo-950/20',
].join(' ')

const cardAccent =
  'pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-echo-500/45 to-transparent opacity-60 transition group-hover:via-echo-400/70 group-hover:opacity-100'

/** Bare icon — matches home ecosystem compact package cards. */
const iconWrapMd =
  'flex h-7 w-7 shrink-0 items-center justify-center text-echo-700 dark:text-echo-300'

const iconWrapSm =
  'flex h-6 w-6 shrink-0 items-center justify-center text-echo-700 dark:text-echo-300'

const iconWrapHero =
  'flex h-8 w-8 shrink-0 items-center justify-center text-echo-700 dark:text-echo-300'

export const packageOverviewStyles = tv({
  slots: {
    root: 'not-prose my-8 space-y-12',
    hero: [
      'relative overflow-hidden rounded-2xl border border-border/80',
      'bg-gradient-to-br from-echo-50/80 via-surface-elevated to-surface-elevated',
      'dark:border-white/10 dark:from-echo-950/40 dark:via-surface-elevated/90 dark:to-surface-elevated/80',
    ].join(' '),
    heroGlow:
      'pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-echo-400/20 blur-3xl dark:bg-echo-500/10',
    heroInner:
      'relative flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:gap-6 sm:p-6 lg:p-8',
    heroIconWrap: 'shrink-0',
    heroIcon: iconWrapHero,
    heroIconGlyph: 'h-5 w-5',
    heroContent: 'min-w-0 flex-1',
    heroEyebrow:
      'font-mono text-xs font-medium text-echo-700 dark:text-echo-300',
    heroHeadline:
      'mt-1.5 text-xl font-semibold leading-snug tracking-tight text-fg sm:text-2xl',
    heroSummary:
      'mt-2.5 max-w-2xl text-sm leading-relaxed text-fg-muted sm:text-[15px]',
    pillRow: 'mt-4 flex flex-wrap gap-2',
    pill: [
      'rounded-full border border-echo-500/20 bg-echo-50/70 px-3 py-1',
      'font-mono text-[11px] font-medium text-echo-800',
      'dark:border-echo-500/25 dark:bg-echo-950/40 dark:text-echo-200',
    ].join(' '),
    sectionTitle:
      'text-xs font-bold uppercase tracking-[0.16em] text-fg-subtle',
    sectionLead: 'mt-1.5 max-w-2xl text-sm leading-relaxed text-fg-muted',
    pillarGrid: 'mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
    section: 'space-y-1',
    twoCol: 'mt-5 grid gap-4 md:grid-cols-2',
    list: 'mt-3 space-y-2.5 text-sm text-fg-muted',
    listItem: 'flex gap-2.5 leading-relaxed',
    listBullet:
      'mt-2 h-1 w-1 shrink-0 rounded-full bg-echo-500/80 ring-2 ring-echo-500/20',
    learnGrid: 'mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3',
    learnCard: [
      cardShell,
      'flex flex-col p-4 hover:-translate-y-0.5',
    ].join(' '),
    learnAccent: cardAccent,
    learnStep:
      'text-[10px] font-bold uppercase tracking-[0.14em] text-echo-600 dark:text-echo-400',
    learnTitle: 'mt-2 font-semibold text-fg',
    learnDesc: 'mt-1 flex-1 text-xs leading-relaxed text-fg-muted',
    learnLink:
      'mt-3 inline-flex items-center gap-1 text-xs font-semibold text-echo-700 transition group-hover:gap-2 dark:text-echo-300',
    relatedGrid: 'mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3',
    lifecycleGrid: [
      'relative mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4',
      'lg:before:pointer-events-none lg:before:absolute lg:before:left-[12.5%] lg:before:right-[12.5%] lg:before:top-8 lg:before:h-px',
      'lg:before:bg-gradient-to-r lg:before:from-echo-500/0 lg:before:via-echo-500/25 lg:before:to-echo-500/0',
    ].join(' '),
    lifecycleCard: [cardShell, 'z-[1] flex flex-col p-5'].join(' '),
    lifecycleAccent: cardAccent,
    lifecycleStep: [
      'mb-3 flex h-8 w-8 items-center justify-center rounded-full',
      'bg-gradient-to-br from-echo-500 to-echo-600 text-xs font-bold text-white',
      'shadow-sm shadow-echo-500/30 ring-2 ring-surface-elevated dark:ring-surface-elevated/80',
    ].join(' '),
    lifecycleTitle: 'text-sm font-semibold text-fg',
    lifecycleBody: 'mt-1.5 text-xs leading-relaxed text-fg-muted',
    whyGrid: 'mt-5 grid gap-4 sm:grid-cols-2',
    whyCard: [cardShell, 'p-5 hover:-translate-y-0.5'].join(' '),
    whyAccent: cardAccent,
    whyCardIconWrap: iconWrapSm,
    whyCardIconGlyph: 'h-4 w-4',
    whyCardTitle: 'mt-3 text-[15px] font-semibold leading-snug text-fg',
    whyCardBody: 'mt-2 text-sm leading-relaxed text-fg-muted',
    codeSection:
      'mt-5 overflow-hidden rounded-2xl border border-border/80 dark:border-white/10',
    codeSectionTitle:
      'border-b border-border/80 bg-surface-muted/50 px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-fg-subtle dark:border-white/10',
    heroTitle:
      'mt-2 text-2xl font-bold leading-tight tracking-tight text-fg sm:text-3xl lg:text-[2rem]',
    importPathsLink:
      'mt-4 inline-flex items-center gap-1 text-xs font-medium text-echo-700 underline-offset-2 transition hover:text-echo-800 hover:underline dark:text-echo-300 dark:hover:text-echo-200',
    heroFeaturedBanner: [
      'mb-3 inline-flex items-center gap-1.5 rounded-full border border-echo-500/30',
      'bg-echo-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-echo-800',
      'dark:border-echo-500/35 dark:bg-echo-950/60 dark:text-echo-200',
    ].join(' '),
    iconWrapMd,
    iconWrapSm,
    iconWrapHero,
    iconGlyphMd: 'h-4 w-4',
    iconGlyphSm: 'h-4 w-4',
  },
})

export const featureCardStyles = tv({
  slots: {
    root: [cardShell, 'flex gap-4 p-5 hover:-translate-y-0.5'].join(' '),
    accent: cardAccent,
    body: 'min-w-0 flex-1',
    iconWrap: iconWrapMd,
    iconGlyph: 'h-4 w-4',
    title: 'text-[15px] font-semibold leading-snug text-fg',
    text: 'mt-1.5 text-sm leading-relaxed text-fg-muted',
  },
})
