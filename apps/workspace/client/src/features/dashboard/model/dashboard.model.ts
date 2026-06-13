import { createModel } from '@echojs-ecosystem/framework/hyperdom'

import { dashboardStatsQuery } from '@core/api/index'

export const createDashboardModel = createModel(() => {
  const stats = dashboardStatsQuery.with()

  return {
    stats,
    isLoading: () => stats.isPending(),
    isFetching: () => stats.isFetching(),
    data: () => stats.data(),
  }
}, 'DashboardModel')

export type DashboardVM = ReturnType<typeof createDashboardModel>
