import { createQuery } from '@echojs-ecosystem/async'
import type { OrdersListQuery, OrdersListResponse } from '@echojs-ecosystem/workspace-shared'

import { httpClient } from '@core/http-client/index'

import { apiKeys } from '../keys'
import { apiPaths } from '../paths'

const listSearchParams = (query: OrdersListQuery): Record<string, string | number | boolean> => {
  const params: Record<string, string | number | boolean> = {}
  if (query.q) params.q = query.q
  if (query.page) params.page = query.page
  if (query.status && query.status !== 'all') params.status = query.status
  if (query.priority) params.priority = true
  if (query.tag?.length) params.tag = query.tag.join(',')
  return params
}

const fetchOrdersList = (params: OrdersListQuery, signal?: AbortSignal) =>
  httpClient
    .get(apiPaths.orders(), { searchParams: listSearchParams(params), signal })
    .unwrapJson<OrdersListResponse>()

export const ordersListQuery = createQuery<OrdersListResponse, OrdersListQuery>({
  name: 'orders-list',
  queryKey: (params) => apiKeys.orders(params),
  keepPreviousData: true,
  queryFn: ({ params, signal }) => fetchOrdersList(params, signal),
})
