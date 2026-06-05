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

    heroVisual: "relative z-10",
    heroVisualStack: "flex flex-col",
    section: "relative py-20 sm:py-24",
    sectionInner: "relative",
    sectionHeader: "mx-auto mb-14 max-w-2xl text-center",
    sectionEyebrow:
      "mb-4 inline-flex items-center rounded-full border border-echo-500/25 bg-echo-500/12 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-echo-800 dark:border-echo-500/30 dark:bg-echo-500/10 dark:text-echo-400",
    sectionTitle: "text-3xl font-bold tracking-tight text-fg sm:text-4xl",
    sectionLead: "mt-4 text-base leading-relaxed text-fg-muted sm:text-lg",

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
