import { tv } from 'tailwind-variants'

export const homeSectionStyles = tv({
  slots: {
    section: 'relative py-20 sm:py-24',
    inner: 'relative',
    header: 'mx-auto mb-8 max-w-2xl text-center sm:mb-10',
    eyebrow:
      'mb-4 inline-flex items-center rounded-full border border-echo-500/25 bg-echo-500/12 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-echo-800 dark:border-echo-500/30 dark:bg-echo-500/10 dark:text-echo-400',
    title: 'text-3xl font-bold tracking-tight text-fg sm:text-4xl',
    lead: 'mt-4 text-base leading-relaxed text-fg-muted sm:text-lg',
  },
})
