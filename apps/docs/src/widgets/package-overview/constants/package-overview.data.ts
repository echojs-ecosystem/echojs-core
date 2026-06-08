import type { ContentId } from '@core/content/types'

export type PackagePillar = { title: string; body: string; icon: string }
export type PackageLearnStep = {
  title: string
  description: string
  contentId: ContentId
}
export type PackageWhyCard = { title: string; body: string; icon: string }
export type PackageLifecycleStep = { step: string; title: string; body: string }
export type PackageCodeExample = {
  title: string
  language: string
  code: string
}

export type PackageOverviewData = {
  id: string
  npmPackage: string
  frameworkImport?: string
  icon: string
  tagline: string
  heroTitle?: string
  summary: string
  pills: string[]
  pillars: PackagePillar[]
  whyTitle?: string
  whySubtitle?: string
  whyCards?: PackageWhyCard[]
  lifecycleTitle?: string
  lifecycleSubtitle?: string
  lifecycleSteps?: PackageLifecycleStep[]
  codeExample?: PackageCodeExample
  whenToUse: string[]
  whenNot: string[]
  dependsOn: string[]
  powers: string[]
  learnPath: PackageLearnStep[]
  relatedIds: string[]
}

const step = (
  pkgId: string,
  slug: string,
  title: string,
  description: string
): PackageLearnStep => ({
  title,
  description,
  contentId: `packages/${pkgId}/${slug}` as ContentId,
})

