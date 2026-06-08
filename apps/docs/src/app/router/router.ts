import { createRouter } from '@echojs-ecosystem/framework/router'

import { appRoutes } from '@app/router/app.routes'
import { routerErrorPage } from '@pages/router-states/error.page'
import { routerLoadingPage } from '@pages/router-states/loading.page'
import { routerNotFoundPage } from '@pages/router-states/not-found.page'

export const appRouter = createRouter({
  history: 'browser',
  loadingView: routerLoadingPage,
  errorView: routerErrorPage,
  notFoundView: routerNotFoundPage,
  routes: appRoutes,
})
