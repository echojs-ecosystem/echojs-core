import type { ContentId } from "@core/content/types.js";

export type ArchitectureLayer = {
  id: string;
  name: string;
  hint: string;
  emphasis: "default" | "foundation";
};

export type ArchitectureAdvantage = {
  id: string;
  title: string;
  summary: string;
  highlight: string;
  docId: ContentId;
};

/** Visual layer stack from /docs/architecture/overview. */
export const architectureLayers: ArchitectureLayer[] = [
  { id: "app", name: "app", hint: "bootstrap & providers", emphasis: "default" },
  { id: "pages", name: "pages", hint: "routes & model-view", emphasis: "default" },
  { id: "widgets", name: "widgets", hint: "composite UI blocks", emphasis: "default" },
  { id: "features", name: "features", hint: "user capabilities", emphasis: "foundation" },
  { id: "entities", name: "entities", hint: "domain & route tables", emphasis: "default" },
  { id: "shared", name: "shared", hint: "tokens, utils, content", emphasis: "default" },
];

/** Landing-page digest — why the layered stack is a competitive advantage. */
export const architectureAdvantages: ArchitectureAdvantage[] = [
  {
    id: "layers",
    title: "Six layers, one direction",
    summary:
      "Each folder has a single job. Imports flow upward only — shared never imports pages, features stay isolated.",
    highlight: "Refactors stay local as the codebase grows.",
    docId: "architecture/overview",
  },
  {
    id: "feature-first",
    title: "Feature-first by default",
    summary:
      "Organize by what users do — search, checkout, locale — not by components/, hooks/, utils/ at the repo root.",
    highlight: "Onboarding maps to product areas, not file types.",
    docId: "architecture/feature-first",
  },
  {
    id: "model-view",
    title: "Model · View at every level",
    summary:
      "Models own signals, effects, and data; views map a VM to HyperDOM. No fetch in views, no DOM in models.",
    highlight: "Test behavior without rendering the tree.",
    docId: "architecture/models",
  },
  {
    id: "dependency-flow",
    title: "Boundaries you can enforce",
    summary:
      "Layer rules are documented and lintable — wrong imports fail in CI instead of rotting quietly for months.",
    highlight: "@echojs-ecosystem/architect catches cross-layer leaks early.",
    docId: "architecture/dependency-flow",
  },
];
