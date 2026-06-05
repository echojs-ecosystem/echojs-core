import { tv } from "tailwind-variants";

export const homeStyles = tv({
  slots: {
    root: "relative min-h-dvh overflow-hidden bg-surface",
    mesh: "pointer-events-none absolute inset-0 bg-hero-mesh",
    glow:
      "pointer-events-none absolute -top-32 left-1/2 h-[20rem] max-w-[min(40rem,100%)] w-[85%] -translate-x-1/2 rounded-full bg-echo-400/12 blur-[90px] dark:bg-echo-500/8",
    main: "relative overflow-x-clip",
    container: "relative mx-auto max-w-7xl px-5 pb-20 sm:px-8",

    hero: "relative pt-6 pb-16 sm:pt-10 sm:pb-24 lg:pt-14 lg:pb-28",
    heroGrid: "grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16",
    heroContent: "relative z-10",
    heroBadge:
      "mb-6 inline-flex items-center gap-2 rounded-full border border-echo-500/35 bg-gradient-to-r from-echo-100 via-echo-50 to-echo-100/80 px-4 py-1.5 text-xs font-medium text-echo-900 shadow-sm shadow-echo-500/15 backdrop-blur-sm dark:border-echo-500/30 dark:from-echo-950/60 dark:via-echo-900/30 dark:to-echo-950/50 dark:text-echo-200",
    heroBadgeDot:
      "animate-pulse-soft h-1.5 w-1.5 rounded-full bg-echo-500 shadow-[0_0_6px_color-mix(in_srgb,var(--color-echo-500)_60%,transparent)]",
    heroTitle:
      "text-5xl font-bold tracking-tight text-fg sm:text-6xl lg:text-[4.25rem] lg:leading-[1.05]",
    heroTitleAccent: "text-gradient",
    heroSubtitle:
      "mt-6 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl",
    heroPills: "mt-8 flex flex-wrap gap-2",
    heroPill:
      "rounded-full border border-border/80 bg-surface-elevated px-3 py-1 text-xs font-medium text-fg-muted dark:border-white/10 dark:bg-white/5",
    heroActions: "mt-10 flex flex-wrap items-center gap-3",
    heroStats:
      "mt-14 grid grid-cols-3 gap-6 border-t border-border/80 pt-10 sm:max-w-lg",
    heroStatValue: "text-2xl font-bold tracking-tight text-fg sm:text-3xl",
    heroStatLabel: "mt-1 text-xs font-medium uppercase tracking-wider text-fg-subtle",
    heroGithub:
      "inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-fg-muted transition hover:border-echo-500/25 hover:bg-echo-50/50 hover:text-fg dark:hover:bg-echo-950/30",

    heroVisual: "relative z-10",
    codeWindow:
      "overflow-hidden rounded-2xl border border-border/80 bg-surface-elevated shadow-xl shadow-black/8 ring-1 ring-black/[0.04] dark:border-white/10 dark:bg-surface-elevated dark:shadow-black/50 dark:ring-echo-500/15",
    codeWindowChrome:
      "flex items-center gap-2 border-b border-border/80 bg-surface-muted/80 px-4 py-3 dark:border-white/10 dark:bg-black/20",
    codeDot: "h-3 w-3 rounded-full",
    codeDotRed: "bg-[#ff5f57]",
    codeDotYellow: "bg-[#febc2e]",
    codeDotGreen: "bg-[#28c840]",
    codeWindowTitle: "ml-2 font-mono text-xs text-fg-subtle",
    codeWindowBody: "[&_.doc-code]:my-0 [&_.group]:my-0 [&_.group]:rounded-none [&_.group]:border-0",

    heroVisualStack: "flex flex-col",
    section: "relative py-20 sm:py-24",
    sectionInner: "relative",
    sectionHeader: "mx-auto mb-14 max-w-2xl text-center",
    sectionEyebrow:
      "mb-4 inline-flex items-center rounded-full border border-echo-500/25 bg-echo-500/12 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-echo-800 dark:border-echo-500/30 dark:bg-echo-500/10 dark:text-echo-400",
    sectionTitle: "text-3xl font-bold tracking-tight text-fg sm:text-4xl",
    sectionLead: "mt-4 text-base leading-relaxed text-fg-muted sm:text-lg",

    compareGrid: "mb-12 grid gap-5 md:grid-cols-2",
    philosophyBridge:
      "mb-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left",
    philosophyBridgeText: "max-w-xl text-sm leading-relaxed text-fg-muted",
    philosophyBridgeLink:
      "inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-echo-600 transition hover:gap-3 dark:text-echo-400",
    philosophyGrid: "grid gap-4 sm:grid-cols-3",
    philosophyCardNumber:
      "inline-flex w-fit rounded-md bg-echo-500/15 px-2 py-0.5 text-[11px] font-bold tabular-nums tracking-widest text-echo-800 dark:bg-echo-500/20 dark:text-echo-300",
    philosophyCardTitle: "mt-2 text-base font-semibold text-fg group-hover:text-echo-800 dark:group-hover:text-echo-100",
    philosophyCardSummary: "mt-2 flex-1 text-sm leading-relaxed text-fg-muted",
    philosophyCardExample:
      "mt-4 rounded-lg border border-border/70 bg-surface-muted/80 px-3 py-2 font-mono text-[11px] leading-relaxed text-fg-muted dark:border-white/10 dark:bg-code-bg/40 dark:text-fg-subtle",
    philosophyCardLink:
      "mt-4 inline-flex items-center gap-1 text-xs font-semibold text-echo-600 opacity-0 transition group-hover:opacity-100 dark:text-echo-400",
    philosophyCardGlow: "hidden",

    codeShowcase:
      "relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-surface-elevated via-surface-elevated/90 to-echo-50/15 p-4 shadow-xl shadow-black/5 ring-1 ring-black/[0.04] sm:p-5 dark:border-white/10 dark:from-surface-elevated/90 dark:via-surface-elevated/60 dark:to-echo-950/20 dark:ring-white/[0.06]",
    codeShowcaseGlow:
      "pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-echo-500/10 blur-3xl dark:bg-echo-500/15",
    codeShowcaseGrid: "relative grid gap-5 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-6",
    codeTabRail: "flex flex-row gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0",
    codeTabBtn: [
      "flex min-w-[9.5rem] shrink-0 flex-col rounded-xl border border-transparent px-3 py-2.5 text-left transition",
      "hover:border-border/80 hover:bg-surface/80 dark:hover:border-white/10 dark:hover:bg-surface-elevated/80",
    ].join(" "),
    codeTabBtnActive: [
      "border-echo-500/30 bg-echo-50/80 shadow-sm ring-1 ring-echo-500/15",
      "dark:border-echo-500/35 dark:bg-echo-950/40 dark:ring-echo-500/20",
    ].join(" "),
    codeTabLayer: "text-[10px] font-semibold uppercase tracking-wider text-fg-subtle",
    codeTabLabel: "mt-0.5 truncate font-mono text-xs font-medium text-fg",
    codeTabIcon: "mb-1 text-base leading-none",
    codeDetail: "hidden min-w-0 lg:block lg:pt-1",
    codeDetailTitle: "text-lg font-semibold text-fg",
    codeDetailBody: "mt-2 text-sm leading-relaxed text-fg-muted",
    codeDetailList: "mt-4 space-y-2.5",
    codeDetailItem: "flex gap-2.5 text-sm text-fg-muted",
    codeDetailBullet:
      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-echo-500/15 text-[10px] font-bold text-echo-700 dark:bg-echo-500/20 dark:text-echo-300",
    codeEditor:
      "min-w-0 overflow-hidden rounded-2xl border border-border/80 bg-code-bg shadow-2xl ring-1 ring-black/10 dark:border-white/10 dark:ring-white/10",
    codeEditorChrome:
      "flex items-center gap-3 border-b border-white/10 bg-black/50 px-4 py-2.5",
    codeEditorDots: "flex gap-1.5",
    codeEditorTitle: "min-w-0 flex-1 truncate font-mono text-xs text-slate-400",
    codeEditorBadge:
      "shrink-0 rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400",
    codeEditorBody: "p-0 [&_.group]:my-0 [&_.group]:rounded-none [&_.group]:border-0",
    codeEditorFoot:
      "border-t border-white/10 bg-black/30 px-4 py-2 text-[11px] text-slate-500",

    ecosystemGrid: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",

    archGrid: "grid items-center gap-14 lg:grid-cols-2 lg:gap-20",
    archContent: "max-w-lg",
    archTitle: "text-3xl font-bold tracking-tight text-fg sm:text-4xl",
    archBody: "mt-5 text-base leading-relaxed text-fg-muted sm:text-lg",
    archLink:
      "group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-echo-600 transition hover:gap-3 dark:text-echo-400",
    archLinkArrow: "transition group-hover:translate-x-0.5",
    archDiagram:
      "relative overflow-hidden rounded-2xl border border-border/80 bg-surface-elevated p-8 shadow-lg shadow-black/5 dark:border-white/10 dark:bg-surface-elevated/40 dark:shadow-black/25",
    archDiagramGlow:
      "pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-bl from-echo-400/25 via-echo-500/10 to-transparent blur-2xl dark:from-echo-500/20",
    archDiagramInner: "relative z-10 mx-auto flex max-w-sm flex-col items-center gap-2.5",
    archConnector: "h-2 w-px bg-border",

    cta: [
      "relative overflow-hidden rounded-3xl border border-border/80 bg-surface-elevated p-6 shadow-xl shadow-black/5 ring-1 ring-black/[0.04]",
      "sm:p-8 dark:border-white/10 dark:bg-surface-elevated/70 dark:ring-white/[0.06]",
    ].join(" "),
    ctaMesh:
      "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_100%_0%,color-mix(in_srgb,var(--color-echo-500)_18%,transparent),transparent_55%)] dark:opacity-90",
    ctaGrid: "relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-center lg:gap-10",
    ctaCopy: "flex flex-col",
    ctaEyebrow: "text-xs font-semibold uppercase tracking-[0.2em] text-echo-700 dark:text-echo-400",
    ctaTitle: "text-2xl font-bold tracking-tight text-fg sm:text-3xl",
    ctaBody: "mt-3 max-w-xl text-sm leading-relaxed text-fg-muted sm:text-base",
    ctaBodyEm: "font-medium text-fg",
    ctaSteps: "mt-6 flex flex-wrap gap-2",
    ctaStep:
      "inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/80 px-3 py-1.5 text-xs font-medium text-fg-muted dark:border-white/10 dark:bg-surface/50",
    ctaStepNum:
      "flex h-5 w-5 items-center justify-center rounded-full bg-echo-500/15 text-[10px] font-bold text-echo-700 dark:bg-echo-500/20 dark:text-echo-300",
    ctaActions: "mt-8 flex flex-wrap items-center gap-3",
    ctaAside: "min-w-0",
    ctaAsideLabel: "text-sm font-semibold text-fg",
    ctaAsideHint: "mt-1 text-xs text-fg-subtle",
    ctaInstall: "mt-4 min-w-0",
  },
});

