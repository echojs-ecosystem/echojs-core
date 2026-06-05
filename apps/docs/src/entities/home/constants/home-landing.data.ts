export const whyEchoCards = [
  {
    title: "Signals",
    body: "Fine-grained reactivity without a virtual DOM. Updates only what changed.",
    icon: "⚡",
  },
  {
    title: "Architecture",
    body: "Feature-first layers with explicit boundaries for large codebases.",
    icon: "🏗",
  },
  {
    title: "TypeScript",
    body: "End-to-end type safety from routes to queries and UI props.",
    icon: "TS",
  },
  {
    title: "Ecosystem",
    body: "Router, Query, Store, UI, i18n — compose only what you need.",
    icon: "◉",
  },
] as const;

export const homeStats = [
  { value: "11+", label: "Packages" },
  { value: "Zero", label: "Virtual DOM" },
  { value: "100%", label: "TypeScript" },
] as const;

export const heroPills = [
  "Fine-grained signals",
  "No reconciliation",
  "Provider composition",
  "Typed routes",
] as const;

export const vdomCompare = {
  traditional: {
    title: "Virtual DOM",
    items: ["Full tree diffing", "Component-level updates", "Runtime reconciliation overhead"],
  },
  echojs: {
    title: "EchoJS Signals",
    items: ["Targeted DOM writes", "Signal-driven updates", "Predictable, minimal work"],
  },
} as const;
