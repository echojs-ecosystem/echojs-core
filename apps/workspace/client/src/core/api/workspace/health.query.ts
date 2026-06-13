import { createQuery } from '@echojs-ecosystem/async'
import type { ApiHealth } from '@echojs-ecosystem/workspace-shared'

import { httpClient } from '@core/http-client/index'

import { apiKeys } from '../keys'
import { apiPaths } from '../paths'

const fetchHealth = (signal?: AbortSignal) =>
  httpClient.get(apiPaths.health(), { signal }).unwrapJson<ApiHealth>()

export const apiHealthQuery = createQuery<ApiHealth>({
  name: 'api-health',
  queryKey: () => apiKeys.health(),
  queryFn: ({ signal }) => fetchHealth(signal),
  refetchOnWindowFocus: true,
})
