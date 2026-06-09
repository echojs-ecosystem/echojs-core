import { tv } from 'tailwind-variants'

export const roadmapPageStyles = tv({
  slots: {
    header: 'mb-8 max-w-3xl',
    title: 'text-3xl font-bold tracking-tight text-fg sm:text-4xl',
    lead: 'mt-3 text-base leading-relaxed text-fg-muted',
    board: 'mb-10',
    form: 'mt-2',
  },
})
