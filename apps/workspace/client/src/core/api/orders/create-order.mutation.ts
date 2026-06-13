import { createMutation } from '@echojs-ecosystem/async'
import type { AdminOrder, CreateOrderInput } from '@echojs-ecosystem/workspace-shared'

import { httpClient } from '@core/http-client/index'

import { invalidateOrders } from '../invalidate'
import { apiPaths } from '../paths'

const createOrder = (input: CreateOrderInput, signal?: AbortSignal) =>
  httpClient.post(apiPaths.orders(), { json: input, signal }).unwrapJson<{ order: AdminOrder }>()

export const createOrderMutation = createMutation<{ order: AdminOrder }, CreateOrderInput>({
  name: 'create-order',
  mutationFn: ({ variables, signal }) => createOrder(variables, signal),
  onSuccess: invalidateOrders,
})
