import {
  abstraction,
  noUnabstractionFiles,
  publicAbstraction,
} from '@echojs-ecosystem/architect'

import { modelLayer } from './segments/model.layer'
import { typesLayer } from './segments/types.layer'
import { viewLayer } from './segments/view.layer'

/**
 * `features/*` / `widgets/*` module layer.
 * Public API: `index.ts`. Optional shared subviews/styles at slice root.
 */
export const moduleLayer = abstraction({
  name: 'module',
  children: {
    model: modelLayer,
    view: viewLayer,
    types: typesLayer,
    'index.ts': abstraction('public-api'),
    '*.view.ts': abstraction('shared-view'),
    '*.styles.ts': abstraction('slice-styles'),
  },
  rules: [publicAbstraction('public-api'), noUnabstractionFiles()],
})
