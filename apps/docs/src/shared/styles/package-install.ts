import { tv } from "tailwind-variants";

export const packageInstallStyles = tv({
  slots: {
    root: "mt-5 w-full",
    panel:
      "overflow-hidden rounded-xl border border-white/10 bg-code-bg shadow-2xl shadow-black/30 ring-1 ring-white/[0.06]",
    tabs: "flex items-stretch gap-0.5 overflow-x-auto border-b border-white/10 px-1.5 pt-1.5",
    tab: [
      "inline-flex shrink-0 items-center gap-2 rounded-t-lg px-3.5 py-2.5 text-sm font-medium text-stone-400",
      "transition hover:text-stone-200",
    ].join(" "),
    tabActive: "bg-[#1c2128] text-stone-100",
    tabIcon: "flex h-[18px] w-[18px] shrink-0 items-center justify-center [&_svg]:h-full [&_svg]:w-full",
    body: "group relative cursor-pointer px-5 py-4 sm:px-6 sm:py-5",
    command: "block min-w-0 overflow-x-auto font-mono text-[13px] leading-relaxed sm:text-sm",
    tokenPm: "text-[#e8c468]",
    tokenVerb: "text-[#a8b1c4]",
    tokenPkg: "text-[#b8e986]",
    tokenArg: "text-[#7ec8e8]",
    copyHint:
      "pointer-events-none absolute right-4 top-3 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-stone-500 opacity-0 transition group-hover:opacity-100",
    copyHintVisible: "opacity-100 text-echo-400 border-echo-500/30 bg-echo-500/10",
  },
});

export const ecosystemPackageStyles = tv({
  slots: {
    root: [
      "group relative flex flex-col rounded-2xl border border-border/70 p-5 bg-surface-elevated",
      "transition duration-300 hover:-translate-y-0.5 hover:border-echo-500/30 hover:shadow-md hover:shadow-black/5",
      "dark:border-white/[0.07] dark:bg-white/[0.02] dark:hover:border-echo-500/35 dark:hover:bg-echo-950/25",
    ].join(" "),
    topLine:
      "pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-echo-500/50 to-transparent opacity-70 transition group-hover:via-echo-400/80",
    hoverWash:
      "pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-echo-500/[0.07] via-transparent to-echo-400/[0.04] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-echo-500/[0.1] dark:to-echo-600/[0.05]",
    content: "relative z-[1] flex flex-1 flex-col",
    icon: "mb-0 flex h-11 w-11 items-center justify-center rounded-xl bg-echo-50 text-lg text-echo-800 ring-1 ring-echo-500/20 dark:from-echo-950/80 dark:to-echo-900/40 dark:text-echo-200 dark:ring-echo-500/30",
    name: "mt-3 font-mono text-sm font-bold text-fg",
    description: "mt-2 flex-1 text-xs leading-relaxed text-fg-muted",
    link: "mt-4 inline-flex items-center gap-1 bg-gradient-to-r from-echo-700 to-echo-500 bg-clip-text text-sm font-semibold text-transparent transition group-hover:gap-2 dark:from-echo-300 dark:to-echo-400",
    linkArrow: "text-echo-600 dark:text-echo-400",
  },
});
