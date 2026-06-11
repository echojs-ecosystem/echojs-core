import { tv } from 'tailwind-variants'

export const docStyles = tv({
  slots: {
    prose: 'doc-prose',
    title: 'text-3xl font-bold tracking-tight text-fg sm:text-4xl',
    lead: 'mt-3 text-base leading-relaxed text-fg-muted sm:text-lg',
    paragraph: 'my-4 leading-7 text-fg-muted',
    hr: 'my-10 border-0 border-t border-border/80 dark:border-white/10',
    inlineCode:
      'rounded-md border border-border/60 bg-surface-muted/80 px-1.5 py-0.5 font-mono text-[0.9em] text-fg dark:border-white/10',
    proseLink:
      'font-medium text-echo-700 underline decoration-echo-500/30 underline-offset-2 transition hover:text-echo-800 hover:decoration-echo-500/60 dark:text-echo-300 dark:hover:text-echo-200',
    list: 'my-4 ml-6 list-disc space-y-2 text-fg-muted',
    orderedList: 'my-4 ml-6 list-decimal space-y-2 text-fg-muted',
    tableWrap:
      'my-8 overflow-x-auto rounded-xl border border-border/80 shadow-sm dark:border-white/10',
    table: 'w-full text-left text-sm',
    tableHead: 'bg-surface-muted/80 dark:bg-surface-muted/50',
    th: 'px-4 py-3 font-semibold text-fg',
    tr: 'border-t border-border/80 dark:border-white/10',
    td: 'px-4 py-3 text-fg-muted',
    tabs: 'my-8 overflow-hidden rounded-xl border border-border/80 shadow-sm dark:border-white/10',
    tabsList:
      'flex gap-1 overflow-x-auto border-b border-border/80 bg-surface-muted/60 p-2 dark:border-white/10',
    tabsPanel: 'p-6',
    badge:
      'my-4 inline-flex items-center rounded-full border border-echo-500/30 bg-echo-50 px-3 py-1 font-mono text-sm text-echo-800 dark:bg-echo-950/50 dark:text-echo-200',
    packageInstall: 'my-8 not-prose',
    frameworkComparison: 'my-10 not-prose',
  },
})

export const docHeadingStyles = tv({
  base: 'scroll-mt-28 font-bold tracking-tight text-fg group',
  variants: {
    level: {
      1: 'mt-2 mb-4 text-2xl sm:text-3xl',
      2: 'mt-10 mb-3 border-b border-border/60 pb-2 text-xl font-semibold sm:mt-12 sm:text-2xl dark:border-white/10',
      3: 'mt-7 mb-2 text-lg font-semibold sm:mt-8 sm:text-xl',
      4: 'mt-5 mb-2 text-base font-medium sm:mt-6 sm:text-lg',
    },
  },
  defaultVariants: {
    level: 1,
  },
})

export const calloutStyles = tv({
  slots: {
    root: 'my-6 rounded-xl px-4 py-3.5',
    inner: 'flex items-start gap-3',
    icon: 'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-[15px] font-bold leading-none',
    content: 'min-w-0 flex-1 space-y-1.5',
    title: 'text-sm font-semibold leading-relaxed',
    body: 'text-sm leading-relaxed',
  },
  variants: {
    variant: {
      note: {
        root: 'bg-sky-500/[0.08] dark:bg-sky-400/10',
        icon: 'text-sky-600 dark:text-sky-400',
        title: 'text-sky-950 dark:text-sky-100',
        body: 'text-sky-900/85 dark:text-sky-100/85',
      },
      info: {
        root: 'bg-sky-500/[0.08] dark:bg-sky-400/10',
        icon: 'text-sky-600 dark:text-sky-400',
        title: 'text-sky-950 dark:text-sky-100',
        body: 'text-sky-900/85 dark:text-sky-100/85',
      },
      tip: {
        root: 'bg-emerald-500/10 dark:bg-emerald-400/10',
        icon: 'text-emerald-600 dark:text-emerald-400',
        title: 'text-emerald-950 dark:text-emerald-50',
        body: 'text-emerald-900/85 dark:text-emerald-50/90',
      },
      recommendation: {
        root: 'bg-yellow-400/15 dark:bg-yellow-400/10',
        icon: 'text-yellow-600 dark:text-yellow-400',
        title: 'text-yellow-950 dark:text-yellow-50',
        body: 'text-yellow-900/85 dark:text-yellow-50/90',
      },
      warning: {
        root: 'bg-amber-400/12 dark:bg-amber-400/10',
        icon: 'text-amber-600 dark:text-amber-400',
        title: 'text-amber-950 dark:text-amber-50',
        body: 'text-amber-900/85 dark:text-amber-50/90',
      },
      danger: {
        root: 'bg-rose-500/10 dark:bg-rose-400/10',
        icon: 'text-rose-600 dark:text-rose-400',
        title: 'text-rose-950 dark:text-rose-50',
        body: 'text-rose-900/85 dark:text-rose-50/90',
      },
      important: {
        root: 'bg-violet-500/10 dark:bg-violet-400/10',
        icon: 'text-violet-600 dark:text-violet-400',
        title: 'text-violet-950 dark:text-violet-50',
        body: 'text-violet-900/85 dark:text-violet-50/90',
      },
    },
    titled: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      titled: false,
      class: {
        body: 'text-[0.9375rem]',
      },
    },
  ],
  defaultVariants: {
    variant: 'note',
    titled: true,
  },
})

export const tabButtonStyles = tv({
  base: 'shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition',
  variants: {
    active: {
      true: 'bg-surface-elevated text-fg shadow-sm ring-1 ring-border/80 dark:ring-white/10',
      false: 'text-fg-muted hover:bg-surface-muted/80 hover:text-fg',
    },
  },
})
