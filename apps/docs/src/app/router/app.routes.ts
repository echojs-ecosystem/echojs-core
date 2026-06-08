import { createRoutes } from '@echojs-ecosystem/framework/router'

import { docsRoutes } from '@app/router/docs.routes'
import { homePage } from '@pages/home/home.page'
import { sponsorsPage } from '@pages/sponsors/sponsors.page'

export const appRoutes = createRoutes([
  { path: '/', name: 'home', routeView: homePage },
  { path: '/sponsors', name: 'sponsors', routeView: sponsorsPage },
  ...docsRoutes,
])
