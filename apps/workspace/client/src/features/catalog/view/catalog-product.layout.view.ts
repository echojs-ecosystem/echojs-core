import type { RouteView } from '@echojs-ecosystem/framework/router'
import { code, div, p } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { findProduct } from '@entities/catalog/index'
import { adminLayoutStyles } from '@widgets/admin-shell/index'

const layout = adminLayoutStyles()

export const CatalogProductLayoutView: RouteView<unknown, unknown, unknown> = ({ params, outlet }) => {
  const { categoryId, productId } = params as { categoryId: string; productId: string }
  const found = findProduct(categoryId, productId)

  return div([
    p({ class: layout.muted() }, [
      'Product ',
      code({ class: layout.code() }, productId),
      ' — ',
      found?.product.name ?? productId,
    ]),
    outlet(),
  ])
}
