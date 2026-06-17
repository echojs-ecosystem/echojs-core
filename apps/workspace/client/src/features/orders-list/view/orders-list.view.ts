import { createView } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import type { OrdersListVM } from '../model/orders-list.model'
import { OrdersList } from './orders-list.compound'

export const OrdersListView = createView(
  (vm: OrdersListVM): Child =>
    OrdersList(vm, [
      OrdersList.Filters(vm),
      OrdersList.Table(vm),
      OrdersList.Debug(vm),
    ]),
  'OrdersListView',
)