export const philosophyCardStyles = tv({
  base: [
    "group relative flex flex-col overflow-hidden rounded-2xl border p-5 no-underline",
    "transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-echo-500/15",
    "dark:border-white/10 dark:bg-surface-elevated/50 dark:hover:border-echo-500/30 dark:hover:shadow-echo-500/5",
  ].join(" "),
  variants: {
    tone: {
      honey: "border-border/80 bg-surface-elevated hover:border-echo-500/25",
      wheat: "border-border/80 bg-surface-elevated hover:border-echo-500/25",
      sand: "border-border/80 bg-surface-elevated hover:border-echo-500/25",
    },
  },
  defaultVariants: { tone: "honey" },
});

export const compareCardStyles = tv({
  slots: {
    root: "rounded-2xl border p-6 transition duration-300",
    title: "text-sm font-semibold uppercase tracking-wider",
    list: "mt-5 space-y-3",
    item: "flex items-start gap-2 text-sm leading-relaxed",
    bullet: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
  },
  variants: {
    tone: {
      muted: {
        root: "border-border/80 bg-surface-elevated dark:border-white/10 dark:bg-surface-elevated/60",
        title: "text-fg-subtle",
        item: "text-fg-muted",
        bullet: "bg-fg-subtle",
      },
      accent: {
        root: "border-echo-500/40 bg-gradient-to-br from-echo-100/90 via-echo-50/50 to-surface-elevated shadow-md shadow-echo-500/15 ring-1 ring-echo-500/25 dark:border-echo-500/35 dark:from-echo-950/40 dark:via-surface-elevated/80 dark:to-surface-elevated/80 dark:ring-echo-500/25",
        title: "text-echo-700 dark:text-echo-400",
        item: "text-fg",
        bullet: "bg-echo-500",
      },
    },
  },
  defaultVariants: { tone: "muted" },
});

