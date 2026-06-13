import { tv } from 'tailwind-variants'

const cardShell = [
  'rounded-2xl border border-border/70 bg-surface-elevated/80',
  'dark:border-white/[0.07] dark:bg-white/[0.02]',
].join(' ')

export const packageOverviewStyles = tv({
  slots: {
    root: 'not-prose mb-10 space-y-10',
    hero: 'space-y-6',
    heroTop: 'flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6',
    heroIconBox: [
      'flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl',
      'border border-echo-500/20 bg-gradient-to-br from-echo-500/15 via-echo-500/10 to-transparent',
      'text-echo-700 shadow-sm shadow-echo-500/10',
      'dark:border-echo-500/25 dark:from-echo-500/20 dark:via-echo-950/40 dark:to-echo-950/20 dark:text-echo-300',
    ].join(' '),
    heroIconGlyph: 'h-7 w-7',
    heroMain: 'min-w-0 flex-1',
    badgeRow: 'flex flex-wrap items-center gap-2',
    badgeOfficial:
      'text-[11px] font-semibold uppercase tracking-[0.08em] text-echo-600 dark:text-echo-400',
    badge:
      'rounded-md border border-border/80 bg-surface-muted/70 px-2 py-0.5 font-mono text-[11px] font-medium text-fg-muted dark:border-white/10 dark:bg-white/[0.04]',
    badgeAccent:
      'rounded-md border border-echo-500/25 bg-echo-50/80 px-2 py-0.5 font-mono text-[11px] font-medium text-echo-800 dark:border-echo-500/30 dark:bg-echo-950/50 dark:text-echo-200',
    packageName:
      'mt-3 text-2xl font-bold leading-tight tracking-tight text-fg sm:text-3xl lg:text-[2rem]',
    description:
      'mt-3 max-w-3xl text-sm leading-relaxed text-fg-muted sm:text-[15px]',
    tagline:
      'mt-2 text-base font-medium leading-snug text-fg sm:text-lg',
    statsBar: [
      'grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/80',
      'bg-border/80 sm:grid-cols-4 dark:border-white/10 dark:bg-white/10',
    ].join(' '),
    statCell: [
      'flex flex-col gap-1 bg-surface-elevated px-4 py-4 sm:px-5',
      'dark:bg-surface-elevated/90',
    ].join(' '),
    statLabel:
      'text-[10px] font-bold uppercase tracking-[0.14em] text-fg-subtle',
    statValue:
      'font-mono text-sm font-semibold text-echo-700 dark:text-echo-400',
    body: 'space-y-8',
    section: 'space-y-3',
    sectionTitle:
      'text-lg font-semibold tracking-tight text-fg sm:text-xl',
    sectionLead: 'max-w-3xl text-sm leading-relaxed text-fg-muted',
    codeWrap: [
      'overflow-hidden rounded-2xl border border-border/80',
      'dark:border-white/10',
    ].join(' '),
    pillarGrid: 'grid gap-3 sm:grid-cols-2 lg:grid-cols-3',
    pillarCard: [cardShell, 'p-4'].join(' '),
    pillarTitle: 'text-sm font-semibold text-fg',
    pillarBody: 'mt-1.5 text-sm leading-relaxed text-fg-muted',
    twoCol: 'grid gap-4 md:grid-cols-2',
    list: 'space-y-2 text-sm text-fg-muted',
    listItem: 'flex gap-2.5 leading-relaxed',
    listBullet:
      'mt-2 h-1 w-1 shrink-0 rounded-full bg-echo-500/80 ring-2 ring-echo-500/20',
    seeAlsoGrid: 'grid gap-2 sm:grid-cols-2',
    seeAlsoCard: [
      cardShell,
      'group flex flex-col p-4 transition hover:border-echo-500/25 hover:bg-echo-50/30',
      'dark:hover:border-echo-500/30 dark:hover:bg-echo-950/20',
    ].join(' '),
    seeAlsoTitle: 'text-sm font-semibold text-fg',
    seeAlsoDesc: 'mt-1 flex-1 text-xs leading-relaxed text-fg-muted',
    seeAlsoLink:
      'mt-3 inline-flex items-center gap-1 text-xs font-semibold text-echo-700 dark:text-echo-400',
    metaRow: 'flex flex-wrap gap-2',
    metaPill: [
      'rounded-full border border-border/70 bg-surface-muted/50 px-2.5 py-0.5',
      'font-mono text-[10px] font-medium text-fg-muted dark:border-white/10',
    ].join(' '),
    iconWrapSm:
      'mb-2 flex h-6 w-6 items-center justify-center text-echo-700 dark:text-echo-300',
    iconGlyphSm: 'h-4 w-4',
  },
})

export const packageAsideStyles = tv({
  slots: {
    root: 'space-y-5',
    section: [
      'rounded-2xl border border-border/80 bg-surface-elevated/60 p-4',
      'dark:border-white/10 dark:bg-surface-elevated/40',
    ].join(' '),
    title:
      'mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-fg-subtle',
    linkList: 'flex flex-col gap-0.5',
    link: [
      'group flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] text-fg-muted transition',
      'hover:bg-echo-50/80 hover:text-echo-800 dark:hover:bg-echo-950/40 dark:hover:text-echo-200',
    ].join(' '),
    linkIcon: 'h-4 w-4 shrink-0 opacity-70 transition group-hover:opacity-100',
    tagRow: 'flex flex-wrap gap-1.5',
    tag: [
      'rounded-md border border-border/70 bg-surface-muted/60 px-2 py-0.5',
      'font-mono text-[10px] font-medium text-fg-muted dark:border-white/10 dark:bg-white/[0.04]',
    ].join(' '),
    detailList: 'space-y-2',
    detailRow: 'flex items-baseline justify-between gap-3 text-[13px]',
    detailLabel: 'shrink-0 text-fg-subtle',
    detailValue: 'truncate text-right font-medium text-fg-muted',
  },
})
