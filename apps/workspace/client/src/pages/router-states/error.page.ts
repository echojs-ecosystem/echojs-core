import { createRouteView } from '@echojs-ecosystem/framework/router'

import { RouterErrorView } from '@widgets/router-states/index'

export const routerErrorPage = createRouteView({
  name: 'router-error',
  view: RouterErrorView,
})
