import type { ContentId, DocsNavItem } from '../types'

export type DocNavItemOptions = Partial<
  Pick<DocsNavItem, 'slug' | 'keywords' | 'package' | 'badge' | 'group'>
>

/** One sidebar / route entry — `contentId` is the markdown path under `content/`. */
export const createDocNavItem = (
  contentId: ContentId,
  title: string,
  options?: DocNavItemOptions
): DocsNavItem => {
  const slug = options?.slug ?? contentId.split('/').pop() ?? contentId
  const { slug: _slug, ...rest } = options ?? {}
  return {
    slug,
    title,
    contentId,
    routeName: `docs-${contentId.replace(/\//g, '-')}`,
    ...rest,
  }
}

/** Shorthand for {@link createDocNavItem}. */
export const doc = createDocNavItem
