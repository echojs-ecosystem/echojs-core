import { tv } from 'tailwind-variants'

export const homeMobileNavStyles = tv({
  slots: {
    overlay:
      'fixed inset-x-0 bottom-0 top-[3.75rem] z-[60] bg-black/40 backdrop-blur-[2px] sm:top-[4.25rem] lg:hidden',
    panel: [
      'fixed inset-x-0 bottom-0 top-[3.75rem] z-[70] flex w-full max-w-none items-center justify-center',
      'max-h-[calc(100dvh-3.75rem)] border-t border-border bg-surface-elevated shadow-xl',
      'sm:top-[4.25rem] sm:max-h-[calc(100dvh-4.25rem)] lg:hidden',
    ].join(' '),
    links: [
      'echo-scrollbar flex w-full max-w-[18rem] flex-col items-start px-4 py-6',
      'max-h-full overflow-y-auto text-left',
    ].join(' '),
    link: [
      'block w-full rounded-lg px-3 py-3 text-left text-lg font-medium text-fg-muted transition',
      'hover:bg-surface-muted/80 hover:text-fg',
    ].join(' '),
  },
})
