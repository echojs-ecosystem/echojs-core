import { createRoute, redirect } from '@echojs-ecosystem/framework/router'

import { dashboardPage } from '@pages/dashboard/index'

const rootRoute = createRoute('root')

export const rootRedirectRoutes = [
  { path: '/', name: 'root', route: rootRoute },
] as const

redirect({ from: rootRoute, to: dashboardPage })
