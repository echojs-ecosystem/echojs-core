import { createRouteView } from '@echojs-ecosystem/framework/router'

import { DashboardView } from './ui/dashboard.view'

export const dashboardPage = createRouteView({
  name: 'dashboard',
  view: DashboardView,
})
