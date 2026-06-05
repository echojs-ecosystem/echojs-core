import type { ContentId } from "@core/content/types.js";

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
  {
    name: "@echojs/architect",
    shortName: "architect",
    description: "Architecture linter — layers, public APIs, import boundaries.",
    contentId: "packages/architect",
    icon: "🏛",
  },
];
