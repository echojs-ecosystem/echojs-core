import { createComponent } from '@echojs-ecosystem/framework/hyperdom'

import { createDocsSearchModel } from '@widgets/search/model/docs-search.model'
import { DocsSearchView } from '@widgets/search/ui/docs-search.view'

export const DocsSearch = createComponent(
  createDocsSearchModel,
  DocsSearchView,
  {
    name: 'DocsSearch',
  }
)
