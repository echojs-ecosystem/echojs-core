import { signal } from '@echojs-ecosystem/reactivity'
import type { AdminOrder } from '@echojs-ecosystem/workspace-shared'

import { updateOrderMutation } from '@entities/api/index'
import { orderEditForm } from './order-edit.form'

export const updateOrderAction = updateOrderMutation.create()
export const $orderEditError = signal<string | null>(null)

let hydratedOrderId: string | null = null

export const hydrateOrderEditForm = (order: AdminOrder): void => {
  if (hydratedOrderId === order.id) return
  hydratedOrderId = order.id
  orderEditForm.hydrate({
    customer: order.customer,
    total: order.total,
    status: order.status,
    tags: [...order.tags],
  })
}