export const featureCardStyles = tv({
  slots: {
    root: [
      "group relative overflow-hidden rounded-2xl border border-border/80 bg-surface-elevated p-6",
      "transition duration-300 hover:-translate-y-1 hover:border-echo-500/25 hover:shadow-lg hover:shadow-black/5",
      "dark:border-white/10 dark:bg-surface-elevated/80 dark:hover:border-echo-500/30",
    ].join(" "),
    iconWrap:
      "mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-echo-50 text-lg font-semibold text-echo-700 ring-1 ring-echo-500/20 dark:bg-echo-950/80 dark:text-echo-300 dark:ring-echo-500/30",
    title: "text-lg font-semibold text-fg",
    body: "mt-2 text-sm leading-relaxed text-fg-muted",
    shine: "hidden",
  },
});

export const archLayerStyles = tv({
  slots: {
    wrap: "flex w-full flex-col items-center",
    layer: [
      "w-full rounded-xl border px-4 py-3 text-center transition duration-300",
      "hover:-translate-y-0.5 hover:shadow-md",
    ].join(" "),
    name: "text-sm font-semibold",
    hint: "mt-0.5 text-[10px] font-medium uppercase tracking-wider opacity-70",
  },
  variants: {
    emphasis: {
      default: {
        layer:
          "border-border bg-surface-elevated text-fg dark:border-white/10 dark:bg-surface-elevated/90",
      },
      foundation: {
        layer:
          "border-echo-500/30 bg-echo-50 text-echo-900 ring-1 ring-echo-500/15 dark:border-echo-500/35 dark:bg-echo-950/50 dark:text-echo-100 dark:ring-echo-500/20",
      },
    },
  },
  defaultVariants: { emphasis: "default" },
});

