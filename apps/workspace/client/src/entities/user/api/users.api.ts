import { httpClient } from '@core/http/index'
import type {
  AdminUser,
  CreateUserInput,
  UpdateUserInput,
  UsersListQuery,
  UsersListResponse,
} from '@echojs-ecosystem/workspace-shared'

const listSearchParams = (query: UsersListQuery): Record<string, string | number> => {
  const params: Record<string, string | number> = {}
  if (query.q) params.q = query.q
  if (query.page) params.page = query.page
  if (query.pageSize) params.pageSize = query.pageSize
  if (query.role && query.role !== 'all') params.role = query.role
  if (query.status && query.status !== 'all') params.status = query.status
  if (query.department && query.department !== 'all') params.department = query.department
  if (query.verified && query.verified !== 'all') params.verified = query.verified
  if (query.country) params.country = query.country
  if (query.tag?.length) params.tag = query.tag.join(',')
  if (query.sort) params.sort = query.sort
  if (query.order) params.order = query.order
  return params
}

export const usersApi = {
  list: (query: UsersListQuery, signal?: AbortSignal) =>
    httpClient
      .get('/api/users', { searchParams: listSearchParams(query), signal })
      .unwrapJson<UsersListResponse>(),

  getById: (id: string, signal?: AbortSignal) =>
    httpClient.get(`/api/users/${id}`, { signal }).unwrapJson<AdminUser>(),

  create: (input: CreateUserInput, signal?: AbortSignal) =>
    httpClient.post('/api/users', { json: input, signal }).unwrapJson<{ user: AdminUser }>(),

  update: (id: string, input: UpdateUserInput, signal?: AbortSignal) =>
    httpClient.put(`/api/users/${id}`, { json: input, signal }).unwrapJson<{ user: AdminUser }>(),

  remove: (id: string, signal?: AbortSignal) =>
    httpClient.delete(`/api/users/${id}`, { signal }).unwrapJson<{ ok: true }>(),

  suspend: (id: string, signal?: AbortSignal) =>
    httpClient.post(`/api/users/${id}/suspend`, { signal }).unwrapJson<{ user: AdminUser }>(),

  activate: (id: string, signal?: AbortSignal) =>
    httpClient.post(`/api/users/${id}/activate`, { signal }).unwrapJson<{ user: AdminUser }>(),
}
