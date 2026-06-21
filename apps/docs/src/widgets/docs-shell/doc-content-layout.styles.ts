import { tv } from 'tailwind-variants'

import { docsShellPadding } from '@core/styles/docs-shell'

/** Shared docs main column + optional right TOC gutter (reserved even when empty). */
export const docContentLayoutStyles = tv({
  slots: {
    article: 'flex w-full',
    main: ['flex min-w-0 flex-1 justify-center', docsShellPadding].join(' '),
    mainInner: 'w-full min-w-0',
    tocAside: 'hidden w-72 shrink-0 xl:block xl:pr-8 2xl:w-80',
    tocSticky: 'sticky top-24 flex min-h-[calc(100dvh-6rem)] flex-col gap-5 pb-8',
    sponsorsRail: 'mt-auto shrink-0',
  },
  variants: {
    width: {
      prose: { mainInner: 'lg:max-w-3xl' },
      wide: { mainInner: 'lg:max-w-6xl' },
    },
  },
  defaultVariants: {
    width: 'prose',
  },
})

export const docContentPageStyles = tv({
  slots: {
    page: 'py-6 sm:py-8 lg:py-10',
  },
})
