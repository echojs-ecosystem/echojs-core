import { tv } from 'tailwind-variants'

export const packageInstallStyles = tv({
  slots: {
    root: 'mt-5 w-full min-w-0 max-w-full',
    rootEmbedded: 'w-full min-w-0 max-w-full',
    panel:
      'max-w-full overflow-hidden rounded-xl border border-white/10 bg-code-bg shadow-2xl shadow-black/30 ring-1 ring-white/[0.06]',
    panelEmbedded: 'rounded-none border-0 bg-transparent shadow-none ring-0',
    tabs: 'grid grid-cols-4 border-b border-white/10',
    tab: [
      'inline-flex items-center justify-center gap-2 border-b-2 border-transparent px-2 py-2.5 text-xs font-medium text-stone-400 sm:px-3 sm:text-sm',
      'transition hover:bg-white/[0.03] hover:text-stone-200',
    ].join(' '),
    tabActive:
      'border-b-echo-500/70 bg-white/[0.04] text-stone-100',
    tabIcon:
      'flex h-[18px] w-[18px] shrink-0 items-center justify-center [&_svg]:h-full [&_svg]:w-full',
    body: 'group relative cursor-pointer px-4 py-4 sm:px-5 sm:py-5',
    command:
      'block min-w-0 overflow-x-auto font-mono text-[13px] leading-relaxed sm:text-sm',
    tokenPm: 'text-[#e8c468]',
    tokenVerb: 'text-[#a8b1c4]',
    tokenPkg: 'text-[#b8e986]',
    tokenArg: 'text-[#7ec8e8]',
    copyHint:
      'pointer-events-none absolute right-4 top-3 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-stone-500 opacity-0 transition group-hover:opacity-100',
    copyHintVisible:
      'opacity-100 text-echo-400 border-echo-500/30 bg-echo-500/10',
  },
})
