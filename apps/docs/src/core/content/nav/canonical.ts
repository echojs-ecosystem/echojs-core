import type { ContentId, DocsNavItem, DocsNavItemEnriched } from '../types'

export const enrichNavItems = (
  sectionSlug: string,
  sectionTitle: string,
  items: DocsNavItem[]
): DocsNavItemEnriched[] =>
  items.map((it) => ({
    ...it,
    sectionSlug,
    sectionTitle,
  }))

const pickCanonicalNavItem = (
  duplicates: DocsNavItemEnriched[]
): DocsNavItemEnriched => {
  if (duplicates.length === 1) return duplicates[0]!
  const exact = duplicates.find(
    (it) => `${it.sectionSlug}/${it.slug}` === it.contentId
  )
  if (exact) return exact
  const prefixed = duplicates.find((it) =>
    it.contentId.startsWith(`${it.sectionSlug}/`)
  )
  return prefixed ?? duplicates[0]!
}

/** One route per `contentId` — sidebar may link to the same doc from multiple places. */
export const canonicalDocsRouteItems = (
  items: DocsNavItemEnriched[]
): DocsNavItemEnriched[] => {
  const byContentId = new Map<ContentId, DocsNavItemEnriched[]>()
  for (const item of items) {
    const list = byContentId.get(item.contentId) ?? []
    list.push(item)
    byContentId.set(item.contentId, list)
  }
  return [...byContentId.values()].map(pickCanonicalNavItem)
}

export const findNavItemByContentId = (
  items: DocsNavItemEnriched[],
  contentId: ContentId
): DocsNavItemEnriched | undefined => {
  const matches = items.filter((it) => it.contentId === contentId)
  return matches.length ? pickCanonicalNavItem(matches) : undefined
}

export type DocNavAdjacent = {
  prev?: DocsNavItemEnriched
  next?: DocsNavItemEnriched
}

/** Previous/next doc in canonical route order (matches sidebar reading order). */
export const getAdjacentDocNavItems = (
  items: DocsNavItemEnriched[],
  contentId: ContentId
): DocNavAdjacent => {
  const canonical = canonicalDocsRouteItems(items)
  const index = canonical.findIndex((it) => it.contentId === contentId)
  if (index === -1) return {}
  return {
    prev: index > 0 ? canonical[index - 1] : undefined,
    next: index < canonical.length - 1 ? canonical[index + 1] : undefined,
  }
}

/** Canonical URL for a doc route — matches `path: contentId` in docs routes. */
export const docHref = (contentId: ContentId): string => `/docs/${contentId}`

/** @deprecated Prefer {@link docHref} when you have a `contentId`. */
export const docPath = (sectionSlug: string, pageSlug: string): string =>
  `/docs/${sectionSlug}/${pageSlug}`
