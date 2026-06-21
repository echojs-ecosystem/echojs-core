import { tv } from 'tailwind-variants'

export const docAsideSponsorsStyles = tv({
  slots: {
    root: 'shrink-0 space-y-3',
    title:
      'mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-fg-subtle',
    list: 'flex flex-col gap-2',
    link: [
      'group flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition',
      'hover:bg-echo-50/80 dark:hover:bg-echo-950/40',
    ].join(' '),
    name: [
      'min-w-0 flex-1 truncate text-[13px] font-medium text-fg-muted transition',
      'group-hover:text-echo-800 dark:group-hover:text-echo-200',
    ].join(' '),
    footer: 'mt-3 flex flex-col gap-2 pt-1',
    cta: [
      'text-center text-xs font-semibold text-echo-700 transition hover:text-echo-900',
      'dark:text-echo-400 dark:hover:text-echo-200',
    ].join(' '),
    viewAll: 'text-center text-[11px] font-medium text-fg-subtle transition hover:text-fg',
  },
})
