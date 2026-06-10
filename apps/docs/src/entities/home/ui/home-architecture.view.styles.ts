import { tv } from 'tailwind-variants'

export const homeArchitectureStyles = tv({
  slots: {
    ide: [
      'relative overflow-hidden rounded-2xl border border-border/80 bg-[#1e1e1e]',
      'shadow-xl ring-1 ring-black/10 dark:border-white/10',
    ].join(' '),
    windowChrome:
      'flex items-center gap-2 border-b border-white/10 bg-[#252526] px-3 py-2 sm:gap-3',
    windowDots: 'flex shrink-0 gap-1.5',
    explorerToggle: [
      'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400',
      'transition hover:bg-white/10 hover:text-slate-200 lg:hidden',
    ].join(' '),
    explorerToggleActive: 'bg-white/10 text-slate-200 ring-1 ring-inset ring-white/10',
    windowTitle: 'font-mono text-[11px] font-medium text-slate-300',
    windowPath: 'ml-auto hidden min-w-0 truncate font-mono text-[10px] text-slate-500 sm:block',
    workspace:
      'relative flex min-h-[20rem] flex-col lg:min-h-[26rem] lg:grid lg:grid-cols-[minmax(14.5rem,18rem)_1fr]',
    explorerAccordion: [
      'grid overflow-hidden border-b border-white/10 bg-[#252526]',
      'transition-[grid-template-rows] duration-300 ease-out lg:hidden',
      'grid-rows-[0fr]',
    ].join(' '),
    explorerAccordionOpen: 'grid-rows-[1fr]',
    explorerAccordionInner:
      'flex min-h-0 max-h-[min(42vh,16rem)] flex-col overflow-hidden',
    explorerDesktop: [
      'hidden min-h-0 flex-col border-r border-white/10 bg-[#252526] lg:flex',
    ].join(' '),
    explorerHead:
      'flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2',
    explorerTitle:
      'text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400',
    explorerLink:
      'inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-echo-400 transition hover:text-echo-300',
    tree: 'ide-scrollbar flex-1 overflow-y-auto overflow-x-hidden py-1.5 font-mono text-[11px] leading-[1.4]',
    treeChildren: [
      'relative ml-3 border-l border-white/10 pl-1',
      'before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-white/5',
    ].join(' '),
    treeRow:
      'relative flex w-full min-w-0 items-center gap-1.5 py-[3px] pr-2 text-left transition-colors',
    treeRowFolder: 'cursor-pointer text-slate-400 hover:bg-white/[0.04] hover:text-slate-200',
    treeRowFolderOpen: 'text-slate-300',
    treeRowFile: 'cursor-pointer text-slate-500 hover:bg-white/[0.04] hover:text-slate-200',
    treeRowActive: 'bg-[#094771] text-white hover:bg-[#094771] hover:text-white',
    treeChevron: 'w-3 shrink-0 text-center text-[11px] text-slate-500',
    treeChevronSpacer: 'w-3 shrink-0',
    folderIcon: 'w-3.5 shrink-0 text-center text-[10px] text-amber-400/90',
    fileIcon:
      'inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[2px] text-[7px] font-bold leading-none',
    treeName: 'min-w-0 truncate',
    editor: 'flex min-h-0 min-w-0 flex-1 flex-col bg-[#1e1e1e]',
    editorTabs: [
      'ide-scrollbar flex shrink-0 gap-px overflow-x-auto border-b border-white/10',
      'bg-[#252526] px-1 pt-1',
    ].join(' '),
    editorTab: [
      'group flex shrink-0 items-center gap-1.5 rounded-t-md px-2.5 py-1.5',
      'text-[11px] text-slate-500 transition hover:bg-white/[0.04] hover:text-slate-300',
    ].join(' '),
    editorTabActive: 'bg-[#1e1e1e] text-slate-200 ring-1 ring-inset ring-white/10',
    editorTabLabel: 'max-w-[7rem] truncate sm:max-w-[9rem]',
    editorTabClose:
      'ml-0.5 rounded px-0.5 text-[12px] leading-none text-slate-600 opacity-0 transition hover:bg-white/10 hover:text-slate-300 group-hover:opacity-100',
    editorBreadcrumb:
      'flex min-w-0 flex-wrap items-center gap-1 border-b border-white/[0.06] bg-[#1e1e1e] px-3 py-1.5 font-mono text-[10px] text-slate-500',
    editorBreadcrumbSep: 'text-slate-600',
    editorBreadcrumbActive: 'text-slate-300',
    editorBody: [
      'ide-scrollbar min-h-[10rem] flex-1 overflow-y-auto overflow-x-auto p-0',
      'lg:min-h-[14rem]',
      '[&_.group]:my-0 [&_.group]:rounded-none [&_.group]:border-0',
    ].join(' '),
    statusBar:
      'flex min-w-0 items-center gap-2 border-t border-white/10 bg-[#007acc] px-3 py-1 text-[10px] text-white/90',
    statusBarSep: 'text-white/50',
  },
  variants: {
    expanded: {
      true: { treeChevron: 'text-slate-300' },
      false: { treeChevron: '' },
    },
    open: {
      true: { folderIcon: 'text-amber-300' },
      false: { folderIcon: '' },
    },
    root: {
      true: { treeName: 'font-semibold text-slate-200' },
      false: { treeName: '' },
    },
    variant: {
      ts: { fileIcon: 'bg-[#3178c6]/90 text-white' },
      test: { fileIcon: 'bg-[#89d185]/90 text-[#1e1e1e]' },
      json: { fileIcon: 'bg-[#cbcb41]/90 text-[#1e1e1e]' },
      config: { fileIcon: 'bg-[#9b59b6]/90 text-white' },
      html: { fileIcon: 'bg-[#e44d26]/90 text-white' },
    },
  },
  defaultVariants: {
    expanded: false,
    open: false,
    root: false,
    variant: 'ts',
  },
})
