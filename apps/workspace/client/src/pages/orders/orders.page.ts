import { createRouteView } from '@echojs-ecosystem/framework/router'

import { OrdersList } from '@features/orders-list/index'

export const ordersPage = createRouteView({
  name: 'orders',
  view: () => OrdersList(),
})
