import { tv } from 'tailwind-variants'

export const homeStyles = tv({
  slots: {
    root: 'relative min-h-dvh overflow-x-clip bg-surface',
    mesh: 'pointer-events-none absolute inset-0 bg-hero-mesh',
    glow: 'pointer-events-none absolute -top-32 left-1/2 h-[20rem] max-w-[min(40rem,100%)] w-[85%] -translate-x-1/2 rounded-full bg-echo-400/12 blur-[90px] dark:bg-echo-500/8',
    main: 'relative min-w-0 overflow-x-clip',
    container: 'relative mx-auto w-full min-w-0 max-w-7xl px-4 pb-20 sm:px-8',

    hero: 'relative pt-6 pb-16 sm:pt-10 sm:pb-24 lg:pt-14 lg:pb-28',
    heroGrid:
      'grid min-w-0 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16',
    heroContent: 'relative z-10 min-w-0 w-full',
    heroBadge:
      'mb-6 inline-flex items-center gap-2 rounded-full border border-echo-500/35 bg-gradient-to-r from-echo-100 via-echo-50 to-echo-100/80 px-4 py-1.5 text-xs font-medium text-echo-900 shadow-sm shadow-echo-500/15 backdrop-blur-sm dark:border-echo-500/30 dark:from-echo-950/60 dark:via-echo-900/30 dark:to-echo-950/50 dark:text-echo-200',
    heroBadgeDot:
      'animate-pulse-soft h-1.5 w-1.5 rounded-full bg-echo-500 shadow-[0_0_6px_color-mix(in_srgb,var(--color-echo-500)_60%,transparent)]',
    heroTitle:
      'text-4xl font-bold tracking-tight text-fg sm:text-5xl sm:text-6xl lg:text-[4.25rem] lg:leading-[1.05]',
    heroTitleAccent: 'text-gradient break-words',
    heroSubtitle:
      'mt-6 max-w-full text-base leading-relaxed text-fg-muted sm:max-w-xl sm:text-xl',
    heroPills: 'mt-8 flex flex-wrap gap-2',
    heroPill:
      'max-w-full rounded-full border border-border/80 bg-surface-elevated px-3 py-1 text-xs font-medium text-fg-muted dark:border-white/10 dark:bg-white/5',
    heroActions: 'mt-10 flex flex-wrap items-center gap-3',
    heroStats:
      'mt-14 grid min-w-0 grid-cols-3 gap-2 border-t border-border/80 pt-8 sm:max-w-lg sm:gap-6 sm:pt-10',
    heroStat: 'min-w-0',
    heroStatValue: 'text-lg font-bold tracking-tight text-fg sm:text-3xl',
    heroStatLabel:
      'mt-1 text-[10px] font-medium uppercase leading-tight tracking-wide text-fg-subtle sm:text-xs sm:tracking-wider',

    heroVisual: 'relative z-10 min-w-0 w-full',
    heroVisualStack: 'flex flex-col',

    ecosystemGrid: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',

    archGrid: 'grid items-center gap-14 lg:grid-cols-2 lg:gap-20',
    archContent: 'max-w-lg',
    archTitle: 'text-3xl font-bold tracking-tight text-fg sm:text-4xl',
    archBody: 'mt-5 text-base leading-relaxed text-fg-muted sm:text-lg',
    archLink:
      'group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-echo-600 transition hover:gap-3 dark:text-echo-400',
    archLinkArrow: 'transition group-hover:translate-x-0.5',
  },
})
