import { createQuery } from '@echojs-ecosystem/async'
import type { DashboardStats } from '@echojs-ecosystem/workspace-shared'

import { httpClient } from '@core/http-client/index'

import { apiKeys } from '../keys'
import { apiPaths } from '../paths'

const fetchDashboardStats = (signal?: AbortSignal) =>
  httpClient.get(apiPaths.dashboardStats(), { signal }).unwrapJson<DashboardStats>()

export const dashboardStatsQuery = createQuery<DashboardStats>({
  name: 'dashboard-stats',
  queryKey: () => apiKeys.dashboardStats(),
  queryFn: ({ signal }) => fetchDashboardStats(signal),
  refetchOnWindowFocus: true,
})
