import { createRouter } from '@echojs-ecosystem/framework/router'

import { appRoutes } from '@app/router/app.router.routes'
import { appGuards } from '@app/router/app.router.guards'
import { appRedirects } from '@app/router/app.router.redirects'
import {
  routerErrorPage,
  routerLoadingPage,
  routerNotFoundPage,
} from '@pages/router-states/index'

export const appRouter = createRouter({
  history: 'browser',
  loadingView: routerLoadingPage,
  errorView: routerErrorPage,
  notFoundView: routerNotFoundPage,
  routes: appRoutes,
  guards: appGuards,
  redirects: appRedirects,
})
