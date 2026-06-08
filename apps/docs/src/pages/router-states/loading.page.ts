import { createRouteView } from '@echojs-ecosystem/framework/router'

import { RouterLoadingView } from '@entities/router-states/ui/loading.view'

export const routerLoadingPage = createRouteView({
  name: 'router-loading',
  view: () => RouterLoadingView(),
})
