import type { RouteView } from '@echojs-ecosystem/framework/router'
import { div, p } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { findCategory } from '@entities/catalog/index'
import { adminLayoutStyles } from '@widgets/admin-shell/index'

const layout = adminLayoutStyles()

export const CatalogCategoryLayoutView: RouteView<unknown, unknown, unknown> = ({ params, outlet }) => {
  const { categoryId } = params as { categoryId: string }
  const category = findCategory(categoryId)

  return div([
    p({ class: layout.breadcrumbs() }, [
      'Catalog / ',
      p({ class: layout.breadcrumbActive() }, category?.name ?? categoryId),
    ]),
    outlet(),
  ])
}
