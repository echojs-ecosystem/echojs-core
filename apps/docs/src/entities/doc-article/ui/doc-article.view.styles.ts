import { tv } from 'tailwind-variants'

import { docsShellPadding } from '@core/styles/docs-shell'

export const docArticlePageStyles = tv({
  slots: {
    docPage: 'py-6 sm:py-8 lg:py-10',
    docProse: 'max-w-3xl',
  },
})

export const docLayoutStyles = tv({
  slots: {
    article: 'flex w-full',
    main: ['flex min-w-0 flex-1 justify-start', docsShellPadding].join(' '),
    mainInner: 'w-full min-w-0 lg:mx-auto lg:max-w-3xl',
    toolbar: 'mb-4 flex justify-end',
    copyPageBtn: [
      'inline-flex items-center rounded-lg border border-border/80 bg-surface-elevated/80 px-3 py-1.5',
      'text-xs font-medium text-fg-muted transition',
      'hover:border-echo-500/35 hover:bg-echo-50/50 hover:text-echo-800',
      'dark:border-white/10 dark:hover:border-echo-500/30 dark:hover:bg-echo-950/40 dark:hover:text-echo-200',
    ].join(' '),
    tocAside: 'hidden w-72 shrink-0 xl:block xl:pr-8 2xl:w-80',
    tocSticky: 'sticky top-24 pb-8',
  },
})

export const skeletonStyles = tv({
  slots: {
    root: 'animate-pulse space-y-4',
    title: 'h-10 w-2/3 rounded-lg bg-surface-muted',
    line: 'h-4 w-full rounded bg-surface-muted',
    lineShort: 'h-4 w-5/6 rounded bg-surface-muted',
  },
})
