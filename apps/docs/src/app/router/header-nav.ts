import type { AnyPage } from '@echojs-ecosystem/framework/router'

import { blogPage } from '@pages/blog'
import type { AppMessages } from '@core/providers/i18n'
import type { ContentId } from '@core/content/types'

type NavLabelKey = {
  [K in keyof AppMessages['nav']]: `nav.${K & string}`
}[keyof AppMessages['nav']]

export type SiteHeaderNavItem =
  | { labelKey: NavLabelKey; kind: 'doc'; contentId: ContentId }
  | {
      labelKey: NavLabelKey
      kind: 'page'
      page: AnyPage
      match?: 'exact' | 'partial'
    }

/** Built at header mount — after blog routes are registered (avoids init-order TDZ). */
export const buildSiteHeaderNavItems = (): SiteHeaderNavItem[] => [
  {
    labelKey: 'nav.gettingStarted',
    kind: 'doc',
    contentId: 'introduction/what-is-echojs',
  },
  { labelKey: 'nav.packages', kind: 'doc', contentId: 'packages/framework' },
  { labelKey: 'nav.guides', kind: 'doc', contentId: 'guides/routing' },
  { labelKey: 'nav.blog', kind: 'page', page: blogPage, match: 'partial' },
]
