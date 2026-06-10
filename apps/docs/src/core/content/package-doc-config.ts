/** Nav page lists for modern package docs (reactivity-style layout). */

import { packageApiDocCategoriesById } from './package-api-catalogs.generated'
import { reactivityDocCategories } from './reactivity-docs-catalog'
import { routerDocCategories } from './router-docs-catalog'
import { utilsDocCategories } from './utils-docs-catalog'

const apiCategoriesFromCatalog = (
  packageId: keyof typeof packageApiDocCategoriesById
): PackageDocCategory[] =>
  packageApiDocCategoriesById[packageId].map((category) => ({
    id: `api-${category.id}`,
    title: category.title,
    pages: category.entries.map((entry) => ({
      slug: entry.slug,
      title: entry.name,
    })),
  }))

export type PackageDocPage = { slug: string; title: string }

export type PackageDocCategory = {
  id: string
  title: string
  pages: PackageDocPage[]
}

export type ModernPackageDocConfig = {
  id: string
  title: string
  npmPackage: string
  /** Pin to top of Packages sidebar with highlight styling. */
  featured?: boolean
  frameworkSubpath?: string
  guides: PackageDocPage[]
  /** Top-level API index pages (e.g. overview). */
  api: PackageDocPage[]
  /** Nested API nav — one subsection per category (utils-style). */
  apiCategories?: PackageDocCategory[]
  /** Functions index page (utils package). */
  functions?: PackageDocPage
  examples: PackageDocPage[]
}