export const homeHeaderStyles = tv({
  slots: {
    root: "sticky top-0 z-50 border-b border-transparent bg-transparent shadow-none",
    inner: "flex w-full items-center gap-3 px-5 py-4 sm:gap-4 sm:px-8",
    brand: "flex items-center gap-2.5",
    logo:
      "flex h-9 w-9 items-center justify-center rounded-xl bg-echo-500 text-sm font-bold text-stone-950 shadow-md shadow-echo-600/20 ring-1 ring-echo-600/30",
    brandName: "text-base font-bold tracking-tight text-fg",
    brandTag: "hidden text-xs text-fg-subtle sm:block",
    menuBtn:
      "rounded-lg border border-border px-2.5 py-1.5 text-sm font-medium text-fg-muted transition hover:bg-surface-muted hover:text-fg lg:hidden",
    nav: "hidden items-center gap-1 lg:flex",
    navLink:
      "rounded-lg px-3 py-2 text-sm font-medium text-fg-muted transition hover:bg-surface-muted hover:text-fg",
    searchWrap: "hidden min-w-0 flex-1 md:block md:max-w-xs lg:max-w-sm",
    actions: "ml-auto flex shrink-0 items-center gap-2",
    githubBtn: "inline-flex",
  },
  variants: {
    layout: {
      home: {
        inner: "mx-auto max-w-7xl",
      },
      docs: {},
    },
    scrolled: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      layout: "home",
      class: {
        root: "border-transparent bg-transparent shadow-none",
      },
    },
    {
      layout: "docs",
      scrolled: true,
      class: {
        root: [
          "border-border/80 bg-surface/95 shadow-sm shadow-black/5 backdrop-blur-md",
          "dark:border-white/10 dark:bg-surface/95",
        ].join(" "),
      },
    },
    {
      layout: "docs",
      scrolled: false,
      class: {
        root: "border-transparent bg-transparent shadow-none",
      },
    },
  ],
  defaultVariants: { layout: "home", scrolled: false },
});

export const homeButtonStyles = tv({
  slots: {
    primary:
      "inline-flex items-center justify-center rounded-xl bg-echo-500 px-6 py-3 text-sm font-semibold text-stone-950 shadow-sm transition hover:bg-echo-400 active:scale-[0.98]",
    secondary:
      "inline-flex items-center justify-center rounded-xl border border-border bg-surface-elevated px-6 py-3 text-sm font-semibold text-fg shadow-sm transition hover:border-echo-500/25 hover:bg-echo-50/60 dark:hover:bg-echo-950/30",
  },
});

export const homeFooterStyles = tv({
  slots: {
    root: "mt-8 border-t border-border/80 py-12",
    inner: "flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between",
    brand: "max-w-xs",
    brandName: "text-lg font-bold text-fg",
    brandTag: "mt-2 text-sm text-fg-muted",
    links: "flex flex-wrap gap-x-8 gap-y-3",
    link: "text-sm font-medium text-fg-muted transition hover:text-echo-600 dark:hover:text-echo-400",
    bottom: "mt-10 flex flex-col gap-2 border-t border-border/60 pt-8 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between",
  },
});
