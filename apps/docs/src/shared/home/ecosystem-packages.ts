import type { ContentId } from "@shared/content/types.js";

export type EcosystemPackage = {
  name: string;
  shortName: string;
  description: string;
  contentId: ContentId;
  icon: string;
};

export const ecosystemPackages: EcosystemPackage[] = [
  {
    name: "@echojs/reactivity",
    shortName: "reactivity",
    description: "Signals, computed, effects — the reactive core.",
    contentId: "packages/reactivity",
    icon: "⚡",
  },
  {
    name: "@echojs/hyperdom",
    shortName: "hyperdom",
    description: "Fine-grained DOM runtime without a virtual DOM.",
    contentId: "packages/hyperdom",
    icon: "◆",
  },
  {
    name: "@echojs/framework",
    shortName: "framework",
    description: "App bootstrap, providers, and composition root.",
    contentId: "packages/framework",
    icon: "◎",
  },
  {
    name: "@echojs/router",
    shortName: "router",
    description: "Type-safe, file-oriented routing for Echo apps.",
    contentId: "packages/router",
    icon: "⤳",
  },
  {
    name: "@echojs/store",
    shortName: "store",
    description: "Structured state with actions and selectors.",
    contentId: "packages/store",
    icon: "▣",
  },
  {
    name: "@echojs/query",
    shortName: "query",
    description: "Signal-native data fetching and cache layer.",
    contentId: "packages/query",
    icon: "↻",
  },
  {
    name: "@echojs/url-state",
    shortName: "url-state",
    description: "Sync UI state with URL search params.",
    contentId: "packages/url-state",
    icon: "🔗",
  },
  {
    name: "@echojs/persist",
    shortName: "persist",
    description: "Persist stores and signals to storage.",
    contentId: "packages/persist",
    icon: "💾",
  },
  {
    name: "@echojs/ui",
    shortName: "ui",
    description: "Accessible UI primitives built on HyperDOM.",
    contentId: "packages/ui",
    icon: "◈",
  },
  {
    name: "@echojs/i18n",
    shortName: "i18n",
    description: "Lightweight internationalization for Echo apps.",
    contentId: "packages/i18n",
    icon: "🌐",
  },
  {
    name: "@echojs/devtools",
    shortName: "devtools",
    description: "Developer tools for debugging Echo applications.",
    contentId: "packages/devtools",
    icon: "🔧",
  },
  {
    name: "@echojs/cli",
    shortName: "cli",
    description: "Scaffold apps and feature slices (planned).",
    contentId: "packages/cli",
    icon: "⌘",
  },
];

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

export const architectureLayers = [
  { name: "App", width: "w-[42%]", hint: "Bootstrap & providers" },
  { name: "Pages", width: "w-[52%]", hint: "Routes & layouts" },
  { name: "Widgets", width: "w-[62%]", hint: "Composed UI regions" },
  { name: "Features", width: "w-[72%]", hint: "User scenarios" },
  { name: "Entities", width: "w-[82%]", hint: "Domain models" },
  { name: "Shared", width: "w-full", hint: "Utilities & types" },
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

export const homeFooterLinks = [
  { label: "Getting Started", contentId: "getting-started/installation" as const },
  { label: "Architecture", contentId: "architecture/overview" as const },
  { label: "Packages", contentId: "packages/framework" as const },
  { label: "API Reference", contentId: "api/index" as const },
] as const;
