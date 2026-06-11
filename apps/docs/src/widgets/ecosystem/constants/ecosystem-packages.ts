import type { ContentId } from '@core/content/types'
import type { NavIconId } from '@core/content/nav-icon-id'
import { resolvePackageGroupIcon } from '@core/content/resolve-nav-icon'
import type { EcosystemPackageStatus } from '@widgets/ecosystem/constants/ecosystem-package-status'

export type { EcosystemPackageStatus } from '@widgets/ecosystem/constants/ecosystem-package-status'

export type EcosystemPackage = {
  name: string
  shortName: string
  contentId: ContentId
  featured?: boolean
  /** Home cards: green stable · yellow in dev · red experimental. */
  status?: EcosystemPackageStatus
}

const packageGroupKey = (contentId: ContentId): string =>
  contentId.slice('packages/'.length)

export const ecosystemPackageIcon = (pkg: EcosystemPackage): NavIconId =>
  resolvePackageGroupIcon(packageGroupKey(pkg.contentId))

export const ecosystemPackages: EcosystemPackage[] = [
  {
    name: '@echojs-ecosystem/reactivity',
    shortName: 'reactivity',
    contentId: 'packages/reactivity',
  },
  {
    name: '@echojs-ecosystem/hyperdom',
    shortName: 'hyperdom',
    contentId: 'packages/hyperdom',
  },
  {
    name: '@echojs-ecosystem/framework',
    shortName: 'framework',
    contentId: 'packages/framework',
    featured: true,
  },
  {
    name: '@echojs-ecosystem/router',
    shortName: 'router',
    contentId: 'packages/router',
  },
  {
    name: '@echojs-ecosystem/store',
    shortName: 'store',
    contentId: 'packages/store',
  },
  {
    name: '@echojs-ecosystem/async',
    shortName: 'async',
    contentId: 'packages/async',
  },
  {
    name: '@echojs-ecosystem/network/http',
    shortName: 'network/http',
    contentId: 'packages/network-http',
  },
  {
    name: '@echojs-ecosystem/url-state',
    shortName: 'url-state',
    contentId: 'packages/url-state',
  },
  {
    name: '@echojs-ecosystem/persist',
    shortName: 'persist',
    contentId: 'packages/persist',
  },
  {
    name: '@echojs-ecosystem/utils',
    shortName: 'utils',
    contentId: 'packages/utils',
  },
  {
    name: '@echojs-ecosystem/ui',
    shortName: 'ui',
    contentId: 'packages/ui',
  },
  {
    name: '@echojs-ecosystem/i18n',
    shortName: 'i18n',
    contentId: 'packages/i18n',
  },
  {
    name: '@echojs-ecosystem/devtools',
    shortName: 'devtools',
    contentId: 'packages/devtools',
    status: 'development',
  },
  {
    name: '@echojs-ecosystem/cli',
    shortName: 'cli',
    contentId: 'packages/cli',
    status: 'development',
  },
  {
    name: '@echojs-ecosystem/architect',
    shortName: 'architect',
    contentId: 'packages/architect',
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
