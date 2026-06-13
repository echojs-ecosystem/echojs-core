import { createRouteView } from '@echojs-ecosystem/framework/router'

import { OrderCreate } from '@features/order-create/index'

export const orderCreatePage = createRouteView({
  name: 'order-create',
  view: () => OrderCreate(),
})
