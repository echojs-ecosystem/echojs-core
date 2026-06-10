import { tv } from 'tailwind-variants'

import { docsShellPadding } from '@core/styles/docs-shell'

export const homeHeaderStyles = tv({
  slots: {
    root: [
      'top-0 z-50 border-b',
      'transition-[background-color,box-shadow,border-color,backdrop-filter] duration-200',
    ].join(' '),
    inner:
      'flex w-full min-w-0 flex-nowrap items-center gap-2 py-3 sm:gap-3 sm:py-3.5',
    brand: 'flex min-w-0 items-center gap-2 sm:gap-2.5',
    logo: 'flex shrink-0 items-center justify-center',
    logoMark: 'h-10 w-10',
    brandName:
      'hidden min-[22rem]:block truncate text-base font-bold tracking-tight text-fg',
    brandTag: 'hidden text-xs text-fg-subtle sm:block',
    menuBtn: 'shrink-0 lg:hidden',
    menuBtnActive:
      'border-echo-500/35 bg-echo-50/80 text-fg dark:bg-echo-950/50',
    nav: 'hidden items-center gap-1 lg:flex',
    navLink:
      'rounded-lg px-3 py-2 text-sm font-medium text-fg-muted transition hover:bg-surface-muted hover:text-fg',
    searchWrap:
      'flex min-w-0 flex-1 items-center justify-end sm:max-w-[9rem] md:max-w-xs lg:max-w-sm',
    actions: 'flex shrink-0 items-center gap-1 sm:gap-2',
    githubBtn: 'hidden sm:inline-flex',
  },
  variants: {
    layout: {
      home: {
        inner: `mx-auto max-w-7xl px-4 sm:px-8`,
      },
      docs: {
        inner: docsShellPadding,
      },
    },
    scrolled: {
      true: {},
      false: {},
    },
    scrollLocked: {
      true: {
        root: 'fixed inset-x-0',
      },
      false: {
        root: 'sticky',
      },
    },
  },
  compoundVariants: [
    {
      layout: 'docs',
      class: {
        brandName: 'max-w-[8.5rem] sm:max-w-none',
        searchWrap: 'min-w-0 flex-1 md:max-w-none lg:max-w-sm',
      },
    },
    {
      layout: 'home',
      scrolled: false,
      scrollLocked: false,
      class: {
        root: [
          'border-transparent bg-transparent shadow-none',
          'max-sm:border-border/60 max-sm:bg-surface/90 max-sm:shadow-sm',
          'max-sm:backdrop-blur-xl max-sm:backdrop-saturate-150',
          'max-sm:dark:border-white/10 max-sm:dark:bg-surface/90',
        ].join(' '),
      },
    },
    {
      layout: 'docs',
      scrolled: false,
      scrollLocked: false,
      class: {
        root: 'border-transparent bg-transparent shadow-none',
      },
    },
    {
      layout: ['home', 'docs'],
      scrolled: true,
      class: {
        root: [
          'border-border/60 bg-surface/90 shadow-sm shadow-black/10',
          'backdrop-blur-xl backdrop-saturate-150',
          'dark:border-white/10 dark:bg-surface/90',
        ].join(' '),
      },
    },
    {
      scrollLocked: true,
      class: {
        root: [
          'border-border/60 bg-surface/90 shadow-sm shadow-black/10',
          'backdrop-blur-xl backdrop-saturate-150',
          'dark:border-white/10 dark:bg-surface/90',
        ].join(' '),
      },
    },
  ],
  defaultVariants: { layout: 'home', scrolled: false, scrollLocked: false },
})

export const headerIconBtnStyles = tv({
  base: [
    'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border',
    'text-fg-muted transition hover:border-echo-500/30 hover:bg-echo-50/80 hover:text-fg',
    'dark:border-white/10 dark:hover:bg-echo-950/50',
  ].join(' '),
})

export const githubLinkStyles = tv({
  base: 'inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium text-fg-muted transition hover:bg-surface-muted hover:text-fg',
})
