import { createComponent } from '@echojs-ecosystem/framework/hyperdom'

import { createOrderCreateModel } from './model/order-create.model'
import { OrderCreateView } from './ui/order-create.view'

export const OrderCreate = createComponent(createOrderCreateModel, OrderCreateView, {
  name: 'OrderCreate',
})

export { OrderCreateView } from './ui/order-create.view'
