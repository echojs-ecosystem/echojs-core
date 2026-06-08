import { httpClient } from '@core/http/index'
import type {
  AdminOrder,
  CreateOrderInput,
  OrdersListQuery,
  OrdersListResponse,
  UpdateOrderInput,
} from '@echojs-ecosystem/workspace-shared'

const listSearchParams = (query: OrdersListQuery): Record<string, string | number | boolean> => {
  const params: Record<string, string | number | boolean> = {}
  if (query.q) params.q = query.q
  if (query.page) params.page = query.page
  if (query.status && query.status !== 'all') params.status = query.status
  if (query.priority) params.priority = true
  if (query.tag?.length) params.tag = query.tag.join(',')
  return params
}

export const ordersApi = {
  list: (query: OrdersListQuery, signal?: AbortSignal) =>
    httpClient
      .get('/api/orders', { searchParams: listSearchParams(query), signal })
      .unwrapJson<OrdersListResponse>(),

  getById: (id: string, signal?: AbortSignal) =>
    httpClient.get(`/api/orders/${id}`, { signal }).unwrapJson<AdminOrder>(),

  create: (input: CreateOrderInput, signal?: AbortSignal) =>
    httpClient.post('/api/orders', { json: input, signal }).unwrapJson<{ order: AdminOrder }>(),

  update: (id: string, input: UpdateOrderInput, signal?: AbortSignal) =>
    httpClient.put(`/api/orders/${id}`, { json: input, signal }).unwrapJson<{ order: AdminOrder }>(),

  remove: (id: string, signal?: AbortSignal) =>
    httpClient.delete(`/api/orders/${id}`, { signal }).unwrapJson<{ ok: true }>(),

  refund: (id: string, signal?: AbortSignal) =>
    httpClient.post(`/api/orders/${id}/refund`, { signal }).unwrapJson<{ order: AdminOrder }>(),
}
