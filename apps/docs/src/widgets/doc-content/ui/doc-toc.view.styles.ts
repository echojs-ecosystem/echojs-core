import { tv } from 'tailwind-variants'

export const docTocStyles = tv({
  slots: {
    root: [
      'flex w-full max-h-[min(24rem,calc(100vh-18rem))] flex-col rounded-2xl border border-border/80',
      'bg-surface-elevated/60 p-5 dark:border-white/10 dark:bg-surface-elevated/40',
    ].join(' '),
    title:
      'mb-3 shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-fg-subtle',
    list: [
      'echo-scrollbar flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto border-l border-border/80 pl-4 pr-1',
      'dark:border-white/10',
    ].join(' '),
    link: 'block break-words rounded-md py-1.5 pl-2.5 text-[13px] leading-snug text-fg-muted transition hover:bg-echo-50/80 hover:text-echo-800 dark:hover:bg-echo-950/40 dark:hover:text-echo-200',
    linkActive: 'font-medium text-amber-600 dark:text-amber-400',
    linkDepth2: 'text-[13px]',
    linkDepth3: 'pl-4 text-[12px]',
    empty: 'text-xs text-fg-subtle',
  },
})
