import {
  abstraction,
  defineConfig,
  dependenciesDirection,
} from '@echojs-ecosystem/architect'

import { appLayer } from './layers/app.layer'
import { coreLayer } from './layers/core.layer'
import { entitiesLayer } from './layers/entities.layer'
import { featuresLayer } from './layers/features.layer'
import { pagesLayer } from './layers/pages.layer'
import { widgetsLayer } from './layers/widgets.layer'

export const workspaceArchitectConfig = defineConfig({
  baseUrl: 'src',
  ignores: ['**/*.md', '**/*.css', '**/*.json', '**/*.html'],
  root: abstraction({
    name: 'src',
    children: {
      app: appLayer,
      pages: pagesLayer,
      widgets: widgetsLayer,
      features: featuresLayer,
      entities: entitiesLayer,
      core: coreLayer,
    },
    rules: [
      dependenciesDirection(
        ['app', 'pages', 'entities', 'widgets', 'features', 'core'],
        {
          allowDownward: ['**/app/router/**'],
        },
      ),
    ],
  }),
})
