import { createComponent } from '@echojs-ecosystem/framework/hyperdom'
import { createRouteView } from '@echojs-ecosystem/framework/router'

import { createOrderEditModel } from '@features/order-edit/model/order-edit.model'
import { OrderEditView } from '@features/order-edit/ui/order-edit.view'

export const orderEditPage = createRouteView<{ id: string }>({
  name: 'order-edit',
  view: ({ params }) =>
    createComponent(
      () => createOrderEditModel({ orderId: params.id })(),
      OrderEditView,
    )(),
})
