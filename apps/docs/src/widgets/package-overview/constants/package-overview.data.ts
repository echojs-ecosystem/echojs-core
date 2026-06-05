import type { ContentId } from "@core/content/types.js";

export type PackagePillar = { title: string; body: string; icon: string };
export type PackageLearnStep = { title: string; description: string; contentId: ContentId };

export type PackageOverviewData = {
  id: string;
  npmPackage: string;
  icon: string;
  tagline: string;
  summary: string;
  pills: string[];
  pillars: PackagePillar[];
  whenToUse: string[];
  whenNot: string[];
  dependsOn: string[];
  powers: string[];
  learnPath: PackageLearnStep[];
  relatedIds: string[];
};

const step = (pkgId: string, slug: string, title: string, description: string): PackageLearnStep => ({
  title,
  description,
  contentId: `packages/${pkgId}/${slug}` as ContentId,
});

export const packageOverviewById: Record<string, PackageOverviewData> = {
  reactivity: {
    id: "reactivity",
    npmPackage: "@echojs-ecosystem/reactivity",
    icon: "⚡",
    tagline: "Fine-grained reactive primitives",
    summary:
      "The foundation of EchoJS. Libraries subscribe to signals instead of diffing a virtual tree. Small API: signal, computed, effect, batch — predictable updates and explicit dependencies.",
    pills: ["signal", "computed", "effect", "batch"],
    pillars: [
      { icon: "◎", title: "Signals", body: "Mutable cells: .value(), .set(), .update()." },
      { icon: "ƒ", title: "Computed", body: "Cached derived values from dependencies." },
      { icon: "↻", title: "Effects", body: "Side effects that track signal reads." },
    ],
    whenToUse: ["Local state in createModel", "Any reactive subscription", "Derived UI with computed"],
    whenNot: ["Remote server cache → @echojs-ecosystem/query", "Cross-route session → @echojs-ecosystem/store"],
    dependsOn: [],
    powers: ["hyperdom", "store", "query", "router"],
    learnPath: [
      step("reactivity", "installation", "Installation", "Add the package."),
      step("reactivity", "usage", "Usage", "Patterns and performance."),
      step("reactivity", "playground", "Playground", "Live signals demo."),
      step("reactivity", "example", "Example", "Code from example app."),
      step("reactivity", "api", "API", "Export reference."),
    ],
    relatedIds: ["hyperdom", "store"],
  },
  hyperdom: {
    id: "hyperdom",
    npmPackage: "@echojs-ecosystem/hyperdom",
    icon: "◆",
    tagline: "Direct DOM rendering",
    summary:
      "Maps views to real DOM nodes. Reactive children and props register effects — only what changed updates. No VDOM reconciliation.",
    pills: ["h()", "createView", "createModel", "Show"],
    pillars: [
      { icon: "◇", title: "Views", body: "createView — UI with context checks." },
      { icon: "▣", title: "Models", body: "State + actions; createComponent at page edge." },
      { icon: "→", title: "Direct DOM", body: "h() / DSL + render()." },
    ],
    whenToUse: ["All EchoJS UI", "Reactive () => child", "Features and pages"],
    whenNot: ["fetch in .view.ts", "App bootstrap → framework"],
    dependsOn: ["@echojs-ecosystem/reactivity"],
    powers: ["ui", "router"],
    learnPath: [
      step("hyperdom", "installation", "Installation", "With reactivity."),
      step("hyperdom", "usage", "Usage", "Views and models."),
      step("hyperdom", "playground", "Playground", "Show demo."),
      step("hyperdom", "example", "Example", "Counter feature."),
      step("hyperdom", "api", "API", "Full API."),
    ],
    relatedIds: ["reactivity", "framework"],
  },
  framework: {
    id: "framework",
    npmPackage: "@echojs-ecosystem/framework",
    icon: "◎",
    tagline: "Application shell",
    summary:
      "createEchoApp wires providers (router, query, i18n, UI) and mounts HyperDOM. Composition root for every SPA.",
    pills: ["createEchoApp", "createProvider", "provide"],
    pillars: [
      { icon: "⊕", title: "Bootstrap", body: ".use().mount('#app')." },
      { icon: "⚙", title: "Providers", body: "Shared services once at startup." },
      { icon: "⌂", title: "Root", body: "Router or static view." },
    ],
    whenToUse: ["App entry", "DI via provide/inject", "Custom docs chrome"],
    whenNot: ["Leaf widgets", "Low-level signals"],
    dependsOn: ["@echojs-ecosystem/hyperdom"],
    powers: ["router", "query", "i18n", "ui"],
    learnPath: [
      step("framework", "installation", "Installation", "Framework stack."),
      step("framework", "usage", "Usage", "Providers."),
      step("framework", "playground", "Playground", "Bootstrap notes."),
      step("framework", "example", "Example", "docs & example apps."),
      step("framework", "api", "API", "Exports."),
    ],
    relatedIds: ["router", "query"],
  },
  router: {
    id: "router",
    npmPackage: "@echojs-ecosystem/router",
    icon: "⤳",
    tagline: "Typed SPA routing",
    summary:
      "Routes are signal-backed objects, not components. createRoutes + createRouter sync URL ↔ state; NavLink for SPA navigation.",
    pills: ["createRouteView", "NavLink", "beforeLoad"],
    pillars: [
      { icon: "🗂", title: "Tree", body: "Layouts, pages, lazy routes." },
      { icon: "🔗", title: "Navigate", body: "go(), guards, redirects." },
      { icon: "📡", title: "State", body: "$path, $activePage, $pending." },
    ],
    whenToUse: ["Multi-page apps", "Guards", "Route data hooks"],
    whenNot: ["Query params only → url-state"],
    dependsOn: ["@echojs-ecosystem/reactivity", "@echojs-ecosystem/hyperdom"],
    powers: ["url-state"],
    learnPath: [
      step("router", "installation", "Installation", "Router + hyperdom."),
      step("router", "usage", "Usage", "Trees & NavLink."),
      step("router", "playground", "Playground", "Memory router."),
      step("router", "example", "Example", "docs routes."),
      step("router", "api", "API", "Reference."),
    ],
    relatedIds: ["url-state", "framework"],
  },
  store: {
    id: "store",
    npmPackage: "@echojs-ecosystem/store",
    icon: "▣",
    tagline: "Structured client state",
    summary:
      "Stores on signals with set/update/reset, events, and .extend() for actions. select/combine for derived readonly state.",
    pills: ["createStore", "withActions", "select"],
    pillars: [
      { icon: "▢", title: "Store", body: "Named module state." },
      { icon: "⚡", title: "Actions", body: "withActions factories." },
      { icon: "⊂", title: "Derived", body: "select / combine." },
    ],
    whenToUse: ["Auth, theme, shared prefs", "entity/* modules"],
    whenNot: ["Page VM → model signals", "API lists → query"],
    dependsOn: ["@echojs-ecosystem/reactivity"],
    powers: ["persist"],
    learnPath: [
      step("store", "installation", "Installation", "Store package."),
      step("store", "usage", "Usage", "Actions & events."),
      step("store", "playground", "Playground", "Counter & theme."),
      step("store", "example", "Example", "state.model."),
      step("store", "api", "API", "Reference."),
    ],
    relatedIds: ["persist", "query"],
  },
  query: {
    id: "query",
    npmPackage: "@echojs-ecosystem/query",
    icon: "↻",
    tagline: "Async cache for models",
    summary:
      "TanStack-inspired layer without hooks: createQuery + .with(() => params) in models; signal status for views.",
    pills: ["createQuery", ".with()", "createMutation"],
    pillars: [
      { icon: "📋", title: "Definition", body: "queryKey + queryFn." },
      { icon: "🔌", title: "Instance", body: "Reactive params binding." },
      { icon: "🌐", title: "Client", body: "invalidate & prefetch." },
    ],
    whenToUse: ["API in models", "Loading UI", "Mutations"],
    whenNot: ["UI toggles", "URL filters"],
    dependsOn: ["@echojs-ecosystem/reactivity"],
    powers: ["framework"],
    learnPath: [
      step("query", "installation", "Installation", "Query provider."),
      step("query", "usage", "Usage", "Queries & abort."),
      step("query", "playground", "Playground", "Fake fetch."),
      step("query", "example", "Example", "query-demo."),
      step("query", "api", "API", "Reference."),
    ],
    relatedIds: ["framework", "store"],
  },
  "url-state": {
    id: "url-state",
    npmPackage: "@echojs-ecosystem/url-state",
    icon: "🔗",
    tagline: "Typed URL params",
    summary: "nuqs-style search params: parsers, createQueryParams, router adapter — signal-friendly.",
    pills: ["createQueryParams", "parseAs*", "urlKeys"],
    pillars: [
      { icon: "🔤", title: "Parsers", body: "Typed defaults." },
      { icon: "📎", title: "Groups", body: "Object of params." },
      { icon: "🧭", title: "Router", body: "SPA URL sync." },
    ],
    whenToUse: ["Filters in URL", "Shareable state", "Catalog pages"],
    whenNot: ["Path segments", "Server cache"],
    dependsOn: ["@echojs-ecosystem/reactivity"],
    powers: ["router"],
    learnPath: [
      step("url-state", "installation", "Installation", "With router."),
      step("url-state", "usage", "Usage", "Parsers & history."),
      step("url-state", "playground", "Playground", "Memory URL."),
      step("url-state", "example", "Example", "Products page."),
      step("url-state", "api", "API", "Reference."),
    ],
    relatedIds: ["router"],
  },
  persist: {
    id: "persist",
    npmPackage: "@echojs-ecosystem/persist",
    icon: "💾",
    tagline: "Storage extensions",
    summary: "Persist stores via .extend(localStorage | cookie | …). hydrate/save/clear on .persist controller.",
    pills: ["withLocalStorage", "withCookie", "migrate"],
    pillars: [
      { icon: "💿", title: "Adapters", body: "local, session, cookie, IDB." },
      { icon: "🔀", title: "Slice", body: "select + merge." },
      { icon: "📦", title: "Version", body: "TTL & migrate." },
    ],
    whenToUse: ["Theme, auth, drafts", "entity/session"],
    whenNot: ["Without store", "Huge cookies"],
    dependsOn: ["@echojs-ecosystem/store"],
    powers: [],
    learnPath: [
      step("persist", "installation", "Installation", "persist + store."),
      step("persist", "usage", "Usage", "Hydrate & logout."),
      step("persist", "playground", "Playground", "Memory counter."),
      step("persist", "example", "Example", "auth-store."),
      step("persist", "api", "API", "Reference."),
    ],
    relatedIds: ["store"],
  },
  i18n: {
    id: "i18n",
    npmPackage: "@echojs-ecosystem/i18n",
    icon: "🌐",
    tagline: "i18n & Intl",
    summary: "Typed keys from JSON, lazy locales, plural/interpolation, Intl helpers. createI18nProvider for apps.",
    pills: ["createI18n", "t()", "setLocale"],
    pillars: [
      { icon: "🗣", title: "Messages", body: "Nested JSON keys." },
      { icon: "🔄", title: "Locales", body: "Eager + lazy imports." },
      { icon: "🌍", title: "Intl", body: "number, date, currency." },
    ],
    whenToUse: ["All UI strings", "Locale switcher"],
    whenNot: ["Build-time only text"],
    dependsOn: ["@echojs-ecosystem/reactivity"],
    powers: ["framework"],
    learnPath: [
      step("i18n", "installation", "Installation", "Locales setup."),
      step("i18n", "usage", "Usage", "Provider & plural."),
      step("i18n", "playground", "Playground", "en / ru switch."),
      step("i18n", "example", "Example", "docs locales."),
      step("i18n", "api", "API", "Reference."),
    ],
    relatedIds: ["framework"],
  },
  ui: {
    id: "ui",
    npmPackage: "@echojs-ecosystem/ui",
    icon: "◈",
    tagline: "UI components",
    summary: "Accessible HyperDOM components — Button, Field, Input — theme via UIProvider. Docs expanding.",
    pills: ["Button", "Field", "UIProvider"],
    pillars: [
      { icon: "◈", title: "Components", body: "Composable primitives." },
      { icon: "🎨", title: "Theme", body: "Tokens & variants." },
      { icon: "♿", title: "A11y", body: "ARIA & semantics." },
    ],
    whenToUse: ["Forms & actions", "Design system"],
    whenNot: ["Docs markdown layout"],
    dependsOn: ["@echojs-ecosystem/hyperdom"],
    powers: [],
    learnPath: [
      step("ui", "installation", "Installation", "UI package."),
      step("ui", "usage", "Usage", "Coming soon."),
      step("ui", "playground", "Playground", "Button demo."),
      step("ui", "example", "Example", "Storybook."),
      step("ui", "api", "API", "Coming soon."),
    ],
    relatedIds: ["hyperdom", "framework"],
  },
  devtools: {
    id: "devtools",
    npmPackage: "@echojs-ecosystem/devtools",
    icon: "🔧",
    tagline: "DevTools (planned)",
    summary:
      "Runtime registry and timeline for EchoJS DevTools. Integrates with store, query, router — UI overlay planned.",
    pills: ["planned"],
    pillars: [
      { icon: "👁", title: "Signals", body: "Dependency inspect." },
      { icon: "📊", title: "Query", body: "Cache view." },
      { icon: "🧪", title: "Routes", body: "Match chain." },
    ],
    whenToUse: ["Local debug"],
    whenNot: ["Production"],
    dependsOn: ["@echojs-ecosystem/reactivity"],
    powers: [],
    learnPath: [
      step("devtools", "installation", "Installation", "Planned."),
      step("devtools", "usage", "Usage", "Planned."),
      step("devtools", "playground", "Playground", "Planned."),
      step("devtools", "api", "API", "Planned."),
    ],
    relatedIds: ["framework"],
  },
  cli: {
    id: "cli",
    npmPackage: "@echojs-ecosystem/cli",
    icon: "⌘",
    tagline: "CLI (planned)",
    summary: "Scaffold apps and feature slices aligned with feature-first layout.",
    pills: ["planned"],
    pillars: [
      { icon: "✨", title: "create", body: "New app." },
      { icon: "⚙", title: "generate", body: "Feature stubs." },
      { icon: "✓", title: "doctor", body: "Structure check." },
    ],
    whenToUse: ["Greenfield", "CI checks"],
    whenNot: ["Runtime"],
    dependsOn: [],
    powers: [],
    learnPath: [
      step("cli", "installation", "Installation", "Planned."),
      step("cli", "usage", "Usage", "Planned."),
      step("cli", "playground", "Playground", "Planned."),
      step("cli", "api", "API", "Planned."),
    ],
    relatedIds: ["framework"],
  },
  architect: {
    id: "architect",
    npmPackage: "@echojs-ecosystem/architect",
    icon: "🏛",
    tagline: "Architecture linter",
    summary:
      "Lint layer imports, public APIs, and folder contracts from architect.config.ts — the same rules the docs site runs in CI.",
    pills: ["layers", "public-api", "CI"],
    pillars: [
      { icon: "▦", title: "Layers", body: "Enforce dependency direction across app, pages, widgets, entities, shared." },
      { icon: "◉", title: "Public API", body: "Slices expose index.ts; deep imports are flagged." },
      { icon: "✓", title: "CI-ready", body: "echo-architect lint in watch or one-shot mode." },
    ],
    whenToUse: ["Monorepo apps", "Feature-first folders", "Onboarding & code review"],
    whenNot: ["Runtime behavior", "Unit test assertions"],
    dependsOn: [],
    powers: ["Layer graphs", "Import diagnostics", "Auto-fix stubs"],
    learnPath: [
      step("architect", "installation", "Installation", "Add to apps/docs or your app."),
      step("architect", "usage", "Usage", "Presets and allowDownward."),
      step("architect", "example", "Example", "Full docs-site config."),
      step("architect", "api", "API", "Programmatic lint API."),
    ],
    relatedIds: ["framework", "cli"],
  },
};

export const getPackageOverview = (id: string): PackageOverviewData | undefined =>
  packageOverviewById[id];
