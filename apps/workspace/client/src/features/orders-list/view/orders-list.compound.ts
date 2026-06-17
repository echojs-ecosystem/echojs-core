import { code, createCompoundView, div, h1, p } from '@echojs-ecosystem/framework/hyperdom'

import { i18n } from '@core/i18n/index'
import { adminLayoutStyles } from '@widgets/admin-shell/index'

import type { OrdersListVM } from '../model/orders-list.model'
import { OrdersListDebugView } from './orders-list-debug.view'
import { OrdersListFiltersView } from './orders-list-filters.view'
import { OrdersListTableView } from './orders-list-table.view'

const adminLayout = adminLayoutStyles()

type OrdersListSlotProps = OrdersListVM

export const OrdersList = createCompoundView({
  name: 'OrdersList',
  slots: {
    Filters: (vm: OrdersListSlotProps) => OrdersListFiltersView(vm),
    Table: (vm: OrdersListSlotProps) => OrdersListTableView(vm),
    Debug: (vm: OrdersListSlotProps) => OrdersListDebugView(vm),
  },
  layout: ({ Filters, Table, Debug }, vm: OrdersListSlotProps) =>
    div({ class: adminLayout.page() }, [
      h1({ class: 'text-2xl font-bold text-fg' }, () => i18n.t('orders.title')),
      p({ class: adminLayout.muted() }, [
        () => i18n.t('orders.lead'),
        ' • ',
        code({ class: adminLayout.code() }, () => vm.state.statusText()),
      ]),
      Filters(),
      Table(),
      Debug(),
    ]),
})
