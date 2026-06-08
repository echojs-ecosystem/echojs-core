import { createRouter } from '@echojs-ecosystem/framework/router'

import { appRoutes } from '@app/router/app.routes'
import {
  routerErrorPage,
  routerLoadingPage,
  routerNotFoundPage,
} from '@pages/router-states/index'
import '@app/router/guards'
import '@app/router/redirects'

export const appRouter = createRouter({
  history: 'browser',
  loadingView: routerLoadingPage,
  errorView: routerErrorPage,
  notFoundView: routerNotFoundPage,
  routes: appRoutes,
})
