import { createRouteView } from '@echojs-ecosystem/framework/router'
import { div, p } from '@echojs-ecosystem/framework/hyperdom'

export const routerLoadingPage = createRouteView({
  name: 'router-loading',
  view: () => div({ class: 'flex min-h-dvh items-center justify-center' }, p(null, 'Loading…')),
})
