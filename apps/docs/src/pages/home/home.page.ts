import { createRouteView } from '@echojs-ecosystem/framework/router'

import { Home } from '@entities/home'
import { applySeo } from '@core/seo/apply-seo'

export const homePage = createRouteView({
  name: 'home',
  view: () => {
    applySeo({
      title: 'EchoJS Documentation',
      description:
        'Signal-first framework for building scalable web applications.',
      path: '/',
    })
    return Home()
  },
})
