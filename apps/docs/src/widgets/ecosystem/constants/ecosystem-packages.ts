import type { ContentId } from "@core/content/types.js";

export type EcosystemPackage = {
  name: string;
  shortName: string;
  description: string;
  contentId: ContentId;
  icon: string;
  featured?: boolean;
};

export const ecosystemPackages: EcosystemPackage[] = [
  {
    name: "@echojs-ecosystem/reactivity",
    shortName: "reactivity",
    description: "Signals, computed, effects — the reactive core.",
    contentId: "packages/reactivity",
    icon: "⚡",
  },
  {
    name: "@echojs-ecosystem/hyperdom",
    shortName: "hyperdom",
    description: "Fine-grained DOM runtime without a virtual DOM.",
    contentId: "packages/hyperdom",
    icon: "◆",
  },
  {
    name: "@echojs-ecosystem/framework",
    shortName: "framework",
    description: "App bootstrap, providers, and composition root.",
    contentId: "packages/framework",
    icon: "◎",
    featured: true,
  },
  {
    name: "@echojs-ecosystem/router",
    shortName: "router",
    description: "Type-safe, file-oriented routing for Echo apps.",
    contentId: "packages/router",
    icon: "⤳",
  },
  {
    name: "@echojs-ecosystem/store",
    shortName: "store",
    description: "Structured state with actions and selectors.",
    contentId: "packages/store",
    icon: "▣",
  },
  {
    name: "@echojs-ecosystem/query",
    shortName: "query",
    description: "Signal-native data fetching and cache layer.",
    contentId: "packages/query",
    icon: "↻",
  },
  {
    name: "@echojs-ecosystem/url-state",
    shortName: "url-state",
    description: "Sync UI state with URL search params.",
    contentId: "packages/url-state",
    icon: "🔗",
  },
  {
    name: "@echojs-ecosystem/persist",
    shortName: "persist",
    description: "Persist stores and signals to storage.",
    contentId: "packages/persist",
    icon: "💾",
  },
  {
    name: "@echojs-ecosystem/ui",
    shortName: "ui",
    description: "Accessible UI primitives built on HyperDOM.",
    contentId: "packages/ui",
    icon: "◈",
  },
  {
    name: "@echojs-ecosystem/i18n",
    shortName: "i18n",
    description: "Lightweight internationalization for Echo apps.",
    contentId: "packages/i18n",
    icon: "🌐",
  },
  {
    name: "@echojs-ecosystem/devtools",
    shortName: "devtools",
    description: "Developer tools for debugging Echo applications.",
    contentId: "packages/devtools",
    icon: "🔧",
  },
  {
    name: "@echojs-ecosystem/cli",
    shortName: "cli",
    description: "Scaffold apps and feature slices (planned).",
    contentId: "packages/cli",
    icon: "⌘",
  },
  {
    name: "@echojs-ecosystem/architect",
    shortName: "architect",
    description: "Architecture linter — layers, public APIs, import boundaries.",
    contentId: "packages/architect",
    icon: "🏛",
  },
];

export const ecosystemFrameworkPackage = ecosystemPackages.find((pkg) => pkg.featured)!;

export const ecosystemModulePackages = ecosystemPackages.filter((pkg) => !pkg.featured);
