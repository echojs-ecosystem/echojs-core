import { createQuery } from '@echojs-ecosystem/async'
import type { UsersListQuery, UsersListResponse } from '@echojs-ecosystem/workspace-shared'

import { httpClient } from '@core/http-client/index'

import { apiKeys } from '../keys'
import { apiPaths } from '../paths'

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

const fetchUsersList = (params: UsersListQuery, signal?: AbortSignal) =>
  httpClient
    .get(apiPaths.users(), { searchParams: listSearchParams(params), signal })
    .unwrapJson<UsersListResponse>()

export const usersListQuery = createQuery<UsersListResponse, UsersListQuery>({
  name: 'users-list',
  queryKey: (params) => apiKeys.users(params),
  keepPreviousData: true,
  queryFn: ({ params, signal }) => fetchUsersList(params, signal),
})