export const packageOverviewById: Record<string, PackageOverviewData> = {
  reactivity: {
    id: 'reactivity',
    npmPackage: '@echojs-ecosystem/reactivity',
    frameworkImport: '@echojs-ecosystem/framework/reactivity',
    icon: '⚡',
    tagline: 'Fine-grained reactive primitives',
    heroTitle: 'Stop hand-rolling reactive updates.',
    summary:
      'The foundation of EchoJS. Libraries subscribe to signals instead of diffing a virtual tree. Small API — signal, computed, effect, batch — with predictable updates and explicit dependencies.',
    pills: ['signal', 'computed', 'effect', 'batch', 'scope'],
    pillars: [
      {
        icon: '◎',
        title: 'Signals',
        body: 'Mutable cells: .value(), .set(), .update().',
      },
      {
        icon: 'ƒ',
        title: 'Computed',
        body: 'Cached derived values from dependencies.',
      },
      {
        icon: '↻',
        title: 'Effects',
        body: 'Side effects that track signal reads.',
      },
    ],
    whyTitle: 'Why Reactivity',
    whySubtitle:
      'Fine-grained state is not the same problem as server cache or global stores.',
    whyCards: [
      {
        icon: '◎',
        title: 'Important defaults do the boring work',
        body: 'Dependency tracking, batching, change-only subscriptions, and dev-time immutability guards are wired for real apps.',
      },
      {
        icon: '🔑',
        title: 'Signals are the cache contract',
        body: 'Reads via .value() declare dependencies. Computed caches invalidations. Effects re-run when tracked inputs change.',
      },
      {
        icon: '↻',
        title: 'Effects have a real lifecycle',
        body: 'Run immediately, re-run on change, dispose with stop(). Group work in scope() with cleanup() for timers and subscriptions.',
      },
      {
        icon: '👁',
        title: 'HyperDOM makes the graph visible',
        body: 'Reactive children and props register effects automatically — only what changed updates in the DOM.',
      },
    ],
    lifecycleTitle: 'Update lifecycle',
    lifecycleSubtitle: 'Keep UI in sync while writes stay predictable.',
    lifecycleSteps: [
      {
        step: '1',
        title: 'Write',
        body: 'signal.set / update changes a cell synchronously.',
      },
      {
        step: '2',
        title: 'Track',
        body: 'computed and effect subscribers collect dependencies on .value() reads.',
      },
      {
        step: '3',
        title: 'Batch',
        body: 'batch() coalesces multiple writes before notifications flush.',
      },
      {
        step: '4',
        title: 'Notify',
        body: 'Effects and HyperDOM reactive nodes run once with fresh values.',
      },
    ],
    codeExample: {
      title: 'Just a quick look…',
      language: 'ts',
      code: `import { signal, computed, effect } from "@echojs-ecosystem/reactivity";

const count = signal(0);
const double = computed(() => count.value() * 2);

effect(() => console.log(double.value()));

count.set(1);`,
    },
    whenToUse: [
      'Local state in createModel',
      'Any reactive subscription',
      'Derived UI with computed',
    ],
    whenNot: [
      'Remote server cache → @echojs-ecosystem/query',
      'Cross-route session → @echojs-ecosystem/store',
    ],
    dependsOn: [],
    powers: ['hyperdom', 'store', 'query', 'router'],
    learnPath: [
      step(
        'reactivity',
        'installation',
        'Installation',
        'Add the package to your app.'
      ),
      step(
        'reactivity',
        'guides/important-defaults',
        'Important Defaults',
        'Execution model and conventions.'
      ),
      step(
        'reactivity',
        'guides/signals',
        'Signals',
        'Writable cells and subscriptions.'
      ),
      step(
        'reactivity',
        'examples/counter',
        'Counter',
        'Minimal signal + view pattern.'
      ),
      step('reactivity', 'playground', 'Playground', 'Live signals demo.'),
      step('reactivity', 'api', 'API Reference', 'Full export reference.'),
    ],
    relatedIds: ['hyperdom', 'store'],
  },
  hyperdom: {
    id: 'hyperdom',
    npmPackage: '@echojs-ecosystem/hyperdom',
    frameworkImport: '@echojs-ecosystem/framework/hyperdom',
    icon: '◆',
    tagline: 'Direct DOM rendering',
    heroTitle: 'Map views to real DOM — no virtual tree.',
    summary:
      'Maps views to real DOM nodes. Reactive children and props register effects — only what changed updates. No VDOM reconciliation.',
    pills: ['h()', 'createView', 'createModel', 'Show', 'List'],
    pillars: [
      {
        icon: '◇',
        title: 'Views',
        body: 'createView — UI with context checks.',
      },
      {
        icon: '▣',
        title: 'Models',
        body: 'State + actions; createComponent at page edge.',
      },
      { icon: '→', title: 'Direct DOM', body: 'h() / DSL + render().' },
    ],
    whyTitle: 'Why HyperDOM',
    whySubtitle:
      'UI updates are not the same problem as a component diffing runtime.',
    whyCards: [
      {
        icon: '→',
        title: 'Direct DOM by default',
        body: 'h() and DSL tags create real nodes. Reactive regions patch only what changed.',
      },
      {
        icon: '◇',
        title: 'Views with guardrails',
        body: 'createView + strict context catch h() outside render scope early in dev.',
      },
      {
        icon: '↻',
        title: 'Reactive children & props',
        body: '() => child and getter props register effects from @echojs-ecosystem/reactivity.',
      },
      {
        icon: '▣',
        title: 'Model/view at the edge',
        body: 'createModel for state, createComponent to glue page-level UI.',
      },
    ],
    lifecycleTitle: 'Render lifecycle',
    lifecycleSubtitle: 'From view tree to mounted DOM and back.',
    lifecycleSteps: [
      {
        step: '1',
        title: 'Build',
        body: 'createView / h / DSL produce a Child tree.',
      },
      {
        step: '2',
        title: 'Mount',
        body: 'render(view, container) activates bindings.',
      },
      {
        step: '3',
        title: 'Update',
        body: 'Signal change → effect re-runs reactive nodes only.',
      },
      {
        step: '4',
        title: 'Teardown',
        body: 'dispose() clears listeners, effects, and DOM.',
      },
    ],
    codeExample: {
      title: 'Just a quick look…',
      language: 'ts',
      code: `import { render, div, button, span, Show } from "@echojs-ecosystem/hyperdom";
import { signal } from "@echojs-ecosystem/reactivity";

const $count = signal(0);

render(
  div(null, [
    button({ onClick: () => $count.update((n) => n + 1) }, "+1"),
    span(null, () => String($count.value())),
    Show(() => $count.value() > 0, () => span(null, "Positive")),
  ]),
  document.getElementById("app")!,
);`,
    },
    whenToUse: ['All EchoJS UI', 'Reactive () => child', 'Features and pages'],
    whenNot: ['fetch in .view.ts', 'App bootstrap → framework'],
    dependsOn: ['@echojs-ecosystem/reactivity'],
    powers: ['ui', 'router'],
    learnPath: [
      step(
        'hyperdom',
        'installation',
        'Installation',
        'Add HyperDOM + reactivity.'
      ),
      step(
        'hyperdom',
        'guides/important-defaults',
        'Important Defaults',
        'Strict context & conventions.'
      ),
      step(
        'hyperdom',
        'guides/views-and-dsl',
        'Views & DSL',
        'h() and tag helpers.'
      ),
      step('hyperdom', 'examples/counter', 'Counter', 'Minimal render demo.'),
      step('hyperdom', 'playground', 'Playground', 'Live Show demo.'),
      step('hyperdom', 'api', 'API Reference', 'Full export reference.'),
    ],
    relatedIds: ['reactivity', 'framework'],
  },
  framework: {
    id: 'framework',
    npmPackage: '@echojs-ecosystem/framework',
    icon: '◎',
    tagline: 'Application shell',
    heroTitle: 'Start here — one install for the whole stack.',
    summary:
      'createEchoApp is the composition root: register providers (router, query, i18n, UI), mount HyperDOM, and import every ecosystem module through `/app` or subpaths.',
    pills: ['Recommended', 'createEchoApp', 'subpaths', 'providers'],
    pillars: [
      { icon: '⊕', title: 'Bootstrap', body: ".use().mount('#app')." },
      {
        icon: '⚙',
        title: 'Providers',
        body: 'Shared services once at startup.',
      },
      { icon: '⌂', title: 'Root', body: 'Router or static view.' },
    ],
    whyTitle: 'Why Framework',
    whySubtitle: 'Apps need a composition root — not another UI library.',
    whyCards: [
      {
        icon: '⊕',
        title: 'Single entry',
        body: 'Install once, import @echojs-ecosystem/framework/app and subpaths you need.',
      },
      {
        icon: '⚙',
        title: 'Providers wired',
        body: 'Router, query, i18n, UI plug in via .use() before mount.',
      },
      {
        icon: '🔌',
        title: 'DI built in',
        body: 'provide/inject for app services without a separate container.',
      },
      {
        icon: '📦',
        title: 'Subpath map',
        body: 'Each ecosystem package re-exported — bundler pulls only what you import.',
      },
    ],
    lifecycleTitle: 'App bootstrap',
    lifecycleSubtitle: 'From createEchoApp to mounted root.',
    lifecycleSteps: [
      {
        step: '1',
        title: 'Create',
        body: 'createEchoApp({ strictContextChecks }).',
      },
      {
        step: '2',
        title: 'Use',
        body: 'Register providers — query, i18n, router.',
      },
      {
        step: '3',
        title: 'Mount',
        body: "mount('#app') renders root view or router outlet.",
      },
      {
        step: '4',
        title: 'Run',
        body: 'Subpath imports for features — reactivity, hyperdom, store…',
      },
    ],
    codeExample: {
      title: 'Just a quick look…',
      language: 'ts',
      code: `import { createEchoApp } from "@echojs-ecosystem/framework/app";
import { createQueryProvider } from "@echojs-ecosystem/framework/query";

createEchoApp()
  .use(createQueryProvider())
  .mount("#app");`,
    },
    whenToUse: ['App entry', 'DI via provide/inject', 'Custom docs chrome'],
    whenNot: ['Leaf widgets', 'Low-level signals'],
    dependsOn: ['@echojs-ecosystem/hyperdom'],
    powers: ['router', 'query', 'i18n', 'ui'],
    learnPath: [
      step(
        'framework',
        'installation',
        'Installation',
        'Meta-package install.'
      ),
      step(
        'framework',
        'guides/create-echo-app',
        'createEchoApp',
        'Bootstrap flow.'
      ),
      step(
        'framework',
        'guides/subpath-imports',
        'Subpath Imports',
        'Import map.'
      ),
      step('framework', 'examples/minimal-app', 'Minimal App', 'Smallest SPA.'),
      step('framework', 'api', 'API Reference', 'App exports.'),
    ],
    relatedIds: ['router', 'query'],
  },
  router: {
    id: 'router',
    npmPackage: '@echojs-ecosystem/router',
    frameworkImport: '@echojs-ecosystem/framework/router',
    icon: '⤳',
    tagline: 'Typed SPA routing',
    heroTitle: 'Routes as signals — not components.',
    summary:
      'Routes are signal-backed objects, not components. createRoutes + createRouter sync URL ↔ state; NavLink for SPA navigation.',
    pills: ['createRouteView', 'NavLink', 'beforeLoad', 'createRouter'],
    pillars: [
      { icon: '🗂', title: 'Tree', body: 'Layouts, pages, lazy routes.' },
      { icon: '🔗', title: 'Navigate', body: 'go(), guards, redirects.' },
      { icon: '📡', title: 'State', body: '$path, $activePage, $pending.' },
    ],
    whyTitle: 'Why Router',
    whySubtitle: 'URL state deserves the same reactivity as UI state.',
    whyCards: [
      {
        icon: '🗂',
        title: 'Typed route trees',
        body: 'Layouts, nested pages, lazy chunks — all as data, not JSX routes.',
      },
      {
        icon: '📡',
        title: 'Signal-backed URL',
        body: '$path and $activePage are reactive — views update without a router hook.',
      },
      {
        icon: '🔗',
        title: 'NavLink',
        body: 'SPA navigation with active styles and prefetch hooks.',
      },
      {
        icon: '🛡',
        title: 'Guards & beforeLoad',
        body: 'Auth, redirects, and route data before the page renders.',
      },
    ],
    lifecycleTitle: 'Navigation lifecycle',
    lifecycleSubtitle: 'Match URL → load data → render page.',
    lifecycleSteps: [
      {
        step: '1',
        title: 'Match',
        body: 'URL change → route tree resolves active page.',
      },
      {
        step: '2',
        title: 'Load',
        body: 'beforeLoad runs; lazy routes fetch chunks.',
      },
      {
        step: '3',
        title: 'Render',
        body: 'createRouteView mounts HyperDOM page.',
      },
      {
        step: '4',
        title: 'Navigate',
        body: 'go() / NavLink update history + signals.',
      },
    ],
    codeExample: {
      title: 'Just a quick look…',
      language: 'ts',
      code: `import { createRoutes, createRouter, NavLink } from "@echojs-ecosystem/framework/router";

const routes = createRoutes([
  { path: "/", name: "home", routeView: HomePage },
  { path: "/docs", name: "docs", routeView: DocsPage },
]);

const router = createRouter({ routes, history: createBrowserHistory() });`,
    },
    whenToUse: ['Multi-page apps', 'Guards', 'Route data hooks'],
    whenNot: ['Query params only → url-state'],
    dependsOn: ['@echojs-ecosystem/reactivity', '@echojs-ecosystem/hyperdom'],
    powers: ['url-state'],
    learnPath: [
      step('router', 'installation', 'Installation', 'Router + peers.'),
      step('router', 'guides/route-trees', 'Route Trees', 'Layouts & pages.'),
      step('router', 'guides/navigation', 'Navigation', 'NavLink & go().'),
      step('router', 'examples/docs-routes', 'Docs Routes', 'Real docs app.'),
      step('router', 'playground', 'Playground', 'Memory router.'),
      step('router', 'api', 'API Reference', 'Full reference.'),
    ],
    relatedIds: ['url-state', 'framework'],
  },
  store: {
    id: 'store',
    npmPackage: '@echojs-ecosystem/store',
    frameworkImport: '@echojs-ecosystem/framework/store',
    icon: '▣',
    tagline: 'Structured client state',
    heroTitle: 'Shared state with signal ergonomics.',
    summary:
      'Stores on signals with set/update/reset, events, and .extend() for actions. select/combine for derived readonly state.',
    pills: ['createStore', 'withActions', 'select', 'combine'],
    pillars: [
      { icon: '▢', title: 'Store', body: 'Named module state.' },
      { icon: '⚡', title: 'Actions', body: 'withActions factories.' },
      { icon: '⊂', title: 'Derived', body: 'select / combine.' },
    ],
    whyTitle: 'Why Store',
    whySubtitle: 'Page models are local — apps still need shared modules.',
    whyCards: [
      {
        icon: '▢',
        title: 'Named modules',
        body: 'Theme, auth, session — one store per concern in entity/*.',
      },
      {
        icon: '⚡',
        title: 'Actions via extend',
        body: 'withActions adds methods without breaking immutability.',
      },
      {
        icon: '⊂',
        title: 'Derived slices',
        body: 'select and combine expose readonly views of store state.',
      },
      {
        icon: '📣',
        title: 'Events',
        body: 'Subscribe to store changes for logging or cross-module reactions.',
      },
    ],
    lifecycleTitle: 'Store lifecycle',
    lifecycleSubtitle: 'Create, mutate, derive, reset.',
    lifecycleSteps: [
      {
        step: '1',
        title: 'Create',
        body: 'createStore(initial) in entity module.',
      },
      {
        step: '2',
        title: 'Extend',
        body: 'withActions, withReadonly, persist adapters.',
      },
      {
        step: '3',
        title: 'Read',
        body: 'Views read .state() or derived selectors.',
      },
      {
        step: '4',
        title: 'Reset',
        body: 'reset() or logout clears session stores.',
      },
    ],
    codeExample: {
      title: 'Just a quick look…',
      language: 'ts',
      code: `import { createStore, withActions } from "@echojs-ecosystem/framework/store";

export const themeStore = createStore({ mode: "light" as "light" | "dark" })
  .extend(withActions(({ set }) => ({
    toggle: () => set("mode", (m) => (m === "light" ? "dark" : "light")),
  })));`,
    },
    whenToUse: ['Auth, theme, shared prefs', 'entity/* modules'],
    whenNot: ['Page VM → model signals', 'API lists → query'],
    dependsOn: ['@echojs-ecosystem/reactivity'],
    powers: ['persist'],
    learnPath: [
      step('store', 'installation', 'Installation', 'Store package.'),
      step(
        'store',
        'guides/creating-stores',
        'Creating Stores',
        'First store module.'
      ),
      step('store', 'guides/actions', 'Actions', 'withActions pattern.'),
      step(
        'store',
        'examples/theme-and-counter',
        'Theme & Counter',
        'Live patterns.'
      ),
      step('store', 'api', 'API Reference', 'Full reference.'),
    ],
    relatedIds: ['persist', 'query'],
  },
  query: {
    id: 'query',
    npmPackage: '@echojs-ecosystem/query',
    frameworkImport: '@echojs-ecosystem/framework/query',
    icon: '↻',
    tagline: 'Async cache for models',
    heroTitle: 'Stop syncing server data by hand.',
    summary:
      'TanStack-inspired layer without hooks: createQuery + .with(() => params) in models; signal status for views.',
    pills: ['createQuery', '.with()', 'createMutation', 'QueryClient'],
    pillars: [
      { icon: '📋', title: 'Definition', body: 'queryKey + queryFn.' },
      { icon: '🔌', title: 'Instance', body: 'Reactive params binding.' },
      { icon: '🌐', title: 'Client', body: 'invalidate & prefetch.' },
    ],
    whyTitle: 'Why Query',
    whySubtitle: 'Server state is not the same problem as client state.',
    whyCards: [
      {
        icon: '📋',
        title: 'Cache by queryKey',
        body: 'Definitions in models; instances bind reactive params with .with().',
      },
      {
        icon: '↻',
        title: 'Background refresh',
        body: 'staleTime, refetch, and focus/online managers built in.',
      },
      {
        icon: '✏',
        title: 'Mutations',
        body: 'Optimistic updates, invalidation, and error recovery.',
      },
      {
        icon: '🚫',
        title: 'Abort built in',
        body: 'queryFn receives AbortSignal — no leaked fetches.',
      },
    ],
    lifecycleTitle: 'Query lifecycle',
    lifecycleSubtitle: 'Define → bind → fetch → cache → invalidate.',
    lifecycleSteps: [
      {
        step: '1',
        title: 'Define',
        body: 'createQuery({ queryKey, queryFn }) in model.',
      },
      {
        step: '2',
        title: 'Bind',
        body: '.with(() => params) ties to signals.',
      },
      { step: '3', title: 'Fetch', body: 'Status signals drive loading UI.' },
      {
        step: '4',
        title: 'Invalidate',
        body: 'Mutations refresh affected keys.',
      },
    ],
    codeExample: {
      title: 'Just a quick look…',
      language: 'ts',
      code: `import { createQuery } from "@echojs-ecosystem/framework/query";

const userQuery = createQuery({
  queryKey: ["user", "me"],
  queryFn: ({ signal }) => fetch("/api/me", { signal }).then((r) => r.json()),
});`,
    },
    whenToUse: ['API in models', 'Loading UI', 'Mutations'],
    whenNot: ['UI toggles', 'URL filters'],
    dependsOn: ['@echojs-ecosystem/reactivity'],
    powers: ['framework'],
    learnPath: [
      step('query', 'installation', 'Installation', 'Query + provider.'),
      step(
        'query',
        'guides/query-definitions',
        'Query Definitions',
        'Keys & queryFn.'
      ),
      step('query', 'guides/mutations', 'Mutations', 'Writes & invalidation.'),
      step(
        'query',
        'examples/query-demo-model',
        'Query Demo',
        'Example app model.'
      ),
      step('query', 'playground', 'Playground', 'Fake fetch demo.'),
      step('query', 'api', 'API Reference', 'Full reference.'),
    ],
    relatedIds: ['framework', 'store'],
  },
  'url-state': {
    id: 'url-state',
    npmPackage: '@echojs-ecosystem/url-state',
    frameworkImport: '@echojs-ecosystem/framework/url-state',
    icon: '🔗',
    tagline: 'Typed URL params',
    heroTitle: 'Shareable filters in the URL.',
    summary:
      'nuqs-style search params: parsers, createQueryParams, router adapter — signal-friendly.',
    pills: ['createQueryParams', 'parseAs*', 'urlKeys'],
    pillars: [
      { icon: '🔤', title: 'Parsers', body: 'Typed defaults.' },
      { icon: '📎', title: 'Groups', body: 'Object of params.' },
      { icon: '🧭', title: 'Router', body: 'SPA URL sync.' },
    ],
    whyTitle: 'Why URL State',
    whySubtitle:
      'Filters and pagination belong in the URL — not in opaque client state.',
    whyCards: [
      {
        icon: '🔤',
        title: 'Typed parsers',
        body: 'parseAsString, parseAsInteger, arrays — defaults included.',
      },
      {
        icon: '📎',
        title: 'Param groups',
        body: 'createQueryParams returns signal-friendly object of params.',
      },
      {
        icon: '🧭',
        title: 'Router adapter',
        body: 'Sync with @echojs-ecosystem/router history.',
      },
      {
        icon: '🔗',
        title: 'Shareable links',
        body: 'Copy URL → same catalog filters for every visitor.',
      },
    ],
    lifecycleTitle: 'URL sync lifecycle',
    lifecycleSubtitle: 'Parse → bind → update history → re-parse.',
    lifecycleSteps: [
      {
        step: '1',
        title: 'Parse',
        body: 'Parsers read search string into typed values.',
      },
      { step: '2', title: 'Bind', body: 'Signals hold current param state.' },
      {
        step: '3',
        title: 'Update',
        body: 'User action → write params → push URL.',
      },
      {
        step: '4',
        title: 'Back/forward',
        body: 'History events re-sync signals.',
      },
    ],
    codeExample: {
      title: 'Just a quick look…',
      language: 'ts',
      code: `import { createQueryParams, parseAsString, parseAsInteger } from "@echojs-ecosystem/url-state";

const params = createQueryParams({
  q: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
});`,
    },
    whenToUse: ['Filters in URL', 'Shareable state', 'Catalog pages'],
    whenNot: ['Path segments', 'Server cache'],
    dependsOn: ['@echojs-ecosystem/reactivity'],
    powers: ['router'],
    learnPath: [
      step('url-state', 'installation', 'Installation', 'With router.'),
      step('url-state', 'guides/parsers', 'Parsers', 'Typed defaults.'),
      step(
        'url-state',
        'guides/query-params',
        'createQueryParams',
        'Param groups.'
      ),
      step(
        'url-state',
        'examples/catalog-filters',
        'Catalog Filters',
        'Real pattern.'
      ),
      step('url-state', 'api', 'API Reference', 'Full reference.'),
    ],
    relatedIds: ['router'],
  },
  persist: {
    id: 'persist',
    npmPackage: '@echojs-ecosystem/persist',
    frameworkImport: '@echojs-ecosystem/framework/persist',
    icon: '💾',
    tagline: 'Storage extensions',
    heroTitle: 'Persist stores — not ad hoc localStorage.',
    summary:
      'Persist stores via .extend(localStorage | cookie | …). hydrate/save/clear on .persist controller.',
    pills: ['withLocalStorage', 'withCookie', 'migrate'],
    pillars: [
      { icon: '💿', title: 'Adapters', body: 'local, session, cookie, IDB.' },
      { icon: '🔀', title: 'Slice', body: 'select + merge.' },
      { icon: '📦', title: 'Version', body: 'TTL & migrate.' },
    ],
    whyTitle: 'Why Persist',
    whySubtitle: 'Session survives refresh — without hand-rolled storage code.',
    whyCards: [
      {
        icon: '💿',
        title: 'Storage adapters',
        body: 'localStorage, sessionStorage, cookies, IndexedDB.',
      },
      {
        icon: '🔀',
        title: 'Slice & merge',
        body: 'Persist part of a store; merge on hydrate.',
      },
      {
        icon: '📦',
        title: 'Version & migrate',
        body: 'Schema bumps with migrate() callbacks.',
      },
      {
        icon: '🔐',
        title: 'Logout flow',
        body: 'clear() on session stores when auth ends.',
      },
    ],
    lifecycleTitle: 'Persist lifecycle',
    lifecycleSubtitle: 'Hydrate → use → save → clear.',
    lifecycleSteps: [
      {
        step: '1',
        title: 'Extend',
        body: 'store.extend(withLocalStorage(...)).',
      },
      { step: '2', title: 'Hydrate', body: 'Read storage on startup.' },
      { step: '3', title: 'Save', body: 'Auto-save on store changes.' },
      { step: '4', title: 'Clear', body: 'Logout calls .persist.clear().' },
    ],
    codeExample: {
      title: 'Just a quick look…',
      language: 'ts',
      code: `import { createStore } from "@echojs-ecosystem/store";
import { withLocalStorage } from "@echojs-ecosystem/persist";

export const themeStore = createStore({ mode: "light" }).extend(
  withLocalStorage({ key: "theme", select: (s) => ({ mode: s.mode }) }),
);`,
    },
    whenToUse: ['Theme, auth, drafts', 'entity/session'],
    whenNot: ['Without store', 'Huge cookies'],
    dependsOn: ['@echojs-ecosystem/store'],
    powers: [],
    learnPath: [
      step('persist', 'installation', 'Installation', 'persist + store.'),
      step(
        'persist',
        'guides/storage-adapters',
        'Storage Adapters',
        'Pick adapter.'
      ),
      step(
        'persist',
        'guides/hydrate-and-save',
        'Hydrate & Save',
        'Lifecycle.'
      ),
      step('persist', 'examples/auth-session', 'Auth Session', 'Logout clear.'),
      step('persist', 'api', 'API Reference', 'Full reference.'),
    ],
    relatedIds: ['store'],
  },
  i18n: {
    id: 'i18n',
    npmPackage: '@echojs-ecosystem/i18n',
    frameworkImport: '@echojs-ecosystem/framework/i18n',
    icon: '🌐',
    tagline: 'i18n & Intl',
    heroTitle: 'Typed translations without build-time magic.',
    summary:
      'Typed keys from JSON, lazy locales, plural/interpolation, Intl helpers. createI18nProvider for apps.',
    pills: ['createI18n', 't()', 'setLocale'],
    pillars: [
      { icon: '🗣', title: 'Messages', body: 'Nested JSON keys.' },
      { icon: '🔄', title: 'Locales', body: 'Eager + lazy imports.' },
      { icon: '🌍', title: 'Intl', body: 'number, date, currency.' },
    ],
    whyTitle: 'Why i18n',
    whySubtitle: 'UI strings are reactive server-adjacent state.',
    whyCards: [
      {
        icon: '🗣',
        title: 'Typed keys',
        body: 'JSON messages map to TypeScript key paths.',
      },
      {
        icon: '🔄',
        title: 'Lazy locales',
        body: 'Load ru.json only when user switches locale.',
      },
      {
        icon: '🌍',
        title: 'Intl helpers',
        body: 'formatNumber, formatDate, formatCurrency.',
      },
      {
        icon: '↻',
        title: 'Reactive t()',
        body: 'Views re-render when locale or messages change.',
      },
    ],
    lifecycleTitle: 'Locale lifecycle',
    lifecycleSubtitle: 'Load → translate → switch → format.',
    lifecycleSteps: [
      {
        step: '1',
        title: 'Provider',
        body: 'createI18nProvider at app bootstrap.',
      },
      {
        step: '2',
        title: 't()',
        body: "Views call i18n.t('key') in reactive children.",
      },
      { step: '3', title: 'Switch', body: 'setLocale loads bundle if needed.' },
      { step: '4', title: 'Format', body: 'Intl helpers use active locale.' },
    ],
    codeExample: {
      title: 'Just a quick look…',
      language: 'ts',
      code: `import { createI18nProvider } from "@echojs-ecosystem/framework/i18n";
import en from "./locales/en.json";

createEchoApp()
  .use(createI18nProvider({ locales: { en }, fallbackLocale: "en" }))
  .mount("#app");`,
    },
    whenToUse: ['All UI strings', 'Locale switcher'],
    whenNot: ['Build-time only text'],
    dependsOn: ['@echojs-ecosystem/reactivity'],
    powers: ['framework'],
    learnPath: [
      step('i18n', 'installation', 'Installation', 'Locales setup.'),
      step(
        'i18n',
        'guides/messages-and-keys',
        'Messages & Keys',
        'JSON structure.'
      ),
      step('i18n', 'guides/locales', 'Locales', 'Lazy loading.'),
      step(
        'i18n',
        'examples/locale-switcher',
        'Locale Switcher',
        'en / ru demo.'
      ),
      step('i18n', 'api', 'API Reference', 'Full reference.'),
    ],
    relatedIds: ['framework'],
  },
  ui: {
    id: 'ui',
    npmPackage: '@echojs-ecosystem/ui',
    frameworkImport: '@echojs-ecosystem/framework/ui',
    icon: '◈',
    tagline: 'UI components',
    heroTitle: 'Accessible primitives for HyperDOM apps.',
    summary:
      'Accessible HyperDOM components — Button, Field, Input — theme via UIProvider. Docs expanding.',
    pills: ['Button', 'Field', 'UIProvider'],
    pillars: [
      { icon: '◈', title: 'Components', body: 'Composable primitives.' },
      { icon: '🎨', title: 'Theme', body: 'Tokens & variants.' },
      { icon: '♿', title: 'A11y', body: 'ARIA & semantics.' },
    ],
    whyTitle: 'Why UI',
    whySubtitle: 'Consistent forms and actions without reinventing a11y.',
    whyCards: [
      {
        icon: '◈',
        title: 'HyperDOM-native',
        body: 'Components are createView factories — same reactivity model.',
      },
      {
        icon: '🎨',
        title: 'Theme tokens',
        body: 'UIProvider + createTheme for light/dark.',
      },
      {
        icon: '♿',
        title: 'Accessibility',
        body: 'ARIA patterns on Button, Field, Input.',
      },
      {
        icon: '📦',
        title: 'Granular imports',
        body: '@echojs-ecosystem/framework/ui/button for tree-shaking.',
      },
    ],
    lifecycleTitle: 'Component lifecycle',
    lifecycleSubtitle: 'Theme → provider → compose → render.',
    lifecycleSteps: [
      { step: '1', title: 'Theme', body: 'createTheme() with design tokens.' },
      { step: '2', title: 'Provider', body: 'UIProvider wraps app root.' },
      {
        step: '3',
        title: 'Compose',
        body: 'Field + Input + Button in features.',
      },
      {
        step: '4',
        title: 'Variants',
        body: 'Props drive visual variants from theme.',
      },
    ],
    codeExample: {
      title: 'Just a quick look…',
      language: 'ts',
      code: `import { Button } from "@echojs-ecosystem/framework/ui/button";
import { UIProvider } from "@echojs-ecosystem/framework/ui/provider";

// Wrap app with UIProvider, use Button in views`,
    },
    whenToUse: ['Forms & actions', 'Design system'],
    whenNot: ['Docs markdown layout'],
    dependsOn: ['@echojs-ecosystem/hyperdom'],
    powers: [],
    learnPath: [
      step('ui', 'installation', 'Installation', 'UI package.'),
      step('ui', 'guides/ui-provider', 'UIProvider & Theme', 'Setup tokens.'),
      step(
        'ui',
        'guides/button-and-field',
        'Button & Field',
        'Core primitives.'
      ),
      step('ui', 'playground', 'Playground', 'Button demo.'),
      step('ui', 'api', 'API Reference', 'Component API.'),
    ],
    relatedIds: ['hyperdom', 'framework'],
  },
  devtools: {
    id: 'devtools',
    npmPackage: '@echojs-ecosystem/devtools',
    frameworkImport: '@echojs-ecosystem/framework/devtools',
    icon: '🔧',
    tagline: 'DevTools (planned)',
    heroTitle: 'See the reactive graph while you debug.',
    summary:
      'Runtime registry and timeline for EchoJS DevTools. Integrates with store, query, router — UI overlay planned.',
    pills: ['registry', 'timeline', 'planned'],
    pillars: [
      { icon: '👁', title: 'Signals', body: 'Dependency inspect.' },
      { icon: '📊', title: 'Query', body: 'Cache view.' },
      { icon: '🧪', title: 'Routes', body: 'Match chain.' },
    ],
    whyTitle: 'Why DevTools',
    whySubtitle:
      'Fine-grained reactivity needs visible cache and dependency graphs.',
    whyCards: [
      {
        icon: '👁',
        title: 'Registry API',
        body: 'registerDevtoolsNode — packages emit structured debug nodes.',
      },
      {
        icon: '📊',
        title: 'Query cache',
        body: 'Inspect keys, status, and observers (planned UI).',
      },
      {
        icon: '🧪',
        title: 'Route match',
        body: 'See guard chain and active route (planned UI).',
      },
      { icon: '🔧', title: 'Dev only', body: 'Strip from production builds.' },
    ],
    lifecycleTitle: 'Debug lifecycle',
    lifecycleSubtitle: 'Register → observe → timeline → teardown.',
    lifecycleSteps: [
      {
        step: '1',
        title: 'Register',
        body: 'Packages call registerDevtoolsNode in dev.',
      },
      {
        step: '2',
        title: 'Bridge',
        body: 'Connect to browser extension or overlay.',
      },
      {
        step: '3',
        title: 'Timeline',
        body: 'Events stream to DevTools panel.',
      },
      {
        step: '4',
        title: 'Strip',
        body: 'Production build removes devtools imports.',
      },
    ],
    codeExample: {
      title: 'Just a quick look…',
      language: 'ts',
      code: `import { registerDevtoolsNode } from "@echojs-ecosystem/devtools";

registerDevtoolsNode({ id: "my-feature", type: "model", label: "Counter" });`,
    },
    whenToUse: ['Local debug'],
    whenNot: ['Production'],
    dependsOn: ['@echojs-ecosystem/reactivity'],
    powers: [],
    learnPath: [
      step('devtools', 'installation', 'Installation', 'Dev-only setup.'),
      step(
        'devtools',
        'guides/registry',
        'Registry & Timeline',
        'Runtime API.'
      ),
      step('devtools', 'api', 'API Reference', 'Exports.'),
    ],
    relatedIds: ['framework'],
  },
  cli: {
    id: 'cli',
    npmPackage: '@echojs-ecosystem/cli',
    icon: '⌘',
    tagline: 'CLI (planned)',
    heroTitle: 'Scaffold EchoJS apps the right way.',
    summary:
      'Scaffold apps and feature slices aligned with feature-first layout.',
    pills: ['planned', 'create', 'generate'],
    pillars: [
      { icon: '✨', title: 'create', body: 'New app.' },
      { icon: '⚙', title: 'generate', body: 'Feature stubs.' },
      { icon: '✓', title: 'doctor', body: 'Structure check.' },
    ],
    whyTitle: 'Why CLI',
    whySubtitle: 'Feature-first folders are easier with scaffolding.',
    whyCards: [
      {
        icon: '✨',
        title: 'create',
        body: 'Greenfield app with providers and example feature.',
      },
      {
        icon: '⚙',
        title: 'generate',
        body: 'feature/, page/, widget/ stubs with index.ts.',
      },
      {
        icon: '✓',
        title: 'doctor',
        body: 'Validate folder layout against architect rules.',
      },
      {
        icon: '🏛',
        title: 'Architect today',
        body: 'Use @echojs-ecosystem/architect for lint until CLI ships.',
      },
    ],
    lifecycleTitle: 'CLI workflow (planned)',
    lifecycleSubtitle: 'Create → generate → develop → doctor.',
    lifecycleSteps: [
      {
        step: '1',
        title: 'create',
        body: 'npx @echojs-ecosystem/cli create my-app',
      },
      { step: '2', title: 'generate', body: 'cli generate feature counter' },
      { step: '3', title: 'dev', body: 'bun dev with feature-first layout.' },
      {
        step: '4',
        title: 'doctor',
        body: 'cli doctor — CI-friendly structure check.',
      },
    ],
    codeExample: {
      title: 'Planned workflow…',
      language: 'bash',
      code: `# Planned
npx @echojs-ecosystem/cli create my-app
cd my-app && bun dev`,
    },
    whenToUse: ['Greenfield', 'CI checks'],
    whenNot: ['Runtime'],
    dependsOn: [],
    powers: [],
    learnPath: [
      step('cli', 'guides/overview', 'Overview', 'Planned scope.'),
      step(
        'architect',
        'installation',
        'Architect',
        'Use echo-architect today.'
      ),
    ],
    relatedIds: ['framework', 'architect'],
  },
  'network-http': {
    id: 'network-http',
    npmPackage: '@echojs-ecosystem/network',
    frameworkImport: '@echojs-ecosystem/framework/network/http',
    icon: '🌐',
    tagline: 'HTTP client for Echo apps',
    heroTitle: 'Fetch, without the boilerplate.',
    summary:
      'Tree-shakeable HTTP subpath with immutable clients, hooks, retries, typed responses, and first-class AbortSignal support — built for queryFn and API modules.',
    pills: ['createHttpClient', 'extend()', 'hooks', 'unwrapJson()'],
    pillars: [
      {
        icon: '◎',
        title: 'Immutable clients',
        body: 'extend(), withAuth(), withBaseUrl() — layered defaults.',
      },
      {
        icon: '↻',
        title: 'Retries & redirects',
        body: 'Configurable budgets, hooks, and error types.',
      },
      {
        icon: 'ƒ',
        title: 'Typed responses',
        body: '.json(), .unwrapJson(), HttpResponse helpers.',
      },
    ],
    whyTitle: 'Why network/http',
    whySubtitle: 'A small transport layer that fits Echo feature slices.',
    whyCards: [
      {
        icon: '📦',
        title: 'Subpath import',
        body: 'Import only /http — ws, mock, graphql stay separate.',
      },
      {
        icon: '🔗',
        title: 'Query-ready',
        body: 'Forward signal from createQuery queryFn out of the box.',
      },
      {
        icon: '🪝',
        title: 'Hook buckets',
        body: 'Auth, logging, metrics — concat on extend().',
      },
      {
        icon: '⚠',
        title: 'Typed errors',
        body: 'HTTPStatusError, RetryError, guards for catch blocks.',
      },
    ],
    lifecycleTitle: 'Request lifecycle',
    lifecycleSubtitle: 'Defaults → normalize → hooks → adapter → parse.',
    lifecycleSteps: [
      {
        step: '1',
        title: 'Compose',
        body: 'createHttpClient() at module scope.',
      },
      {
        step: '2',
        title: 'Request',
        body: 'get/post + json or unwrapJson.',
      },
      {
        step: '3',
        title: 'Hooks',
        body: 'beforeRequest / afterResponse middleware.',
      },
      {
        step: '4',
        title: 'Errors',
        body: 'isStatusError + raw() when needed.',
      },
    ],
    codeExample: {
      title: 'Just a quick look…',
      language: 'ts',
      code: `import { createHttpClient } from '@echojs-ecosystem/network/http'

const api = createHttpClient({ baseUrl: '/api' })
const users = await api.get('/users').json<User[]>()`,
    },
    whenToUse: [
      'REST API modules',
      'queryFn implementations',
      'Shared auth / tenant headers',
    ],
    whenNot: ['WebSocket streaming', 'GraphQL (use /graphql when shipped)'],
    dependsOn: [],
    powers: ['Typed HTTP', 'Retries', 'Hook middleware', 'Tracing ids'],
    learnPath: [
      step(
        'network-http',
        'installation',
        'Installation',
        'Subpath imports.'
      ),
      step(
        'network-http',
        'guides/important-defaults',
        'Important Defaults',
        'Retries and errors.'
      ),
      step(
        'network-http',
        'guides/query-integration',
        'Query Integration',
        'Use with createQuery.'
      ),
      step('network-http', 'api', 'API Reference', 'Full export index.'),
    ],
    relatedIds: ['query', 'framework'],
  },
  architect: {
    id: 'architect',
    npmPackage: '@echojs-ecosystem/architect',
    icon: '🏛',
    tagline: 'Architecture linter',
    heroTitle: 'Enforce feature-first in CI.',
    summary:
      'Lint layer imports, public APIs, and folder contracts from architect.config.ts — the same rules the docs site runs in CI.',
    pills: ['layers', 'public-api', 'CI'],
    pillars: [
      {
        icon: '▦',
        title: 'Layers',
        body: 'Enforce dependency direction across app, pages, widgets, entities, shared.',
      },
      {
        icon: '◉',
        title: 'Public API',
        body: 'Slices expose index.ts; deep imports are flagged.',
      },
      {
        icon: '✓',
        title: 'CI-ready',
        body: 'echo-architect lint in watch or one-shot mode.',
      },
    ],
    whyTitle: 'Why Architect',
    whySubtitle: 'Conventions without architecture drift.',
    whyCards: [
      {
        icon: '▦',
        title: 'Layer graph',
        body: 'app → pages → widgets → entities → shared — no upward imports.',
      },
      {
        icon: '◉',
        title: 'Public API',
        body: 'Only import from slice index.ts — deep paths fail lint.',
      },
      {
        icon: '✓',
        title: 'CI integration',
        body: 'echo-architect lint in GitHub Actions.',
      },
      {
        icon: '🔧',
        title: 'Presets',
        body: 'feature-first preset matches docs and example apps.',
      },
    ],
    lifecycleTitle: 'Lint lifecycle',
    lifecycleSubtitle: 'Configure → lint → fix → CI.',
    lifecycleSteps: [
      {
        step: '1',
        title: 'Config',
        body: 'architect.config.ts with layers preset.',
      },
      {
        step: '2',
        title: 'Lint',
        body: 'echo-architect lint locally or in watch.',
      },
      {
        step: '3',
        title: 'Fix',
        body: 'Move imports or add index.ts barrels.',
      },
      { step: '4', title: 'CI', body: 'Fail PR on layer violations.' },
    ],
    codeExample: {
      title: 'Just a quick look…',
      language: 'bash',
      code: `npx echo-architect lint
# or in package.json: "lint:arch": "echo-architect lint"`,
    },
    whenToUse: [
      'Monorepo apps',
      'Feature-first folders',
      'Onboarding & code review',
    ],
    whenNot: ['Runtime behavior', 'Unit test assertions'],
    dependsOn: [],
    powers: ['Layer graphs', 'Import diagnostics', 'Auto-fix stubs'],
    learnPath: [
      step('architect', 'installation', 'Installation', 'Add to your app.'),
      step(
        'architect',
        'guides/layers',
        'Layer Rules',
        'Dependency direction.'
      ),
      step(
        'architect',
        'examples/docs-site-config',
        'Docs Site Config',
        'Real config.'
      ),
      step('architect', 'api', 'API Reference', 'Programmatic lint.'),
    ],
    relatedIds: ['framework', 'cli'],
  },
}

export const getPackageOverview = (
  id: string
): PackageOverviewData | undefined => packageOverviewById[id]
