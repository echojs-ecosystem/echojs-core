import { createMutation, getQueryProvider } from '@echojs-ecosystem/async'
import type { AdminOrder, UpdateOrderInput } from '@echojs-ecosystem/workspace-shared'

import { httpClient } from '@core/http-client/index'

import { invalidateOrders } from '../invalidate'
import { apiKeys } from '../keys'
import { apiPaths } from '../paths'

const updateOrder = (id: string, input: UpdateOrderInput, signal?: AbortSignal) =>
  httpClient.put(apiPaths.order(id), { json: input, signal }).unwrapJson<{ order: AdminOrder }>()

export const updateOrderMutation = createMutation<
  { order: AdminOrder },
  { id: string; input: UpdateOrderInput }
>({
  name: 'update-order',
  mutationFn: ({ variables, signal }) => updateOrder(variables.id, variables.input, signal),
  onSuccess: (ctx) => {
    invalidateOrders()
    void getQueryProvider()?.invalidateQueries(apiKeys.order(ctx.variables.id))
  },
})
