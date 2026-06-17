import {
  button,
  createView,
  div,
  input,
  label,
  List,
  section,
  span,
} from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { i18n } from '@core/i18n/index'
import { adminLayoutStyles } from '@widgets/admin-shell/index'

import type { OrdersListVM } from '../model/orders-list.model'

const layout = adminLayoutStyles()

export const OrdersListFiltersView = createView((vm: OrdersListVM): Child =>
  section({ class: `${layout.filterBar()} my-4` }, [
    div({ class: 'grid min-w-[200px] flex-1 gap-1' }, [
      label({ class: layout.muted() }, () => i18n.t('orders.search')),
      input({
        class: layout.input(),
        value: () => vm.state.q(),
        onInput: (e: { currentTarget: HTMLInputElement }) =>
          vm.functions.setQ(e.currentTarget.value),
      }),
    ]),
    div({ class: 'flex flex-wrap gap-2' }, [
      List(
        () => vm.data.orderStatuses,
        (status) =>
          button(
            {
              type: 'button',
              class: layout.btn(),
              onClick: () => vm.functions.setStatus(status),
            },
            `status: ${status}`,
          ),
      ),
    ]),
    label({ class: 'flex items-center gap-2 text-sm text-fg-muted' }, [
      input({
        type: 'checkbox',
        checked: () => vm.state.priority(),
        onChange: (e: { currentTarget: HTMLInputElement }) =>
          vm.functions.setPriority(e.currentTarget.checked),
      }),
      span(null, 'Priority only (prio)'),
    ]),
    div({ class: 'flex flex-wrap gap-2' }, [
      List(
        () => vm.data.orderFilterTags,
        (tag) =>
          button(
            {
              type: 'button',
              class: layout.btn(),
              onClick: () => vm.functions.toggleTag(tag),
            },
            () => (vm.functions.isTagSelected(tag) ? `✓ ${tag}` : tag),
          ),
      ),
      button({ type: 'button', class: layout.btn(), onClick: vm.functions.resetFilters }, () =>
        i18n.t('orders.resetFilters'),
      ),
    ]),
  ]),
'OrdersListFiltersView')
