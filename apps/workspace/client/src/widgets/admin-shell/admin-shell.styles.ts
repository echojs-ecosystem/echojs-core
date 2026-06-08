import { tv } from 'tailwind-variants'

export const shellStyles = tv({
  slots: {
    topbar:
      'sticky top-0 z-30 flex items-center gap-3 border-b border-border/80 bg-surface/95 px-4 py-3 backdrop-blur-md lg:px-8 dark:bg-surface/90',
    topbarBrand: 'text-sm font-bold tracking-tight text-fg',
    topbarTag: 'hidden text-xs text-fg-subtle sm:inline',
    topbarActions: 'ml-auto flex items-center gap-2',
    topbarBtn:
      'rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-fg-muted transition hover:border-echo-500/40 hover:text-fg',
    sidebarWrap: 'flex min-h-dvh shrink-0 flex-col lg:w-[18.5rem]',
    sidebarBrand: 'border-b border-border/70 px-4 py-4 dark:border-white/10',
    sidebarBrandName: 'text-base font-bold tracking-tight text-fg',
    sidebarBrandTag: 'text-xs text-fg-subtle',
    sidebarNav:
      'echo-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3',
    sectionTitle:
      'mb-1.5 mt-5 flex items-center gap-1.5 px-2 text-[10px] font-bold uppercase tracking-[0.14em] text-fg-subtle first:mt-2',
    navLink: [
      'group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-fg-muted transition',
      'hover:bg-surface-muted/80 hover:text-fg',
    ].join(' '),
    navLinkActive:
      'bg-echo-100/80 font-medium text-echo-900 dark:bg-echo-950/50 dark:text-echo-200',
    permissionBadge:
      'ml-auto rounded-md border border-border/80 px-1.5 py-0.5 text-[10px] font-medium',
    permissionAllowed: 'border-emerald-500/30 text-emerald-700 dark:text-emerald-400',
    permissionDenied: 'border-red-500/30 text-red-700 dark:text-red-400',
  },
})

export const sidebarPanelStyles = tv({
  base: [
    'flex min-h-dvh w-full flex-1 flex-col',
    'border-r border-border/80 bg-surface-elevated',
    'lg:sticky lg:top-0 lg:self-stretch',
  ].join(' '),
})

export const adminLayoutStyles = tv({
  slots: {
    shell: 'min-h-dvh bg-surface bg-hero-mesh lg:flex',
    shellMain: 'flex min-w-0 flex-1 flex-col',
    shellContent: 'min-h-0 flex-1 overflow-y-auto bg-surface',
    page: `${'px-4 md:px-5 lg:px-6 xl:px-8'} py-6 md:py-8`,
    toolbar: 'mb-6 flex flex-wrap items-center justify-between gap-3',
    toolbarActions: 'flex flex-wrap items-center gap-2',
    badge:
      'inline-flex items-center rounded-md border border-border/80 px-2 py-0.5 text-xs font-medium text-fg-muted',
    badgeActive: 'border-emerald-500/30 text-emerald-700 dark:text-emerald-400',
    badgeInvited: 'border-echo-500/30 text-echo-700 dark:text-echo-300',
    badgeSuspended: 'border-red-500/30 text-red-700 dark:text-red-400',
    tableWrap: 'overflow-x-auto rounded-xl border border-border/60',
    tableCardHeader:
      'mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4',
    tableCardTitle: 'text-base font-semibold text-fg',
    rowActions: 'flex flex-wrap items-center gap-1.5',
    select:
      'rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-fg',
    input:
      'rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-fg',
    card: 'rounded-2xl border border-border/80 bg-surface-elevated/90 p-5 shadow-sm ring-1 ring-black/[0.03] dark:ring-white/[0.05]',
    cardTitle: 'text-lg font-semibold text-fg',
    muted: 'text-sm text-fg-muted',
    code: 'rounded-md bg-surface-muted px-1.5 py-0.5 font-mono text-xs text-echo-800 dark:text-echo-200',
    table: 'w-full border-collapse text-sm',
    th: 'border-b border-border/80 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-fg-subtle',
    td: 'border-b border-border/50 px-3 py-2 text-fg-muted',
    btn:
      'rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-sm font-medium text-fg transition hover:border-echo-500/40 hover:text-echo-800 dark:hover:text-echo-300',
    btnPrimary:
      'rounded-lg border border-echo-600 bg-echo-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-echo-700 disabled:cursor-not-allowed disabled:opacity-40',
    btnDanger:
      'rounded-lg border border-red-500/40 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:opacity-40 dark:bg-red-950/30 dark:text-red-300',
    filterBar: 'flex flex-wrap items-end gap-3 rounded-xl border border-border/70 bg-surface-muted/40 p-4',
    statGrid: 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3',
    statCard:
      'rounded-2xl border border-echo-500/20 bg-gradient-to-br from-echo-50/80 via-surface-elevated to-transparent p-5 dark:from-echo-950/40',
    statValue: 'text-2xl font-bold text-fg',
    breadcrumbs: 'mb-4 flex flex-wrap items-center gap-2 text-sm text-fg-subtle',
    breadcrumbSep: 'text-fg-subtle/50',
    breadcrumbActive: 'font-medium text-echo-700 dark:text-echo-400',
  },
})
