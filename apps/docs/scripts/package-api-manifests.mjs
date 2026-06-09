/** Catalog + page metadata for package API doc generation. */

export const packageApiManifests = {
  hyperdom: {
    npmPackage: '@echojs-ecosystem/hyperdom',
    importBadge: '@echojs-ecosystem/hyperdom',
    categories: [
      {
        id: 'core',
        title: 'Core',
        pages: [
          { slug: 'h', name: 'h' },
          { slug: 'render', name: 'render' },
          { slug: 'mount', name: 'mount' },
        ],
      },
      {
        id: 'lifecycle',
        title: 'Lifecycle',
        pages: [{ slug: 'lifecycle-mount', name: 'lifecycle/mount', importBadge: '@echojs-ecosystem/hyperdom/lifecycle/mount' }],
      },
      {
        id: 'model-view',
        title: 'Model & View',
        pages: [
          { slug: 'create-view', name: 'createView' },
          { slug: 'create-model', name: 'createModel' },
          { slug: 'create-component', name: 'createComponent' },
        ],
      },
      {
        id: 'control-flow',
        title: 'Control flow',
        pages: [
          { slug: 'show', name: 'Show' },
          { slug: 'list', name: 'List' },
        ],
      },
      {
        id: 'helpers',
        title: 'Context & helpers',
        pages: [
          { slug: 'strict-context', name: 'Strict context' },
          { slug: 'dsl', name: 'DSL tags' },
          { slug: 'cx', name: 'cx' },
        ],
      },
      {
        id: 'types',
        title: 'Types',
        pages: [{ slug: 'types', name: 'Types', isModule: true }],
      },
    ],
  },
  framework: {
    npmPackage: '@echojs-ecosystem/framework',
    importBadge: '@echojs-ecosystem/framework/app',
    categories: [
      {
        id: 'app',
        title: 'App',
        pages: [
          { slug: 'create-echo-app', name: 'createEchoApp' },
          { slug: 'create-provider', name: 'createProvider' },
          { slug: 'provide-inject', name: 'provide / inject' },
        ],
      },
      {
        id: 'barrel',
        title: 'Barrel',
        pages: [{ slug: 'app-exports', name: 'App exports', isModule: true }],
      },
    ],
  },
  store: {
    npmPackage: '@echojs-ecosystem/store',
    importBadge: '@echojs-ecosystem/store',
    categories: [
      {
        id: 'factories',
        title: 'Factories',
        pages: [
          { slug: 'create-store', name: 'createStore' },
          { slug: 'select', name: 'select' },
          { slug: 'combine', name: 'combine' },
        ],
      },
      {
        id: 'extensions',
        title: 'Extensions',
        pages: [{ slug: 'extensions', name: 'Extensions', isModule: true }],
      },
      {
        id: 'readonly',
        title: 'Readonly',
        pages: [{ slug: 'readonly', name: 'readonly' }],
      },
    ],
  },
  'network-http': {
    npmPackage: '@echojs-ecosystem/network',
    importBadge: '@echojs-ecosystem/network/http',
    categories: [
      {
        id: 'client',
        title: 'Client',
        pages: [{ slug: 'create-http-client', name: 'createHttpClient' }],
      },
      {
        id: 'request',
        title: 'Request',
        pages: [
          { slug: 'request-options', name: 'RequestOptions' },
          { slug: 'hooks', name: 'Hooks' },
        ],
      },
      {
        id: 'errors-types',
        title: 'Errors & types',
        pages: [
          { slug: 'errors', name: 'Errors', isModule: true },
          { slug: 'types', name: 'Types', isModule: true },
        ],
      },
    ],
  },
  query: {
    npmPackage: '@echojs-ecosystem/query',
    importBadge: '@echojs-ecosystem/query',
    categories: [
      {
        id: 'factories',
        title: 'Factories',
        pages: [
          { slug: 'create-query', name: 'createQuery' },
          { slug: 'create-infinite-query', name: 'createInfiniteQuery' },
          { slug: 'create-mutation', name: 'createMutation' },
        ],
      },
      {
        id: 'client',
        title: 'Client',
        pages: [{ slug: 'query-client', name: 'QueryClient & Provider' }],
      },
      {
        id: 'utilities',
        title: 'Utilities',
        pages: [{ slug: 'utilities', name: 'Managers & utilities', isModule: true }],
      },
    ],
  },
  'url-state': {
    npmPackage: '@echojs-ecosystem/url-state',
    importBadge: '@echojs-ecosystem/url-state',
    categories: [
      {
        id: 'factories',
        title: 'Factories',
        pages: [{ slug: 'create-query-params', name: 'createQueryParams' }],
      },
      {
        id: 'parsers',
        title: 'Parsers',
        pages: [{ slug: 'parsers', name: 'parseAs*', isModule: true }],
      },
      {
        id: 'adapters',
        title: 'Adapters',
        pages: [{ slug: 'adapters', name: 'Adapters', isModule: true }],
      },
      {
        id: 'types',
        title: 'Types',
        pages: [{ slug: 'types', name: 'Types', isModule: true }],
      },
    ],
  },
  persist: {
    npmPackage: '@echojs-ecosystem/persist',
    importBadge: '@echojs-ecosystem/persist',
    categories: [
      {
        id: 'extensions',
        title: 'Extensions',
        pages: [{ slug: 'with-storage', name: 'withStorage' }],
      },
      {
        id: 'adapters',
        title: 'Adapters',
        pages: [{ slug: 'adapters', name: 'Adapters', isModule: true }],
      },
      {
        id: 'serializers',
        title: 'Serializers',
        pages: [{ slug: 'serializers', name: 'Serializers', isModule: true }],
      },
      {
        id: 'controller',
        title: 'Controller',
        pages: [{ slug: 'persist-controller', name: 'Persist controller' }],
      },
    ],
  },
  ui: {
    npmPackage: '@echojs-ecosystem/ui',
    importBadge: '@echojs-ecosystem/ui',
    categories: [
      {
        id: 'components',
        title: 'Components',
        pages: [
          { slug: 'button', name: 'Button', importBadge: '@echojs-ecosystem/ui/button' },
          { slug: 'field', name: 'Field', importBadge: '@echojs-ecosystem/ui/field' },
        ],
      },
      {
        id: 'provider',
        title: 'Provider',
        pages: [{ slug: 'provider', name: 'UIProvider', importBadge: '@echojs-ecosystem/ui/provider' }],
      },
    ],
  },
  i18n: {
    npmPackage: '@echojs-ecosystem/i18n',
    importBadge: '@echojs-ecosystem/i18n',
    categories: [
      {
        id: 'factories',
        title: 'Factories',
        pages: [
          { slug: 'create-i18n', name: 'createI18n' },
          { slug: 'create-i18n-provider', name: 'createI18nProvider' },
          { slug: 'detect-locale', name: 'detectLocale' },
        ],
      },
      {
        id: 'types',
        title: 'Types',
        pages: [{ slug: 'types', name: 'Types', isModule: true }],
      },
    ],
  },
  devtools: {
    npmPackage: '@echojs-ecosystem/devtools',
    importBadge: '@echojs-ecosystem/devtools',
    categories: [
      {
        id: 'registry',
        title: 'Registry',
        pages: [{ slug: 'register-node', name: 'registerDevtoolsNode' }],
      },
      {
        id: 'bridge',
        title: 'Bridge',
        pages: [{ slug: 'bridge', name: 'Bridge' }],
      },
    ],
  },
  cli: {
    npmPackage: '@echojs-ecosystem/cli',
    importBadge: '@echojs-ecosystem/cli',
    categories: [
      {
        id: 'commands',
        title: 'Planned commands',
        pages: [
          { slug: 'create', name: 'create (planned)' },
          { slug: 'generate', name: 'generate (planned)' },
        ],
      },
    ],
  },
  architect: {
    npmPackage: '@echojs-ecosystem/architect',
    importBadge: '@echojs-ecosystem/architect',
    categories: [
      {
        id: 'config',
        title: 'Config',
        pages: [{ slug: 'define-config', name: 'defineConfig' }],
      },
      {
        id: 'presets',
        title: 'Presets',
        pages: [{ slug: 'presets', name: 'Presets', isModule: true }],
      },
      {
        id: 'lint',
        title: 'Lint',
        pages: [{ slug: 'lint', name: 'lint' }],
      },
    ],
  },
}
