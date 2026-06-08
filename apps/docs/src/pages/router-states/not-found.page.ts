import { createRouteView } from '@echojs-ecosystem/framework/router'

import { RouterNotFoundView } from '@entities/router-states/ui/not-found.view'
import { applySeo } from '@core/seo/apply-seo'

export const routerNotFoundPage = createRouteView({
  name: 'not-found',
  view: () => {
    applySeo({
      title: 'Page not found',
      path: window.location.pathname,
      noindex: true,
    })
    return RouterNotFoundView()
  },
})
