import { createRouter } from '@echojs-ecosystem/framework/router'

import { appRoutes } from '@app/router/app.routes.js'
import { routerErrorPage } from '@pages/router-states/error.page.js'
import { routerLoadingPage } from '@pages/router-states/loading.page.js'
import { routerNotFoundPage } from '@pages/router-states/not-found.page.js'

export const appRouter = createRouter({
  history: 'browser',
  loadingView: routerLoadingPage,
  errorView: routerErrorPage,
  notFoundView: routerNotFoundPage,
  routes: appRoutes,
})
