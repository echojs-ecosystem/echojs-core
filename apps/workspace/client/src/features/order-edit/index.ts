import { createComponent } from '@echojs-ecosystem/framework/hyperdom'
import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { orderEditModel } from './model/order-edit.model'
import { OrderEditView } from './view/order-edit.view'

export const OrderEdit = (props: { orderId: string }): Child =>
  createComponent(
    () => orderEditModel({ orderId: props.orderId })(),
    OrderEditView,
  )()

export { orderEditModel } from './model/order-edit.model'
export type { OrderEditProps, OrderEditVM } from './types/order-edit.types'
export { OrderEditView } from './view/order-edit.view'
