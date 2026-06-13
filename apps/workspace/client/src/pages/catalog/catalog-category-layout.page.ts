import { createLayoutView } from '@echojs-ecosystem/framework/router'

import { CatalogCategoryLayoutView } from '@features/catalog/index'

export const catalogCategoryLayoutPage = createLayoutView({
  name: 'catalog-category-layout',
  view: CatalogCategoryLayoutView,
})
