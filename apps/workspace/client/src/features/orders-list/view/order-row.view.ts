import {
  button,
  createView,
  div,
  td,
  tr,
} from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'
import type { AdminOrder } from '@echojs-ecosystem/workspace-shared'

import { PermissionCheck } from '@core/permission/index.js'
import { i18n } from '@core/i18n/index'
import { orderEditPage } from '@app/router/index'
import { adminLayoutStyles } from '@widgets/admin-shell/index'

import type { OrdersListVM } from '../model/orders-list.model'

const layout = adminLayoutStyles()

export type OrderRowVM = {
  vm: OrdersListVM
  order: AdminOrder
}

export const OrderRowView = createView(({ vm, order }: OrderRowVM): Child =>
  tr([
    td({ class: layout.td() }, order.id),
    td({ class: layout.td() }, order.customer),
    td({ class: layout.td() }, `$${order.total}`),
    td({ class: layout.td() }, order.status),
    td({ class: layout.td() }, [
      div({ class: layout.rowActions() }, [
        PermissionCheck('order.update', order, () =>
          NavLink({
            to: orderEditPage,
            params: { id: order.id },
            class: layout.btn(),
            children: () => i18n.t('orders.edit'),
          }),
        ),
        PermissionCheck('order.delete', order, () =>
          button(
            {
              type: 'button',
              class: layout.btnDanger(),
              disabled: vm.state.pendingAction(),
              onClick: () => vm.functions.deleteOrderById(order),
            },
            () => i18n.t('orders.delete'),
          ),
        ),
        PermissionCheck('order.refund', order, () =>
          button(
            {
              type: 'button',
              class: layout.btn(),
              disabled: vm.state.pendingAction(),
              onClick: () => vm.functions.refundOrderById(order),
            },
            () => (vm.state.isRefundPending() ? '…' : i18n.t('orders.refund')),
          ),
        ),
      ]),
    ]),
  ]),
'OrderRowView')
