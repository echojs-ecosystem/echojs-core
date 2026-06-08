import { createRouteView } from '@echojs-ecosystem/framework/router'

import { OrdersListView } from '@features/orders-list/index'

export const ordersPage = createRouteView({
  name: 'orders',
  view: OrdersListView,
})
