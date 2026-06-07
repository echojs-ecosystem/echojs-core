import { tv } from 'tailwind-variants'

export const blogPageStyles = tv({
  slots: {
    page: 'py-6 sm:py-8 lg:py-10',
    inner: 'mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-10',
    header: 'mb-10 max-w-3xl',
    title: 'text-3xl font-bold tracking-tight text-fg sm:text-4xl',
    lead: 'mt-3 text-base leading-relaxed text-fg-muted',
    grid: 'grid gap-5 sm:grid-cols-2 xl:grid-cols-3',
    article: 'mx-auto w-full',
    articleHeader: 'mb-8 border-b border-border/70 pb-8 dark:border-white/10',
    articleTitle: 'text-3xl font-bold tracking-tight text-fg sm:text-4xl',
    articleMeta:
      'mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-fg-subtle',
    articleBody: 'space-y-4 text-base leading-relaxed text-fg-muted',
    backLink: [
      'mb-6 inline-flex items-center gap-1 text-sm font-medium text-fg-muted transition',
      'hover:text-echo-700 dark:hover:text-echo-300',
    ].join(' '),
    notFound:
      'rounded-2xl border border-border/80 bg-surface-elevated/50 p-8 text-center dark:border-white/10',
    notFoundTitle: 'text-lg font-semibold text-fg',
    notFoundBody: 'mt-2 text-sm text-fg-muted',
  },
})

export const blogCardStyles = tv({
  slots: {
    card: [
      'group flex h-full flex-col rounded-2xl border border-border/80 bg-surface-elevated/40 p-5 transition',
      'hover:border-echo-500/35 hover:bg-echo-50/30 hover:shadow-md',
      'dark:border-white/10 dark:bg-surface-elevated/25 dark:hover:border-echo-500/30 dark:hover:bg-echo-950/25',
    ].join(' '),
    meta: 'flex flex-wrap items-center gap-2 text-xs text-fg-subtle',
    category: [
      'rounded-md border border-border/70 px-1.5 py-0.5 font-semibold uppercase tracking-wide',
      'dark:border-white/10',
    ].join(' '),
    date: 'text-fg-subtle',
    title: [
      'mt-3 text-lg font-semibold leading-snug text-fg transition',
      'group-hover:text-echo-800 dark:group-hover:text-echo-200',
    ].join(' '),
    excerpt: 'mt-2 flex-1 text-sm leading-relaxed text-fg-muted',
    footer: 'mt-4 flex items-center justify-between text-xs text-fg-subtle',
    tags: 'flex flex-wrap gap-1.5',
    tag: 'rounded-md bg-surface-muted/70 px-1.5 py-0.5 dark:bg-surface-muted/40',
  },
  variants: {
    category: {
      announcement: { category: 'text-sky-700 dark:text-sky-300' },
      release: { category: 'text-emerald-700 dark:text-emerald-300' },
      tutorial: { category: 'text-violet-700 dark:text-violet-300' },
      engineering: { category: 'text-amber-700 dark:text-amber-300' },
    },
  },
})
