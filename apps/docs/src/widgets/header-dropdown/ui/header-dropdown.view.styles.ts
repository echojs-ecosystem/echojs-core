import { tv } from 'tailwind-variants'

import { headerIconBtnStyles } from '@widgets/site-header/ui/site-header.view.styles'

export const headerDropdownStyles = tv({
  slots: {
    root: 'relative shrink-0',
    trigger: [
      headerIconBtnStyles(),
      'md:h-auto md:w-auto md:min-h-0 md:rounded-lg md:border-0 md:bg-transparent md:px-2 md:py-1.5',
      'md:text-sm md:font-medium md:text-fg-muted md:shadow-none',
      'md:hover:border-transparent md:hover:bg-surface-muted md:hover:text-fg',
      'md:dark:border-transparent md:dark:hover:bg-echo-950/50',
    ].join(' '),
    triggerIcon: 'inline-flex md:hidden',
    triggerText:
      'hidden items-center gap-1 md:inline-flex',
    triggerLabel: 'max-w-[7rem] truncate',
    chevron: 'shrink-0 text-[10px] text-fg-subtle',
    panel: [
      'absolute right-0 top-full z-50 mt-2 min-w-[11rem] overflow-hidden rounded-xl',
      'border border-border bg-surface-elevated py-1 shadow-xl',
      'dark:border-white/10 dark:bg-surface-elevated',
    ].join(' '),
    option: [
      'flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm',
      'text-fg-muted transition hover:bg-surface-muted hover:text-fg',
    ].join(' '),
    optionActive:
      'bg-echo-50/90 font-medium text-echo-800 dark:bg-echo-950/45 dark:text-echo-200',
    optionDisabled:
      'cursor-not-allowed opacity-40 hover:bg-transparent hover:text-fg-muted',
    optionBadge:
      'rounded-md bg-echo-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-echo-700 dark:text-echo-300',
  },
})
