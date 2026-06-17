import { createRoute } from '@echojs-ecosystem/framework/router'

import { dashboardPage } from '@pages/dashboard/index'

export const rootRoute = createRoute('root')

export const rootRedirectRoutes = [
  { path: '/', name: 'root', route: rootRoute },
] as const

export const appRedirects = [
  {
    from: rootRoute,
    to: dashboardPage,
  },
] as const
