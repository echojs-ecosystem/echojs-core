import { tv } from 'tailwind-variants'

import { docsShellPadding } from '@core/styles/docs-shell'

export const roadmapPageStyles = tv({
  slots: {
    page: 'py-6 sm:py-8 lg:py-10',
    inner: ['w-full max-w-6xl', docsShellPadding].join(' '),
    header: 'mb-8 max-w-3xl',
    title: 'text-3xl font-bold tracking-tight text-fg sm:text-4xl',
    lead: 'mt-3 text-base leading-relaxed text-fg-muted',
    board: 'mb-10',
    form: 'mt-2',
  },
})
