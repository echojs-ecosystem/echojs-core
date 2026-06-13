import { createComponent } from '@echojs-ecosystem/framework/hyperdom'

import { ordersListModel } from './model/orders-list.model'
import { OrdersListView } from './ui/orders-list.view'

export const OrdersList = createComponent(ordersListModel, OrdersListView, {
  name: 'OrdersList',
})

export { OrdersListView } from './ui/orders-list.view'
