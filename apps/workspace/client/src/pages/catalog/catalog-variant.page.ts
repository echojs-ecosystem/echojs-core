import { createRouteView } from '@echojs-ecosystem/framework/router'

import { CatalogVariantView } from '@features/catalog/index'

export const catalogVariantPage = createRouteView<
  { categoryId: string; productId: string; variantId: string },
  { tab?: 'specs' | 'stock' | 'edit' }
>({
  name: 'catalog-variant',
  view: ({ params, query }) => CatalogVariantView({ params, query }),
})
