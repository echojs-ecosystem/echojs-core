/** Auto-generated from package-api-manifests.mjs — do not edit by hand. */

export const hyperdomDocCategories = [
  {
    id: 'core',
    title: 'Core',
    entries: [
      { slug: 'h', name: 'h', description: 'h — see API page.' },
      { slug: 'render', name: 'render', description: 'render — see API page.' },
      { slug: 'mount', name: 'mount', description: 'mount — see API page.' },
    ],
  },
  {
    id: 'model-view',
    title: 'Model & View',
    entries: [
      { slug: 'create-view', name: 'createView', description: 'createView — see API page.' },
      { slug: 'create-model', name: 'createModel', description: 'createModel — see API page.' },
      { slug: 'create-component', name: 'createComponent', description: 'createComponent — see API page.' },
    ],
  },
  {
    id: 'control-flow',
    title: 'Control flow',
    entries: [
      { slug: 'show', name: 'Show', description: 'Show — see API page.' },
      { slug: 'list', name: 'List', description: 'List — see API page.' },
    ],
  },
  {
    id: 'helpers',
    title: 'Context & helpers',
    entries: [
      { slug: 'strict-context', name: 'Strict context', description: 'Strict context — see API page.' },
      { slug: 'dsl', name: 'DSL tags', description: 'DSL tags — see API page.' },
      { slug: 'cx', name: 'cx', description: 'cx — see API page.' },
    ],
  },
  {
    id: 'types',
    title: 'Types',
    entries: [
      { slug: 'types', name: 'Types', description: 'Types — see API page.' },
    ],
  },
] as const

export const frameworkDocCategories = [
  {
    id: 'app',
    title: 'App',
    entries: [
      { slug: 'create-echo-app', name: 'createEchoApp', description: 'createEchoApp — see API page.' },
      { slug: 'create-provider', name: 'createProvider', description: 'createProvider — see API page.' },
      { slug: 'provide-inject', name: 'provide / inject', description: 'provide / inject — see API page.' },
    ],
  },
  {
    id: 'barrel',
    title: 'Barrel',
    entries: [
      { slug: 'app-exports', name: 'App exports', description: 'App exports — see API page.' },
    ],
  },
] as const

export const storeDocCategories = [
  {
    id: 'factories',
    title: 'Factories',
    entries: [
      { slug: 'create-store', name: 'createStore', description: 'createStore — see API page.' },
      { slug: 'select', name: 'select', description: 'select — see API page.' },
      { slug: 'combine', name: 'combine', description: 'combine — see API page.' },
    ],
  },
  {
    id: 'extensions',
    title: 'Extensions',
    entries: [
      { slug: 'extensions', name: 'Extensions', description: 'Extensions — see API page.' },
    ],
  },
  {
    id: 'readonly',
    title: 'Readonly',
    entries: [
      { slug: 'readonly', name: 'readonly', description: 'readonly — see API page.' },
    ],
  },
] as const

export const networkHttpDocCategories = [
  {
    id: 'client',
    title: 'Client',
    entries: [
      { slug: 'create-http-client', name: 'createHttpClient', description: 'createHttpClient — see API page.' },
    ],
  },
  {
    id: 'request',
    title: 'Request',
    entries: [
      { slug: 'request-options', name: 'RequestOptions', description: 'RequestOptions — see API page.' },
      { slug: 'hooks', name: 'Hooks', description: 'Hooks — see API page.' },
    ],
  },
  {
    id: 'errors-types',
    title: 'Errors & types',
    entries: [
      { slug: 'errors', name: 'Errors', description: 'Errors — see API page.' },
      { slug: 'types', name: 'Types', description: 'Types — see API page.' },
    ],
  },
] as const

export const asyncDocCategories = [
  {
    id: 'factories',
    title: 'Factories',
    entries: [
      { slug: 'create-query', name: 'createQuery', description: 'createQuery — see API page.' },
      { slug: 'create-infinite-query', name: 'createInfiniteQuery', description: 'createInfiniteQuery — see API page.' },
      { slug: 'create-mutation', name: 'createMutation', description: 'createMutation — see API page.' },
    ],
  },
  {
    id: 'client',
    title: 'Client',
    entries: [
      { slug: 'query-client', name: 'QueryClient & Provider', description: 'QueryClient & Provider — see API page.' },
    ],
  },
  {
    id: 'utilities',
    title: 'Utilities',
    entries: [
      { slug: 'utilities', name: 'Managers & utilities', description: 'Managers & utilities — see API page.' },
    ],
  },
] as const

