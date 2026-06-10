import type { ContentId } from '@core/content/types'

export type EcosystemPackage = {
  name: string
  shortName: string
  description: string
  contentId: ContentId
  icon: string
  featured?: boolean
}

export const ecosystemPackages: EcosystemPackage[] = [
  {
    name: '@echojs-ecosystem/reactivity',
    shortName: 'reactivity',
    description: 'Signals, computed, effects — the reactive core.',
    contentId: 'packages/reactivity',
    icon: '⚡',
  },
  {
    name: '@echojs-ecosystem/hyperdom',
    shortName: 'hyperdom',
    description: 'Fine-grained DOM runtime without a virtual DOM.',
    contentId: 'packages/hyperdom',
    icon: '◆',
  },
  {
    name: '@echojs-ecosystem/framework',
    shortName: 'framework',
    description: 'App bootstrap, providers, and composition root.',
    contentId: 'packages/framework',
    icon: '◎',
    featured: true,
  },
  {
    name: '@echojs-ecosystem/router',
    shortName: 'router',
    description: 'Type-safe, file-oriented routing for Echo apps.',
    contentId: 'packages/router',
    icon: '⤳',
  },
  {
    name: '@echojs-ecosystem/store',
    shortName: 'store',
    description: 'Structured state with actions and selectors.',
    contentId: 'packages/store',
    icon: '▣',
  },
  {
    name: '@echojs-ecosystem/async',
    shortName: 'async',
    description: 'Signal-native data fetching and cache layer.',
    contentId: 'packages/async',
    icon: '↻',
  },
  {
    name: '@echojs-ecosystem/network/http',
    shortName: 'network/http',
    description: 'Tree-shakeable HTTP client with hooks, retries, and typed responses.',
    contentId: 'packages/network-http',
    icon: '🌐',
  },
  {
    name: '@echojs-ecosystem/url-state',
    shortName: 'url-state',
    description: 'Sync UI state with URL search params.',
    contentId: 'packages/url-state',
    icon: '🔗',
  },
  {
    name: '@echojs-ecosystem/persist',
    shortName: 'persist',
    description: 'Persist stores and signals to storage.',
    contentId: 'packages/persist',
    icon: '💾',
  },
  {
    name: '@echojs-ecosystem/utils',
    shortName: 'utils',
    description: 'Signal-native composables — sensors, DOM, timing, browser.',
    contentId: 'packages/utils',
    icon: '🧰',
  },
  {
    name: '@echojs-ecosystem/ui',
    shortName: 'ui',
    description: 'Accessible UI primitives built on HyperDOM.',
    contentId: 'packages/ui',
    icon: '◈',
  },
  {
    name: '@echojs-ecosystem/i18n',
    shortName: 'i18n',
    description: 'Lightweight internationalization for Echo apps.',
    contentId: 'packages/i18n',
    icon: '🌐',
  },
  {
    name: '@echojs-ecosystem/devtools',
    shortName: 'devtools',
    description: 'Developer tools for debugging Echo applications.',
    contentId: 'packages/devtools',
    icon: '🔧',
  },
  {
    name: '@echojs-ecosystem/cli',
    shortName: 'cli',
    description: 'Scaffold apps and feature slices (planned).',
    contentId: 'packages/cli',
    icon: '⌘',
  },
  {
    name: '@echojs-ecosystem/architect',
    shortName: 'architect',
    description:
      'Architecture linter — layers, public APIs, import boundaries.',
    contentId: 'packages/architect',
    icon: '🏛',
  },
]

export const ecosystemFrameworkPackage = ecosystemPackages.find(
  (pkg) => pkg.featured
)!

export const ecosystemModulePackages = ecosystemPackages.filter(
  (pkg) => !pkg.featured
)

/** Spotlight modules on the home page mobile layout (core adoption path). */
export const ecosystemSpotlightShortNames = [
  'reactivity',
  'hyperdom',
  'router',
  'async',
  'store',
  'ui',
] as const

export const ecosystemSpotlightPackages = ecosystemSpotlightShortNames
  .map((shortName) =>
    ecosystemModulePackages.find((pkg) => pkg.shortName === shortName)
  )
  .filter((pkg): pkg is EcosystemPackage => pkg !== undefined)

export const ecosystemMorePackages = ecosystemModulePackages.filter(
  (pkg) =>
    !ecosystemSpotlightShortNames.includes(
      pkg.shortName as (typeof ecosystemSpotlightShortNames)[number]
    )
)
