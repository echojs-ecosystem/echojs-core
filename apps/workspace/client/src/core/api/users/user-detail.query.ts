import { createQuery } from '@echojs-ecosystem/async'
import type { AdminUser } from '@echojs-ecosystem/workspace-shared'

import { httpClient } from '@core/http-client/index'

import { apiKeys } from '../keys'
import { apiPaths } from '../paths'

const fetchUserDetail = (id: string, signal?: AbortSignal) =>
  httpClient.get(apiPaths.user(id), { signal }).unwrapJson<AdminUser>()

export const userDetailQuery = createQuery<AdminUser, { id: string }>({
  name: 'user-detail',
  queryKey: ({ id }) => apiKeys.user(id),
  keepPreviousData: true,
  queryFn: ({ params, signal }) => fetchUserDetail(params.id, signal),
})
