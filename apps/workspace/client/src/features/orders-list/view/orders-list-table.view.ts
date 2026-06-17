import {
  button,
  createView,
  div,
  List,
  p,
  section,
  Show,
  table,
  tbody,
  th,
  thead,
  tr,
} from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { appPermission } from '@core/permission/index.js'
import { newOrderPermissionSubject } from '@entities/order/index'
import { i18n } from '@core/i18n/index'
import { orderCreatePage } from '@app/router/index'
import { adminLayoutStyles, TableSectionHeader } from '@widgets/admin-shell/index'

import type { OrdersListVM } from '../model/orders-list.model'
import { OrderRowView } from './order-row.view'

const layout = adminLayoutStyles()

export const OrdersListTableView = createView((vm: OrdersListVM): Child =>
  section({ class: layout.card() }, [
    Show(
      () => vm.state.isPending(),
      () => p({ class: layout.muted() }, () => i18n.t('orders.loading')),
      () => [
        TableSectionHeader({
          title: () => i18n.t('orders.tableTitle'),
          count: () => vm.state.orderTotal(),
          createTo: orderCreatePage,
          createLabel: () => i18n.t('orders.create'),
          canCreate: () => appPermission.check('order.update', newOrderPermissionSubject),
        }),
        div({ class: layout.tableWrap() }, [
          table({ class: layout.table() }, [
            thead([
              tr([
                th({ class: layout.th() }, () => i18n.t('orders.colId')),
                th({ class: layout.th() }, () => i18n.t('orders.colCustomer')),
                th({ class: layout.th() }, () => i18n.t('orders.colTotal')),
                th({ class: layout.th() }, () => i18n.t('orders.colStatus')),
                th({ class: layout.th() }, () => i18n.t('orders.colActions')),
              ]),
            ]),
            tbody(List(() => vm.data.ordersListItems(), (order) => OrderRowView({ vm, order }))),
          ]),
        ]),
      ],
    ),
    p({ class: `${layout.muted()} mt-3` }, () =>
      i18n.t('orders.pagination', {
        page: vm.state.orderPage(),
        totalPages: vm.state.orderTotalPages(),
        total: vm.state.orderTotal(),
      }),
    ),
    div({ class: 'mt-2 flex gap-2' }, [
      button({ type: 'button', class: layout.btn(), onClick: vm.functions.prevPage }, '←'),
      button({ type: 'button', class: layout.btn(), onClick: vm.functions.nextPage }, '→'),
    ]),
  ]),
'OrdersListTableView')
