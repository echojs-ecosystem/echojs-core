import { createComponent } from '@echojs-ecosystem/framework/hyperdom'

import { createDashboardModel } from './model/dashboard.model'
import { DashboardView } from './ui/dashboard.view'

export const Dashboard = createComponent(createDashboardModel, DashboardView, {
  name: 'Dashboard',
})