export const urlStateDocCategories = [
  {
    id: 'factories',
    title: 'Factories',
    entries: [
      { slug: 'create-query-params', name: 'createQueryParams', description: 'createQueryParams — see API page.' },
    ],
  },
  {
    id: 'parsers',
    title: 'Parsers',
    entries: [
      { slug: 'parse-as-string', name: 'parseAsString', description: 'parseAsString — see API page.' },
      { slug: 'parse-as-integer', name: 'parseAsInteger', description: 'parseAsInteger — see API page.' },
      { slug: 'parse-as-float', name: 'parseAsFloat', description: 'parseAsFloat — see API page.' },
      { slug: 'parse-as-boolean', name: 'parseAsBoolean', description: 'parseAsBoolean — see API page.' },
      { slug: 'parse-as-iso-date', name: 'parseAsIsoDate', description: 'parseAsIsoDate — see API page.' },
      { slug: 'parse-as-timestamp', name: 'parseAsTimestamp', description: 'parseAsTimestamp — see API page.' },
      { slug: 'parse-as-literal', name: 'parseAsLiteral', description: 'parseAsLiteral — see API page.' },
      { slug: 'parse-as-array-of', name: 'parseAsArrayOf', description: 'parseAsArrayOf — see API page.' },
      { slug: 'parse-as-native-array-of', name: 'parseAsNativeArrayOf', description: 'parseAsNativeArrayOf — see API page.' },
      { slug: 'parse-as-json', name: 'parseAsJson', description: 'parseAsJson — see API page.' },
      { slug: 'create-custom-parser', name: 'createCustomParser', description: 'createCustomParser — see API page.' },
      { slug: 'create-custom-multi-parser', name: 'createCustomMultiParser', description: 'createCustomMultiParser — see API page.' },
      { slug: 'is-multi-parser', name: 'isMultiParser', description: 'isMultiParser — see API page.' },
    ],
  },
  {
    id: 'adapters',
    title: 'Adapters',
    entries: [
      { slug: 'adapters', name: 'Adapters', description: 'Adapters — see API page.' },
    ],
  },
  {
    id: 'types',
    title: 'Types',
    entries: [
      { slug: 'types', name: 'Types', description: 'Types — see API page.' },
    ],
  },
] as const

export const persistDocCategories = [
  {
    id: 'extensions',
    title: 'Extensions',
    entries: [
      { slug: 'with-storage', name: 'withStorage', description: 'withStorage — see API page.' },
    ],
  },
  {
    id: 'adapters',
    title: 'Adapters',
    entries: [
      { slug: 'adapters', name: 'Adapters', description: 'Adapters — see API page.' },
    ],
  },
  {
    id: 'serializers',
    title: 'Serializers',
    entries: [
      { slug: 'serializers', name: 'Serializers', description: 'Serializers — see API page.' },
    ],
  },
  {
    id: 'controller',
    title: 'Controller',
    entries: [
      { slug: 'persist-controller', name: 'Persist controller', description: 'Persist controller — see API page.' },
    ],
  },
] as const

export const uiDocCategories = [
  {
    id: 'components',
    title: 'Components',
    entries: [
      { slug: 'button', name: 'Button', description: 'Button — see API page.' },
      { slug: 'field', name: 'Field', description: 'Field — see API page.' },
    ],
  },
  {
    id: 'provider',
    title: 'Provider',
    entries: [
      { slug: 'provider', name: 'UIProvider', description: 'UIProvider — see API page.' },
    ],
  },
] as const

export const i18nDocCategories = [
  {
    id: 'factories',
    title: 'Factories',
    entries: [
      { slug: 'create-i18n', name: 'createI18n', description: 'createI18n — see API page.' },
      { slug: 'create-i18n-provider', name: 'createI18nProvider', description: 'createI18nProvider — see API page.' },
      { slug: 'detect-locale', name: 'detectLocale', description: 'detectLocale — see API page.' },
    ],
  },
  {
    id: 'types',
    title: 'Types',
    entries: [
      { slug: 'types', name: 'Types', description: 'Types — see API page.' },
    ],
  },
] as const

export const devtoolsDocCategories = [
  {
    id: 'registry',
    title: 'Registry',
    entries: [
      { slug: 'register-node', name: 'registerDevtoolsNode', description: 'registerDevtoolsNode — see API page.' },
    ],
  },
  {
    id: 'bridge',
    title: 'Bridge',
    entries: [
      { slug: 'bridge', name: 'Bridge', description: 'Bridge — see API page.' },
    ],
  },
] as const

export const cliDocCategories = [
  {
    id: 'commands',
    title: 'Planned commands',
    entries: [
      { slug: 'create', name: 'create (planned)', description: 'create (planned) — see API page.' },
      { slug: 'generate', name: 'generate (planned)', description: 'generate (planned) — see API page.' },
    ],
  },
] as const

export const architectDocCategories = [
  {
    id: 'config',
    title: 'Config',
    entries: [
      { slug: 'define-config', name: 'defineConfig', description: 'defineConfig — see API page.' },
    ],
  },
  {
    id: 'presets',
    title: 'Presets',
    entries: [
      { slug: 'presets', name: 'Presets', description: 'Presets — see API page.' },
    ],
  },
  {
    id: 'lint',
    title: 'Lint',
    entries: [
      { slug: 'lint', name: 'lint', description: 'lint — see API page.' },
    ],
  },
] as const

export type PackageApiDocCategory = {
  id: string
  title: string
  entries: readonly { slug: string; name: string; description: string }[]
}

export const packageApiDocCategoriesById = {
  'hyperdom': hyperdomDocCategories,
  'framework': frameworkDocCategories,
  'store': storeDocCategories,
  'network-http': networkHttpDocCategories,
  'async': asyncDocCategories,
  'url-state': urlStateDocCategories,
  'persist': persistDocCategories,
  'ui': uiDocCategories,
  'i18n': i18nDocCategories,
  'devtools': devtoolsDocCategories,
  'cli': cliDocCategories,
  'architect': architectDocCategories,
} as const satisfies Record<string, readonly PackageApiDocCategory[]>
