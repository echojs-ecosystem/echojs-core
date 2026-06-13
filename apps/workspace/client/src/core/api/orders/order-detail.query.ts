import { createQuery } from '@echojs-ecosystem/async'
import type { AdminOrder } from '@echojs-ecosystem/workspace-shared'

import { httpClient } from '@core/http-client/index'

import { apiKeys } from '../keys'
import { apiPaths } from '../paths'

const fetchOrderDetail = (id: string, signal?: AbortSignal) =>
  httpClient.get(apiPaths.order(id), { signal }).unwrapJson<AdminOrder>()

export const orderDetailQuery = createQuery<AdminOrder, { id: string }>({
  name: 'order-detail',
  queryKey: ({ id }) => apiKeys.order(id),
  keepPreviousData: true,
  queryFn: ({ params, signal }) => fetchOrderDetail(params.id, signal),
})
