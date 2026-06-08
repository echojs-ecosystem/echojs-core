import type { AnyPage } from '@echojs-ecosystem/framework/router'

import { createDocPage } from '@pages/doc/doc.page'
import { allDocsNavItems } from '@core/content/nav'
import type { ContentId } from '@core/content/types'

const cache = new Map<ContentId, AnyPage>()

export const getDocPage = (contentId: ContentId): AnyPage => {
  let page = cache.get(contentId)
  if (!page) {
    page = createDocPage(contentId)
    cache.set(contentId, page)
  }
  return page
}

export const docPageByContentId: Record<string, AnyPage> = Object.fromEntries(
  allDocsNavItems.map((item) => [item.contentId, getDocPage(item.contentId)])
)
