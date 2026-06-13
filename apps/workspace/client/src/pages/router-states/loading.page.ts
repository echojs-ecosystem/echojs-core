import { createRouteView } from '@echojs-ecosystem/framework/router'

import { RouterLoadingView } from '@widgets/router-states/index'

export const routerLoadingPage = createRouteView({
  name: 'router-loading',
  view: RouterLoadingView,
})
