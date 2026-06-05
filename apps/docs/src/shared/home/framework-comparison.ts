export type FrameworkId = "react" | "vue" | "angular" | "solid" | "svelte" | "echojs";

export type CellRating = "yes" | "partial" | "no";

export type FrameworkColumn = {
  id: FrameworkId;
  label: string;
  highlight?: boolean;
};

export const comparisonFrameworks: FrameworkColumn[] = [
  { id: "react", label: "React" },
  { id: "vue", label: "Vue" },
  { id: "angular", label: "Angular" },
  { id: "solid", label: "Solid" },
  { id: "svelte", label: "Svelte" },
  { id: "echojs", label: "EchoJS", highlight: true },
];

export type FeatureComparisonRow = {
  feature: string;
  hint?: string;
  values: Record<FrameworkId, CellRating>;
};

/** Feature matrix — qualitative comparison (docs landing). */
export const featureComparisonRows: FeatureComparisonRow[] = [
  {
    feature: "Fine-grained reactivity",
    hint: "Updates only what changed",
    values: {
      react: "partial",
      vue: "partial",
      angular: "partial",
      solid: "yes",
      svelte: "yes",
      echojs: "yes",
    },
  },
  {
    feature: "Virtual DOM reconciliation",
    values: {
      react: "yes",
      vue: "yes",
      angular: "yes",
      solid: "no",
      svelte: "partial",
      echojs: "no",
    },
  },
  {
    feature: "Predictable update cost",
    hint: "Work scales with deps, not tree size",
    values: {
      react: "partial",
      vue: "partial",
      angular: "partial",
      solid: "yes",
      svelte: "yes",
      echojs: "yes",
    },
  },
  {
    feature: "Integrated router",
    values: {
      react: "no",
      vue: "partial",
      angular: "yes",
      solid: "no",
      svelte: "no",
      echojs: "yes",
    },
  },
  {
    feature: "Integrated async data layer",
    values: {
      react: "no",
      vue: "no",
      angular: "partial",
      solid: "no",
      svelte: "no",
      echojs: "yes",
    },
  },
  {
    feature: "Provider-based app composition",
    values: {
      react: "partial",
      vue: "partial",
      angular: "yes",
      solid: "partial",
      svelte: "no",
      echojs: "yes",
    },
  },
  {
    feature: "TypeScript-first APIs",
    values: {
      react: "partial",
      vue: "partial",
      angular: "yes",
      solid: "yes",
      svelte: "partial",
      echojs: "yes",
    },
  },
  {
    feature: "Low ceremony in views",
    hint: "No hook rules / effect ordering puzzles",
    values: {
      react: "partial",
      vue: "yes",
      angular: "partial",
      solid: "yes",
      svelte: "yes",
      echojs: "yes",
    },
  },
];

export type PerformanceRow = {
  metric: string;
  unit: string;
  lowerIsBetter: boolean;
  /** Mock lab numbers — replace when benchmarks are published. */
  values: Record<FrameworkId, number>;
};

export const performanceDisclaimer =
  "Mock benchmark data for layout preview only. Numbers are illustrative until official EchoJS lab results ship.";

/** Mock performance comparison (replace with real benchmarks). */
export const performanceComparisonRows: PerformanceRow[] = [
  {
    metric: "Cold start",
    unit: "ms",
    lowerIsBetter: true,
    values: { react: 48, vue: 41, angular: 62, solid: 29, svelte: 34, echojs: 22 },
  },
  {
    metric: "10k signal updates",
    unit: "ms",
    lowerIsBetter: true,
    values: { react: 38, vue: 31, angular: 44, solid: 12, svelte: 18, echojs: 9 },
  },
  {
    metric: "List reorder (1k items)",
    unit: "ms",
    lowerIsBetter: true,
    values: { react: 52, vue: 46, angular: 58, solid: 21, svelte: 24, echojs: 14 },
  },
  {
    metric: "Memory after mount",
    unit: "MB",
    lowerIsBetter: true,
    values: { react: 11.2, vue: 9.8, angular: 14.5, solid: 6.4, svelte: 7.1, echojs: 5.6 },
  },
  {
    metric: "Core runtime baseline",
    unit: "KB gzip",
    lowerIsBetter: true,
    values: { react: 42, vue: 34, angular: 58, solid: 7, svelte: 6, echojs: 18 },
  },
];

export const frameworkComparisonArticles = [
  {
    frameworkId: "react" as const,
    contentId: "comparisons/react" as const,
    title: "EchoJS vs React + ecosystem",
    available: true,
  },
  {
    frameworkId: "vue" as const,
    contentId: "comparisons/vue" as const,
    title: "EchoJS vs Vue + ecosystem",
    available: true,
  },
  {
    frameworkId: "angular" as const,
    contentId: "comparisons/angular" as const,
    title: "EchoJS vs Angular",
    available: true,
  },
  {
    frameworkId: "solid" as const,
    contentId: "comparisons/solid" as const,
    title: "EchoJS vs Solid",
    available: true,
  },
  {
    frameworkId: "svelte" as const,
    contentId: "comparisons/svelte" as const,
    title: "EchoJS vs Svelte",
    available: true,
  },
] as const;

export type WhyChooseEchoCard = {
  id: string;
  icon: string;
  title: string;
  body: string;
};

export const whyChooseEchoCards: WhyChooseEchoCard[] = [
  {
    id: "signals",
    icon: "⚡",
    title: "Signal-first runtime",
    body: "Surgical DOM writes without a VDOM diff pass.",
  },
  {
    id: "ecosystem",
    icon: "◉",
    title: "Integrated toolkit",
    body: "Router, query, UI, and i18n plug in through one provider model.",
  },
  {
    id: "architecture",
    icon: "▦",
    title: "Feature-first layout",
    body: "Vertical slices with explicit boundaries — not one growing components folder.",
  },
  {
    id: "typescript",
    icon: "TS",
    title: "TypeScript-native",
    body: "Typed routes, query keys, and VMs from bootstrap to the view layer.",
  },
];
