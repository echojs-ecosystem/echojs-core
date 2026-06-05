import { tv } from "tailwind-variants";

export const shellStyles = tv({
  slots: {
    topbar:
      "sticky top-0 z-30 flex items-center gap-4 border-b border-border/80 bg-surface/95 px-4 py-3 lg:px-8 dark:bg-surface/90",
    topbarMenuBtn:
      "rounded-lg border border-border px-2.5 py-1.5 text-sm transition hover:bg-surface-muted lg:hidden",
    topbarBrand: "text-sm font-bold tracking-tight lg:hidden",
    topbarActions: "flex items-center gap-2",
    searchWrap: "flex-1 max-w-xl",
    overlay: "fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden",
    sidebarWrap: "lg:w-[18.5rem] lg:shrink-0 lg:px-4 lg:py-4",
    sidebarBrand: "border-b border-border/70 px-4 py-4 dark:border-white/10",
    sidebarBrandLink: "flex items-center gap-3 transition opacity-90 hover:opacity-100",
    sidebarBrandMark:
      "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-echo-500/25 to-echo-600/10 text-echo-700 ring-1 ring-echo-500/25 dark:from-echo-500/20 dark:to-echo-900/40 dark:text-echo-300 dark:ring-echo-500/30",
    sidebarBrandText: "min-w-0",
    sidebarBrandName: "text-base font-bold tracking-tight text-fg",
    sidebarBrandTag: "text-xs text-fg-subtle",
    sidebarNav: "echo-scrollbar mr-2.5 min-h-0 flex-1 overflow-y-auto px-2 py-3",
    sidebarQuick: "mb-1 flex flex-col gap-0.5 border-b border-border/60 pb-3 dark:border-white/10",
    sidebarNavIcon:
      "text-fg-subtle transition group-hover:text-fg group-[.font-medium]:text-echo-600 dark:group-[.font-medium]:text-echo-400",
    sidebarNavLabel: "min-w-0 flex-1 truncate",
    sidebarNavBadge:
      "shrink-0 rounded-md border border-border/80 px-1.5 py-0.5 text-[10px] font-medium text-fg-subtle dark:border-white/10",
    sidebarNavExternal: "ml-auto h-3 w-3 shrink-0 text-fg-subtle/70",
    sidebarExternalLink: [
      "group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-fg-muted transition",
      "hover:bg-surface-muted/80 hover:text-fg",
    ].join(" "),
    sidebarResources: "mt-2 flex flex-col gap-0.5 border-t border-border/70 pt-4 dark:border-white/10",
    packageGroup: "mb-0.5",
    packageGroupBtn: [
      "group flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition",
      "hover:bg-surface-muted/80",
    ].join(" "),
    packageGroupIcon: "text-fg-subtle group-hover:text-fg",
    packageGroupBtnActive: "bg-echo-50/60 dark:bg-echo-950/35",
    packageChevron: "mt-0.5 shrink-0 text-[10px] text-fg-subtle transition-transform duration-200",
    packageChevronOpen: "rotate-90 text-echo-600 dark:text-echo-400",
    packageGroupLabel: "flex min-w-0 flex-1 flex-col gap-0.5",
    packageGroupName: "text-sm font-semibold text-fg",
    packageGroupPkg: "truncate font-mono text-[10px] text-fg-subtle",
    packageChildren: "mb-2 ml-3 flex flex-col gap-0.5 border-l border-border/70 pl-2 dark:border-white/10",
    packageChildWrap: "min-w-0",
    packageChildLink: [
      "group flex items-center gap-2 rounded-md py-1.5 pl-2 pr-1 text-sm text-fg-muted transition",
      "hover:bg-surface-muted/60 hover:text-fg",
    ].join(" "),
    packageChildIcon: "text-fg-subtle/90 group-hover:text-fg",
    packageChildNested: "text-xs",
    sectionTitle:
      "mb-1.5 mt-5 px-2 text-[10px] font-bold uppercase tracking-[0.14em] text-echo-700 first:mt-2 dark:text-echo-400",
    agentsDivider: "mx-2 my-4 border-t border-border/80 dark:border-white/10",
    agentsSectionTitle:
      "mb-2 mt-2 px-2 text-[11px] font-semibold tracking-tight text-fg",
    agentsNavLink: [
      "flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-fg-muted transition",
      "hover:bg-surface-muted/80 hover:text-fg",
    ].join(" "),
    agentsNavBadge:
      "shrink-0 rounded-md border border-border/80 px-1.5 py-0.5 text-[10px] font-medium text-fg-subtle dark:border-white/10",
  },
});

export const sidebarPanelStyles = tv({
  base: [
    "flex h-full w-72 max-w-[85vw] flex-col",
    "lg:h-auto lg:max-h-[calc(100vh-2rem)] lg:w-full",
    "lg:rounded-2xl lg:border lg:border-border/80 lg:bg-surface-elevated/90",
    "lg:shadow-lg lg:shadow-black/5 lg:ring-1 lg:ring-black/[0.04]",
    "lg:backdrop-blur-xl lg:dark:border-white/10 lg:dark:ring-white/[0.06]",
  ].join(" "),
  variants: {
    mobileOpen: {
      true: "fixed inset-y-0 left-0 z-40 border-r border-border bg-surface-elevated shadow-2xl lg:static lg:border lg:shadow-lg",
      false: "hidden lg:sticky lg:top-4 lg:flex lg:self-start",
    },
  },
});

export const navLinkStyles = tv({
  base: [
    "group relative rounded-lg text-sm text-fg-muted transition",
    "hover:bg-surface-muted/80 hover:text-fg",
  ].join(" "),
  variants: {
    withIcon: {
      true: "flex items-center gap-2.5 px-3 py-2",
      false: "block px-3 py-2",
    },
    active: {
      true: [
        "bg-echo-50/90 font-medium text-echo-900",
        "before:absolute before:inset-y-1.5 before:left-0 before:w-0.5 before:rounded-full before:bg-echo-500",
        "dark:bg-echo-950/45 dark:text-echo-100",
      ].join(" "),
      false: "",
    },
  },
  defaultVariants: {
    withIcon: false,
  },
});
