import type {
  ContentId,
  DocsNavItemEnriched,
  DocsNavSection,
} from '../types'
import { agentsNavItems, agentsNavSection } from '../agents-nav'
import { allPackageNavItems } from '../package-nav'

import {
  canonicalDocsRouteItems as buildCanonicalRoutes,
  docHref,
  docPath,
  enrichNavItems,
  findNavItemByContentId as findNavItem,
  getAdjacentDocNavItems as getAdjacentItems,
  type DocNavAdjacent,
} from './canonical'
import { docsNavSections } from './sections'

export type { DocsNavItem, DocsNavSection } from '../types'
export { agentsNavSection, agentsNavItems } from '../agents-nav'
export { packageNavGroups } from '../package-nav'
export { createDocNavItem, doc, type DocNavItemOptions } from './doc-nav-item'
export { createDocNavSection } from './doc-nav-section'
export { docsNavSections } from './sections'
export type { DocNavAdjacent }
export { docHref, docPath }

const mapSectionItems = (
  section: DocsNavSection,
  items: DocsNavSection['items']
): DocsNavItemEnriched[] =>
  enrichNavItems(section.slug, section.title, items)

export const allDocsNavItems: DocsNavItemEnriched[] = [
  ...docsNavSections.flatMap((section) => {
    if (section.id === 'packages') {
      return mapSectionItems(section, allPackageNavItems)
    }
    return mapSectionItems(section, section.items)
  }),
  ...mapSectionItems(agentsNavSection, agentsNavItems),
]

export const canonicalDocsRouteItems = (): DocsNavItemEnriched[] =>
  buildCanonicalRoutes(allDocsNavItems)

export const findNavItemByContentId = (
  contentId: ContentId
): DocsNavItemEnriched | undefined =>
  findNavItem(allDocsNavItems, contentId)

export const getAdjacentDocNavItems = (
  contentId: ContentId
): DocNavAdjacent => getAdjacentItems(allDocsNavItems, contentId)
