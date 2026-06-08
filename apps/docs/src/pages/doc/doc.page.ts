import { createRouteView } from '@echojs-ecosystem/framework/router'

import { DocArticle } from '@entities/doc-article'
import type { ContentId } from '@core/content/types'

/** Route view is eager; markdown body loads lazily inside {@link DocArticle}. */
export const createDocPage = (contentId: ContentId) =>
  createRouteView({
    name: `docs-${contentId.replace(/\//g, '-')}`,
    view: () => DocArticle({ contentId }),
  })
