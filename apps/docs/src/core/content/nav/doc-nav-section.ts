import type { DocsNavItem, DocsNavSection } from '../types'

/** Top-level sidebar section (Getting Started, Guides, …). */
export const createDocNavSection = (
  id: string,
  title: string,
  items: DocsNavItem[]
): DocsNavSection => ({
  id,
  title,
  slug: id,
  items,
})
