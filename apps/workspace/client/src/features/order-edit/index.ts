import { createComponent } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { createOrderEditModel } from './model/order-edit.model'
import { OrderEditView } from './ui/order-edit.view'

export const OrderEdit = (props: { orderId: string }): Child =>
  createComponent(
    () => createOrderEditModel({ orderId: props.orderId })(),
    OrderEditView,
  )()

export { createOrderEditModel } from './model/order-edit.model'
export type { OrderEditProps, OrderEditVM } from './types/order-edit.types'
export { OrderEditView } from './ui/order-edit.view'
