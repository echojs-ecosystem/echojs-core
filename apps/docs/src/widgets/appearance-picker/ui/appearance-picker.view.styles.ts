import { tv } from 'tailwind-variants'

import { headerIconBtnStyles } from '@widgets/site-header/ui/site-header.view.styles'

export const appearancePickerStyles = tv({
  slots: {
    root: 'relative hidden shrink-0 md:block',
    trigger: [
      headerIconBtnStyles(),
      'md:h-auto md:w-auto md:min-h-0 md:gap-2 md:rounded-xl md:border md:border-border/70',
      'md:bg-surface-elevated/90 md:px-2.5 md:py-1.5 md:shadow-sm md:shadow-black/5',
      'md:hover:border-echo-500/25 md:hover:bg-surface-muted',
      'md:dark:border-white/10 md:dark:shadow-none md:dark:hover:bg-white/5',
    ].join(' '),
    triggerPreview: 'relative h-[1.125rem] w-[1.125rem] shrink-0',
    triggerSurface: [
      'absolute inset-0 overflow-hidden rounded-[5px] border border-white/80 shadow-sm',
      'ring-1 ring-black/5 dark:border-white/15 dark:ring-white/10',
    ].join(' '),
    triggerAccent: [
      'absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-white/90 shadow-sm',
      'ring-1 ring-black/5 dark:border-white/20',
    ].join(' '),
    triggerLabel: 'text-xs font-medium text-fg',
    chevron: 'shrink-0 text-[10px] text-fg-subtle transition-transform duration-200',
    chevronOpen: 'rotate-180',
    flyout: [
      'absolute right-0 top-full z-50 mt-2.5 flex overflow-hidden rounded-2xl',
      'bg-surface-elevated',
      'shadow-[0_18px_50px_-14px_rgba(15,23,42,0.18),0_8px_22px_-10px_rgba(15,23,42,0.12)]',
      'dark:shadow-[0_22px_60px_-14px_rgba(0,0,0,0.78),0_10px_28px_-10px_rgba(0,0,0,0.55)]',
    ].join(' '),
    menu: 'w-[16.5rem] shrink-0 p-2',
    submenu: 'flex w-[15.5rem] shrink-0 flex-col',
    submenuWide: 'w-[17.5rem]',
    submenuHeader: 'shrink-0 px-3 py-2.5',
    submenuTitle: 'text-xs font-semibold uppercase tracking-wide text-fg-subtle',
    submenuBody: 'max-h-[min(26rem,70vh)] overflow-y-auto p-2 echo-scrollbar',
    menuHeader: 'rounded-xl bg-echo-50 px-3 py-2.5 dark:bg-echo-950/30',
    menuHeaderTitle: 'text-sm font-semibold tracking-tight text-fg',
    menuHeaderHint: 'mt-1 text-[11px] leading-relaxed text-fg-subtle',
    menuList: 'mt-1.5 flex flex-col gap-1',
    menuItem: [
      'group flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition',
      'hover:bg-surface-muted dark:hover:bg-white/[0.06]',
    ].join(' '),
    menuItemActive:
      'bg-echo-50 ring-1 ring-echo-500/25 dark:bg-echo-950/30 dark:ring-echo-500/20',
    menuItemIcon: [
      'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
      'bg-surface shadow-sm shadow-black/[0.03] dark:bg-surface-muted',
      'group-hover:bg-surface-elevated',
    ].join(' '),
    menuItemBody: 'flex min-w-0 flex-1 flex-col gap-1',
    menuItemLabel: 'text-sm font-medium leading-snug text-fg',
    menuItemValue: 'truncate text-xs leading-relaxed text-fg-subtle',
    menuItemChevron: [
      'shrink-0 text-sm text-fg-subtle/70 transition',
      'group-hover:text-echo-600 dark:group-hover:text-echo-400',
    ].join(' '),
    menuItemChevronActive: 'text-echo-600 dark:text-echo-400',
    modePreview: 'inline-flex h-[18px] w-[18px] text-fg-muted',
    surfacePreview: 'h-[18px] w-[18px] overflow-hidden rounded-[4px]',
    accentPreview: 'h-[18px] w-[18px] rounded-full',
    fontPreview: 'text-sm font-semibold leading-none text-fg',
    submenuList: 'flex flex-col gap-1',
    submenuOption: [
      'flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left transition',
      'hover:bg-surface-muted dark:hover:bg-white/[0.06]',
    ].join(' '),
    submenuOptionActive:
      'bg-echo-50 ring-1 ring-echo-500/30 dark:bg-echo-950/35 dark:ring-echo-500/25',
    submenuOptionIcon: 'inline-flex h-4 w-4 shrink-0 text-fg-muted',
    submenuOptionMeta: 'flex min-w-0 flex-1 flex-col gap-1',
    submenuOptionLabel: 'truncate text-sm font-medium leading-snug text-fg',
    submenuOptionLabelActive: 'text-echo-800 dark:text-echo-200',
    submenuOptionHint: 'truncate text-xs leading-relaxed text-fg-subtle',
    submenuCheck: 'shrink-0 text-[10px] font-bold text-echo-600 dark:text-echo-400',
    accentGrid: 'grid grid-cols-4 gap-2',
    accentOption: [
      'flex flex-col items-center gap-1.5 rounded-lg px-1 py-2 transition',
      'hover:bg-surface-muted dark:hover:bg-white/[0.06]',
    ].join(' '),
    accentOptionActive:
      'bg-echo-50 ring-1 ring-echo-500/30 dark:bg-echo-950/35 dark:ring-echo-500/25',
    accentSwatch: [
      'h-7 w-7 rounded-full shadow-sm',
      'ring-1 ring-black/5 dark:ring-white/10',
    ].join(' '),
    accentSwatchActive: 'ring-2 ring-echo-500 ring-offset-1 ring-offset-surface-elevated',
    accentLabel: 'max-w-full truncate px-0.5 text-[10px] leading-snug font-medium text-fg-muted',
    surfaceSwatchSm: [
      'h-8 w-8 shrink-0 overflow-hidden rounded-lg shadow-sm',
      'ring-1 ring-black/5 dark:ring-white/10',
    ].join(' '),
    fontAgSm: 'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface text-sm font-semibold dark:bg-surface-muted',
  },
})
