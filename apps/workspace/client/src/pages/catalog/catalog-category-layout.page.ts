import { createLayoutView } from '@echojs-ecosystem/framework/router'
import { div, p } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { findCategory } from '@entities/catalog/index'
import { adminLayoutStyles } from '@widgets/admin-shell/admin-shell.styles'

const layout = adminLayoutStyles()

export const catalogCategoryLayoutPage = createLayoutView({
  name: 'catalog-category-layout',
  view: ({ params, outlet }): Child => {
    const { categoryId } = params as { categoryId: string }
    const category = findCategory(categoryId)
    return div([
      p({ class: layout.breadcrumbs() }, [
        'Catalog / ',
        p({ class: layout.breadcrumbActive() }, category?.name ?? categoryId),
      ]),
      outlet(),
    ])
  },
})
