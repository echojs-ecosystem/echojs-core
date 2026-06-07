import type { IdeaCategory, RoadmapColumn } from "@entities/roadmap/types/roadmap.types.js";

export const roadmapColumns: RoadmapColumn[] = [
  {
    status: "planned",
    title: "Planned",
    description: "Scoped and queued — not started yet.",
    items: [
      {
        id: "cli",
        title: "CLI (`echojs create`)",
        description: "Project scaffolding, presets, and workspace tooling.",
        tags: ["dx", "tooling"],
      },
      {
        id: "devtools-overlay",
        title: "DevTools browser overlay",
        description: "Inspect signals, queries, and router state in the running app.",
        tags: ["devtools"],
      },
      {
        id: "ssr",
        title: "SSR / SSG",
        description: "Server rendering and static generation for docs and product sites.",
        tags: ["framework"],
      },
      {
        id: "stories",
        title: "HyperDOM component stories",
        description: "Storybook-style playground for UI primitives and patterns.",
        tags: ["ui", "dx"],
      },
    ],
  },
  {
    status: "in-progress",
    title: "In progress",
    description: "Actively being designed, built, or documented.",
    items: [
      {
        id: "ui-package",
        title: "UI package expansion",
        description: "More primitives, accessibility polish, and theme tokens.",
        tags: ["ui"],
      },
      {
        id: "examples",
        title: "Interactive examples",
        description: "Todo, dashboard, admin, and e-commerce reference apps.",
        tags: ["docs"],
      },
      {
        id: "agents",
        title: "Agents documentation",
        description: "Guides for building and wiring AI agents in EchoJS apps.",
        tags: ["docs"],
      },
      {
        id: "form-adapters",
        title: "Form UI adapters",
        description: "Deeper integration between @echojs-ecosystem/form and UI inputs.",
        tags: ["form"],
      },
    ],
  },
  {
    status: "shipped",
    title: "Shipped",
    description: "Available today in the ecosystem.",
    items: [
      {
        id: "core-packages",
        title: "Core packages",
        description: "Reactivity, HyperDOM, framework, router, store, query, url-state, persist, i18n.",
        tags: ["core"],
      },
      {
        id: "form-package",
        title: "Form package",
        description: "createField, createForm, bindField, and Standard Schema validation.",
        tags: ["form"],
      },
      {
        id: "docs-site",
        title: "Documentation site",
        description: "Guides, package references, comparisons, and live playgrounds.",
        tags: ["docs"],
      },
      {
        id: "architect",
        title: "Architect lint",
        description: "Layer rules and import boundaries for monorepos and apps.",
        tags: ["tooling"],
      },
    ],
  },
];

export const ideaCategoryOptions: { value: IdeaCategory; label: string }[] = [
  { value: "feature", label: "Feature" },
  { value: "docs", label: "Documentation" },
  { value: "dx", label: "Developer experience" },
  { value: "ecosystem", label: "Ecosystem / integrations" },
];

export const roadmapGithubRepo = "https://github.com/echojs/echojs";
