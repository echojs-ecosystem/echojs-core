import { createComponent } from '@echojs-ecosystem/framework/hyperdom'

import { dashboardModel } from './model/dashboard.model'
import { DashboardView } from './view/dashboard.view'

export const Dashboard = createComponent(dashboardModel, DashboardView, {
  name: 'Dashboard',
})
