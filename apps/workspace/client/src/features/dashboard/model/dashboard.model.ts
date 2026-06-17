import { createModel } from '@echojs-ecosystem/framework/hyperdom'

import { dashboardStatsQuery } from '@core/api/index'

export const dashboardModel = createModel(
  () => {
    const stats = dashboardStatsQuery.with()
    const statsData = () => stats.data()

    return {
      state: {
        isLoading: () => stats.isPending(),
        isFetching: () => stats.isFetching(),
        serverTime: () => statsData()?.serverTime ?? '—',
        openOrders: () => statsData()?.openOrders ?? 0,
        activeUsers: () => statsData()?.activeUsers ?? 0,
        revenue: () => statsData()?.revenue ?? 0,
      },
      data: {
        stats,
      },
    }
  },
  { name: 'DashboardModel', structExports: true },
)

export type DashboardVM = ReturnType<typeof dashboardModel>
