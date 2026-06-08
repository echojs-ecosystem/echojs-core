import { tv } from 'tailwind-variants'

export const homeStyles = tv({
  slots: {
    root: 'relative min-h-dvh overflow-x-clip bg-surface',
    mesh: 'pointer-events-none absolute inset-0 bg-hero-mesh',
    glow: 'pointer-events-none absolute -top-32 left-1/2 h-[20rem] max-w-[min(40rem,100%)] w-[85%] -translate-x-1/2 rounded-full bg-echo-400/12 blur-[90px] dark:bg-echo-500/8',
    main: 'relative min-w-0 overflow-x-clip',
    container: 'relative mx-auto w-full min-w-0 max-w-7xl px-4 pb-20 sm:px-8',

    hero: [
      'relative z-10 flex flex-col items-center justify-center',
      'px-4 py-12 sm:px-8 sm:py-16',
      'lg:min-h-[calc(100dvh-4.5rem)] lg:py-0',
    ].join(' '),
    heroContent:
      'mx-auto flex w-full max-w-5xl flex-col items-center text-center',
    heroBadge:
      'mb-6 inline-flex items-center gap-2 rounded-full border border-echo-500/35 bg-gradient-to-r from-echo-100 via-echo-50 to-echo-100/80 px-4 py-1.5 text-xs font-medium text-echo-900 shadow-sm shadow-echo-500/15 backdrop-blur-sm dark:border-echo-500/30 dark:from-echo-950/60 dark:via-echo-900/30 dark:to-echo-950/50 dark:text-echo-200',
    heroBadgeDot:
      'animate-pulse-soft h-1.5 w-1.5 rounded-full bg-echo-500 shadow-[0_0_6px_color-mix(in_srgb,var(--color-echo-500)_60%,transparent)]',
    heroTitle:
      'max-w-5xl text-[2.75rem] font-bold leading-[1.05] tracking-tight text-fg sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[5.75rem]',
    heroTitleAccent: 'text-gradient break-words',
    heroSubtitle:
      'mt-7 max-w-3xl text-lg leading-relaxed text-fg-muted sm:mt-8 sm:text-xl lg:text-2xl lg:leading-relaxed',
    heroPills: 'mt-8 flex flex-wrap justify-center gap-2',
    heroPill:
      'max-w-full rounded-full border border-border/80 bg-surface-elevated px-3 py-1 text-xs font-medium text-fg-muted dark:border-white/10 dark:bg-white/5',
    heroActions: 'mt-10 flex flex-wrap items-center justify-center gap-3',

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
