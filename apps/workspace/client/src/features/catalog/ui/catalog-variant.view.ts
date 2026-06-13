import {
  button,
  code,
  div,
  h1,
  p,
  pre,
  section,
  Show,
} from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { catalogVariantPage } from '@app/router/index'
import { appPermission } from '@core/permission/index.js'
import { findVariant } from '@entities/catalog/index'
import { adminLayoutStyles } from '@widgets/admin-shell/index'

const layout = adminLayoutStyles()

export type CatalogVariantTab = 'specs' | 'stock' | 'edit'

export const CatalogVariantView = ({
  params,
  query,
}: {
  params: { categoryId: string; productId: string; variantId: string }
  query: { tab?: CatalogVariantTab }
}): Child => {
  const tab = query.tab ?? 'specs'
  const found = findVariant(params.categoryId, params.productId, params.variantId)

  const setTab = (next: CatalogVariantTab): void => {
    catalogVariantPage.go(params, { query: { tab: next }, replace: true })
  }

  return div([
    h1({ class: 'text-xl font-semibold text-fg' }, found?.variant.name ?? params.variantId),
    p({ class: layout.muted() }, [
      code({ class: layout.code() }, '/catalog/:categoryId/product/:productId/variant/:variantId'),
    ]),
    div({ class: 'my-3 flex flex-wrap gap-2' }, [
      button({ type: 'button', class: layout.btn(), onClick: () => setTab('specs') }, 'Specs'),
      button({ type: 'button', class: layout.btn(), onClick: () => setTab('stock') }, 'Stock'),
      button({ type: 'button', class: layout.btn(), onClick: () => setTab('edit') }, 'Edit'),
    ]),
    section({ class: layout.card() }, [
      tab === 'specs'
        ? p(null, `SKU: ${found?.variant.sku ?? '—'}`)
        : tab === 'stock'
          ? p(null, 'In stock: 42 (mock)')
          : Show(
              () => appPermission.check('catalog.edit'),
              () => p(null, 'Edit form (permission granted)'),
              () => p({ class: layout.muted() }, 'catalog.edit denied'),
            ),
      Show(
        () => appPermission.check('catalog.delete'),
        () => button({ type: 'button', class: `${layout.btnDanger()} mt-3` }, 'Delete variant'),
      ),
    ]),
    pre({ class: 'mt-4 overflow-auto rounded-xl bg-code-bg p-4 text-xs text-stone-200' }, () =>
      JSON.stringify({ params, query: { tab } }, null, 2),
    ),
  ])
}
