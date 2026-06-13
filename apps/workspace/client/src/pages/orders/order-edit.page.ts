import { createRouteView } from '@echojs-ecosystem/framework/router'

import { OrderEdit } from '@features/order-edit/index'

export const orderEditPage = createRouteView<{ id: string }>({
  name: 'order-edit',
  view: ({ params }) => OrderEdit({ orderId: params.id }),
})
