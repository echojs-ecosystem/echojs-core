import { createComponent } from '@echojs-ecosystem/framework/hyperdom'
import { createRouteView } from '@echojs-ecosystem/framework/router'

import { createOrderCreateModel } from '@features/order-create/model/order-create.model'
import { OrderCreateView } from '@features/order-create/ui/order-create.view'

export const orderCreatePage = createRouteView({
  name: 'order-create',
  view: () => createComponent(createOrderCreateModel, OrderCreateView)(),
})
