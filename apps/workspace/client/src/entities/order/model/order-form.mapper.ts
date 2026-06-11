import type { AdminOrder } from '@echojs-ecosystem/workspace-shared'

import type { OrderFormValue } from './order-form.schema'

export const orderToFormValue = (order: AdminOrder): OrderFormValue => ({
  customer: order.customer,
  total: order.total,
  status: order.status,
  tags: [...order.tags],
})

export const parseTagsInput = (raw: string): string[] =>
  raw
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
