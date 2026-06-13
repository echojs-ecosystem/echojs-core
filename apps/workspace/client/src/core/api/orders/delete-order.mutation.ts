import { createMutation } from '@echojs-ecosystem/async'

import { httpClient } from '@core/http-client/index'

import { invalidateOrders } from '../invalidate'
import { apiPaths } from '../paths'

const deleteOrder = (id: string, signal?: AbortSignal) =>
  httpClient.delete(apiPaths.order(id), { signal }).unwrapJson<{ ok: true }>()

export const deleteOrderMutation = createMutation<{ ok: true }, { id: string }>({
  name: 'delete-order',
  mutationFn: ({ variables, signal }) => deleteOrder(variables.id, signal),
  onSuccess: invalidateOrders,
})
