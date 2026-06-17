import { createView, pre } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import type { OrdersListVM } from '../model/orders-list.model'

export const OrdersListDebugView = createView((vm: OrdersListVM): Child =>
  pre({ class: 'mt-4 overflow-auto rounded-xl bg-code-bg p-4 text-xs text-stone-200' }, () =>
    vm.functions.debugSnapshot(),
  ),
'OrdersListDebugView')
