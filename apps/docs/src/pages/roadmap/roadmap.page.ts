import { createRouteView } from '@echojs-ecosystem/framework/router'

import { Roadmap } from '@entities/roadmap'
import { applySeo } from '@core/seo/apply-seo.js'

export const roadmapPage = createRouteView({
  name: 'docs-roadmap',
  view: () => {
    applySeo({
      title: 'Roadmap · EchoJS',
      description:
        'Planned, in-progress, and shipped work across the EchoJS ecosystem. Suggest your own ideas.',
      path: '/docs/roadmap',
    })
    return Roadmap()
  },
})
