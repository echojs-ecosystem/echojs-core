import { createRouteView } from '@echojs-ecosystem/framework/router'

import { dashboardStatsQuery } from '@core/api/index'
import { Dashboard } from '@features/dashboard/index'

export const dashboardPage = createRouteView({
  name: 'dashboard',
  beforeLoad: () => {
    void dashboardStatsQuery.with().refetch()
  },
  view: () => Dashboard(),
})
