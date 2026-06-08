import { createRouteView } from '@echojs-ecosystem/framework/router'

import { OrderEditView } from '@features/order-edit/index'

export const orderEditPage = createRouteView<{ id: string }>({
  name: 'order-edit',
  view: ({ params }) => OrderEditView({ params }),
})
