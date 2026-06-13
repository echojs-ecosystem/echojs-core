import { createMutation } from '@echojs-ecosystem/async'
import type { AdminOrder } from '@echojs-ecosystem/workspace-shared'

import { httpClient } from '@core/http-client/index'

import { invalidateOrders } from '../invalidate'
import { apiPaths } from '../paths'

const refundOrder = (id: string, signal?: AbortSignal) =>
  httpClient.post(apiPaths.orderRefund(id), { signal }).unwrapJson<{ order: AdminOrder }>()

export const refundOrderMutation = createMutation<{ order: AdminOrder }, { id: string }>({
  name: 'refund-order',
  mutationFn: ({ variables, signal }) => refundOrder(variables.id, signal),
  onSuccess: invalidateOrders,
})
