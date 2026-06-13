import { createRouteView } from '@echojs-ecosystem/framework/router'

import { RouterNotFoundView } from '@widgets/router-states/index'

export const routerNotFoundPage = createRouteView({
  name: 'not-found',
  view: RouterNotFoundView,
})
