import type { AdminOrder } from '@echojs-ecosystem/workspace-shared'

import type { OrderEditFormValue } from '../order-edit.validation'

export const orderToFormValue = (order: AdminOrder): OrderEditFormValue => ({
  customer: order.customer,
  total: order.total,
  status: order.status,
  tags: [...order.tags],
})