export const modernPackageDocConfigs: ModernPackageDocConfig[] = [
  {
    id: 'reactivity',
    title: 'Reactivity',
    npmPackage: '@echojs-ecosystem/reactivity',
    frameworkSubpath: 'reactivity',
    guides: [
      { slug: 'important-defaults', title: 'Important Defaults' },
      { slug: 'signals', title: 'Signals' },
      { slug: 'computed', title: 'Computed Values' },
      { slug: 'effects', title: 'Effects' },
      { slug: 'batching', title: 'Batching' },
      { slug: 'scopes-and-cleanup', title: 'Scopes & Cleanup' },
      { slug: 'readonly-signals', title: 'Readonly Signals' },
      { slug: 'immutable-updates', title: 'Immutable Updates' },
      { slug: 'hyperdom-integration', title: 'HyperDOM Integration' },
    ],
    functions: { slug: 'functions', title: 'Functions' },
    api: [],
    apiCategories: reactivityDocCategories.map((category) => ({
      id: `api-${category.id}`,
      title: category.title,
      pages: category.entries.map((entry) => ({
        slug: entry.slug,
        title: entry.name,
      })),
    })),
    examples: [
      { slug: 'overview', title: 'Overview' },
      { slug: 'counter', title: 'Counter' },
      { slug: 'derived-greeting', title: 'Derived Greeting' },
      { slug: 'batch-updates', title: 'Batch Updates' },
      { slug: 'todo-list', title: 'Todo List' },
      { slug: 'scope-timer', title: 'Scope & Timer' },
      { slug: 'shopping-cart', title: 'Shopping Cart' },
    ],
  },
  {
    id: 'hyperdom',
    title: 'HyperDOM',
    npmPackage: '@echojs-ecosystem/hyperdom',
    frameworkSubpath: 'hyperdom',
    guides: [
      { slug: 'important-defaults', title: 'Important Defaults' },
      { slug: 'views-and-dsl', title: 'Views & DSL' },
      { slug: 'reactive-children', title: 'Reactive Children' },
      { slug: 'reactive-props', title: 'Reactive Props' },
      { slug: 'events-and-handlers', title: 'Events & Handlers' },
      { slug: 'show-and-list', title: 'Show & List' },
      { slug: 'models-and-components', title: 'Models & Components' },
      { slug: 'rendering-and-teardown', title: 'Rendering & Teardown' },
      { slug: 'refs-and-dom-access', title: 'Refs & DOM Access' },
      { slug: 'styling-and-classes', title: 'Styling & Classes' },
      { slug: 'lifecycle-mount', title: 'Lifecycle Mount' },
      { slug: 'trusted-html', title: 'Trusted HTML' },
    ],
    functions: { slug: 'functions', title: 'Functions' },
    api: [],
    apiCategories: apiCategoriesFromCatalog('hyperdom'),
    examples: [
      { slug: 'overview', title: 'Overview' },
      { slug: 'counter', title: 'Counter' },
      { slug: 'model-view-counter', title: 'Model + View Counter' },
      { slug: 'conditional-ui', title: 'Conditional UI' },
      { slug: 'todo-list', title: 'Todo List' },
      { slug: 'doc-article', title: 'Doc Article' },
      { slug: 'lifecycle-resize', title: 'Lifecycle Mount' },
    ],
  },
  {
    id: 'framework',
    title: 'Framework',
    npmPackage: '@echojs-ecosystem/framework',
    featured: true,
    guides: [
      { slug: 'important-defaults', title: 'Important Defaults' },
      { slug: 'create-echo-app', title: 'createEchoApp' },
      { slug: 'providers', title: 'Providers' },
      { slug: 'dependency-injection', title: 'Dependency Injection' },
      { slug: 'subpath-imports', title: 'Subpath Imports' },
    ],
    functions: { slug: 'functions', title: 'Functions' },
    api: [],
    apiCategories: apiCategoriesFromCatalog('framework'),
    examples: [
      { slug: 'overview', title: 'Overview' },
      { slug: 'minimal-app', title: 'Minimal App' },
      { slug: 'with-router', title: 'With Router' },
      { slug: 'with-query', title: 'With Query' },
      { slug: 'with-i18n', title: 'With i18n' },
    ],
  },
  {
    id: 'router',
    title: 'Router',
    npmPackage: '@echojs-ecosystem/router',
    frameworkSubpath: 'router',
    guides: [
      { slug: 'route-trees', title: 'Route Trees & Layouts' },
      { slug: 'router-lifecycle', title: 'Router Lifecycle' },
      { slug: 'navigation', title: 'Navigation & NavLink' },
      { slug: 'before-load', title: 'beforeLoad & Route Data' },
      { slug: 'lazy-routes', title: 'Lazy Routes' },
      { slug: 'guards-and-redirects', title: 'Guards & Redirects' },
    ],
    functions: { slug: 'functions', title: 'Functions' },
    api: [],
    apiCategories: routerDocCategories.map((category) => ({
      id: `api-${category.id}`,
      title: category.title,
      pages: category.entries.map((entry) => ({
        slug: entry.slug,
        title: entry.name,
      })),
    })),
    examples: [
      { slug: 'overview', title: 'Overview' },
      { slug: 'docs-routes', title: 'Docs Dynamic Routes' },
      { slug: 'nested-routes', title: 'Nested Routes' },
      { slug: 'page-and-layout', title: 'Page + Layout' },
      { slug: 'nav-link', title: 'NavLink Sidebar' },
      { slug: 'imperative-nav', title: 'Imperative Navigation' },
    ],
  },
  {
    id: 'store',
    title: 'Store',
    npmPackage: '@echojs-ecosystem/store',
    frameworkSubpath: 'store',
    guides: [
      { slug: 'creating-stores', title: 'Creating Stores' },
      { slug: 'actions', title: 'Actions with withActions' },
      { slug: 'derived-state', title: 'Derived State' },
      { slug: 'events', title: 'Events & Subscriptions' },
      { slug: 'readonly', title: 'Readonly Stores' },
      { slug: 'hyperdom-integration', title: 'HyperDOM Integration' },
    ],
    functions: { slug: 'functions', title: 'Functions' },
    api: [],
    apiCategories: apiCategoriesFromCatalog('store'),
    examples: [
      { slug: 'overview', title: 'Overview' },
      { slug: 'theme-and-counter', title: 'Theme & Counter' },
      { slug: 'view-integration', title: 'View Reads Store' },
      { slug: 'combine-names', title: 'combine Full Name' },
      { slug: 'session-stores', title: 'Session Stores' },
    ],
  },
  {
    id: 'network-http',
    title: 'Network / HTTP',
    npmPackage: '@echojs-ecosystem/network',
    frameworkSubpath: 'network/http',
    guides: [
      { slug: 'important-defaults', title: 'Important Defaults' },
      { slug: 'client-composition', title: 'Client Composition' },
      {
        slug: 'retries-timeouts-redirects',
        title: 'Retries, Timeouts & Redirects',
      },
      { slug: 'hooks-and-middleware', title: 'Hooks & Middleware' },
      { slug: 'query-integration', title: 'Query Integration' },
    ],
    functions: { slug: 'functions', title: 'Functions' },
    api: [],
    apiCategories: apiCategoriesFromCatalog('network-http'),
    examples: [
      { slug: 'overview', title: 'Overview' },
      { slug: 'rest-api', title: 'REST API Client' },
      { slug: 'auth-and-headers', title: 'Auth & Headers' },
      { slug: 'error-handling', title: 'Error Handling' },
    ],
  },
  {
    id: 'async',
    title: 'Async',
    npmPackage: '@echojs-ecosystem/async',
    frameworkSubpath: 'async',
    guides: [
      { slug: 'query-definitions', title: 'Query Definitions' },
      { slug: 'reactive-binding', title: 'Reactive Binding' },
      { slug: 'query-client', title: 'QueryClient & Cache' },
      { slug: 'mutations', title: 'Mutations' },
      { slug: 'infinite-queries', title: 'Infinite Queries' },
      { slug: 'abort-and-cancellation', title: 'Abort & Cancellation' },
    ],
    functions: { slug: 'functions', title: 'Functions' },
    api: [],
    apiCategories: apiCategoriesFromCatalog('async'),
    examples: [
      { slug: 'overview', title: 'Overview' },
      { slug: 'jsonplaceholder', title: 'JSONPlaceholder' },
      { slug: 'query-demo-model', title: 'Query Demo Model' },
      { slug: 'status-helpers', title: 'View Status Helpers' },
      { slug: 'doc-content', title: 'Docs Markdown Loader' },
      { slug: 'provider-defaults', title: 'Provider Defaults' },
    ],
  },
  {
    id: 'url-state',
    title: 'URL State',
    npmPackage: '@echojs-ecosystem/url-state',
    frameworkSubpath: 'url-state',
    guides: [
      { slug: 'important-defaults', title: 'Important Defaults' },
      { slug: 'parsers', title: 'Parsers' },
      { slug: 'query-params', title: 'createQueryParams' },
      { slug: 'router-adapter', title: 'Router Adapter' },
      { slug: 'history-and-sync', title: 'History & Sync' },
    ],
    functions: { slug: 'functions', title: 'Functions' },
    api: [],
    apiCategories: apiCategoriesFromCatalog('url-state'),
    examples: [
      { slug: 'overview', title: 'Overview' },
      { slug: 'catalog-filters', title: 'Catalog Filters' },
      { slug: 'pagination', title: 'Pagination' },
      { slug: 'memory-url', title: 'Memory URL' },
    ],
  },
  {
    id: 'persist',
    title: 'Persist',
    npmPackage: '@echojs-ecosystem/persist',
    frameworkSubpath: 'persist',
    guides: [
      { slug: 'important-defaults', title: 'Important Defaults' },
      { slug: 'storage-adapters', title: 'Storage Adapters' },
      { slug: 'hydrate-and-save', title: 'Hydrate & Save' },
      { slug: 'slicing-and-merge', title: 'Slicing & Merge' },
      { slug: 'migration-and-ttl', title: 'Migration & TTL' },
    ],
    functions: { slug: 'functions', title: 'Functions' },
    api: [],
    apiCategories: apiCategoriesFromCatalog('persist'),
    examples: [
      { slug: 'overview', title: 'Overview' },
      { slug: 'theme-store', title: 'Theme Store' },
      { slug: 'auth-session', title: 'Auth Session' },
    ],
  },
  {
    id: 'ui',
    title: 'UI',
    npmPackage: '@echojs-ecosystem/ui',
    frameworkSubpath: 'ui',
    guides: [
      { slug: 'important-defaults', title: 'Important Defaults' },
      { slug: 'ui-provider', title: 'UIProvider & Theme' },
      { slug: 'button-and-field', title: 'Button & Field' },
      { slug: 'forms', title: 'Form Controls' },
    ],
    functions: { slug: 'functions', title: 'Functions' },
    api: [],
    apiCategories: apiCategoriesFromCatalog('ui'),
    examples: [
      { slug: 'overview', title: 'Overview' },
      { slug: 'button-demo', title: 'Button Demo' },
      { slug: 'form-row', title: 'Form Row' },
    ],
  },
  {
    id: 'i18n',
    title: 'i18n',
    npmPackage: '@echojs-ecosystem/i18n',
    frameworkSubpath: 'i18n',
    guides: [
      { slug: 'important-defaults', title: 'Important Defaults' },
      { slug: 'messages-and-keys', title: 'Messages & Keys' },
      { slug: 'locales', title: 'Locales' },
      { slug: 'interpolation-and-plural', title: 'Interpolation & Plural' },
      { slug: 'intl-helpers', title: 'Intl Helpers' },
    ],
    functions: { slug: 'functions', title: 'Functions' },
    api: [],
    apiCategories: apiCategoriesFromCatalog('i18n'),
    examples: [
      { slug: 'overview', title: 'Overview' },
      { slug: 'locale-switcher', title: 'Locale Switcher' },
      { slug: 'docs-locales', title: 'Docs Locales' },
      { slug: 'plural-messages', title: 'Plural Messages' },
    ],
  },
  {
    id: 'utils',
    title: 'Utils',
    npmPackage: '@echojs-ecosystem/utils',
    guides: [],
    functions: { slug: 'functions', title: 'Functions' },
    api: [],
    apiCategories: utilsDocCategories.map((category) => ({
      id: `api-${category.id}`,
      title: category.title,
      pages: category.utils.map((util) => ({
        slug: util.slug,
        title: util.name,
      })),
    })),
    examples: [],
  },
  {
    id: 'devtools',
    title: 'DevTools',
    npmPackage: '@echojs-ecosystem/devtools',
    frameworkSubpath: 'devtools',
    guides: [
      { slug: 'overview', title: 'Overview' },
      { slug: 'registry', title: 'Registry & Timeline' },
      { slug: 'integration', title: 'Package Integration' },
    ],
    functions: { slug: 'functions', title: 'Functions' },
    api: [],
    apiCategories: apiCategoriesFromCatalog('devtools'),
    examples: [
      { slug: 'overview', title: 'Overview' },
      { slug: 'local-debug', title: 'Local Debug' },
    ],
  },
  {
    id: 'cli',
    title: 'CLI',
    npmPackage: '@echojs-ecosystem/cli',
    guides: [
      { slug: 'overview', title: 'Overview' },
      { slug: 'planned-commands', title: 'Planned Commands' },
    ],
    functions: { slug: 'functions', title: 'Functions' },
    api: [],
    apiCategories: apiCategoriesFromCatalog('cli'),
    examples: [
      { slug: 'overview', title: 'Overview' },
      { slug: 'scaffold-app', title: 'Scaffold App (planned)' },
    ],
  },
  {
    id: 'architect',
    title: 'Architect',
    npmPackage: '@echojs-ecosystem/architect',
    guides: [
      { slug: 'important-defaults', title: 'Important Defaults' },
      { slug: 'layers', title: 'Layer Rules' },
      { slug: 'public-api', title: 'Public API' },
      { slug: 'presets', title: 'Presets & Config' },
      { slug: 'ci-integration', title: 'CI Integration' },
    ],
    functions: { slug: 'functions', title: 'Functions' },
    api: [],
    apiCategories: apiCategoriesFromCatalog('architect'),
    examples: [
      { slug: 'overview', title: 'Overview' },
      { slug: 'docs-site-config', title: 'Docs Site Config' },
      { slug: 'feature-slice', title: 'Feature Slice Check' },
    ],
  },
]
