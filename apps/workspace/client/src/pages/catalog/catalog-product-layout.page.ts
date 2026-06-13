import { createLayoutView } from '@echojs-ecosystem/framework/router'

import { CatalogProductLayoutView } from '@features/catalog/index'

export const catalogProductLayoutPage = createLayoutView({
  name: 'catalog-product-layout',
  view: CatalogProductLayoutView,
})
