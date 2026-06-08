import type { AnyPage } from '@echojs-ecosystem/framework/router'

import { blogPage } from '@pages/blog'
import type { ContentId } from '@core/content/types'

export type SiteHeaderNavItem =
  | { label: string; kind: 'doc'; contentId: ContentId }
  | {
      label: string
      kind: 'page'
      page: AnyPage
      match?: 'exact' | 'partial'
    }

/** Built at header mount — after blog routes are registered (avoids init-order TDZ). */
export const buildSiteHeaderNavItems = (): SiteHeaderNavItem[] => [
  {
    label: 'Introduction',
    kind: 'doc',
    contentId: 'introduction/what-is-echojs',
  },
  {
    label: 'Getting Started',
    kind: 'doc',
    contentId: 'getting-started/installation',
  },
  { label: 'Packages', kind: 'doc', contentId: 'packages/framework' },
  { label: 'Guides', kind: 'doc', contentId: 'guides/routing' },
  { label: 'Blog', kind: 'page', page: blogPage, match: 'partial' },
]
