import { createComponent } from '@echojs-ecosystem/framework/hyperdom'

import { orderCreateModel } from './model/order-create.model'
import { OrderCreateView } from './view/order-create.view'

export const OrderCreate = createComponent(orderCreateModel, OrderCreateView, {
  name: 'OrderCreate',
})

export { OrderCreateView } from './view/order-create.view'
