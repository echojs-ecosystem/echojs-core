import { tv } from "tailwind-variants";

export const homeHeroShowcaseStyles = tv({
  slots: {
    panel: [
      "flex h-[22.5rem] flex-col overflow-hidden rounded-2xl border border-white/10 bg-code-bg",
      "shadow-2xl shadow-black/30 ring-1 ring-white/[0.06]",
    ].join(" "),
    mainTabs:
      "flex shrink-0 items-stretch gap-0.5 overflow-x-auto border-b border-white/10 px-1.5 pt-1.5",
    mainTab: [
      "inline-flex shrink-0 items-center rounded-t-lg px-3.5 py-2.5 text-sm font-medium text-stone-400",
      "transition hover:text-stone-200",
    ].join(" "),
    mainTabActive: "bg-[#1c2128] text-stone-100",
    subTabs: [
      "flex h-11 shrink-0 items-stretch gap-0.5 overflow-x-auto border-b border-white/10 px-1.5",
    ].join(" "),
    subTabsHidden: "invisible pointer-events-none",
    subTab: [
      "inline-flex shrink-0 items-center gap-2 rounded-t-lg px-3.5 py-2 text-sm font-medium text-stone-400",
      "transition hover:text-stone-200",
    ].join(" "),
    subTabActive: "bg-[#1c2128] text-stone-100",
    subTabIcon:
      "flex h-[18px] w-[18px] shrink-0 items-center justify-center [&_svg]:h-full [&_svg]:w-full",
    content: "flex min-h-0 flex-1 flex-col overflow-hidden",
    codeChrome:
      "flex shrink-0 items-center gap-2 border-b border-white/10 bg-black/50 px-4 py-2.5",
    codeTitle: "min-w-0 flex-1 truncate font-mono text-xs text-slate-400",
    codeBadge:
      "shrink-0 rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400",
    codeBody:
      "min-h-0 flex-1 overflow-y-auto p-0 [&_.doc-code]:my-0 [&_.group]:my-0 [&_.group]:rounded-none [&_.group]:border-0",
    terminalBody:
      "group relative min-h-0 flex-1 cursor-pointer overflow-y-auto px-5 py-4 sm:px-6 sm:py-5",
    copyHint:
      "pointer-events-none absolute right-4 top-3 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-stone-500 opacity-0 transition group-hover:opacity-100",
    copyHintVisible: "opacity-100 text-echo-400 border-echo-500/30 bg-echo-500/10",
  },
});
