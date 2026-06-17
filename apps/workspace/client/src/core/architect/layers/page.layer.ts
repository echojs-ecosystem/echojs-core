import {
  abstraction,
  noUnabstractionFiles,
  publicAbstraction,
} from '@echojs-ecosystem/architect'

import { modelLayer } from './segments/model.layer'
import { viewLayer } from './segments/view.layer'

/** `pages/*` — route entries; may include local view/model when needed. */
export const pageLayer = abstraction({
  name: 'page',
  children: {
    '*.page.ts': abstraction('page'),
    '*.page.styles.ts': abstraction('page-styles'),
    '*.layout.ts': abstraction('layout'),
    '*.layout.styles.ts': abstraction('layout-styles'),
    'index.ts': abstraction('public-api'),
    model: modelLayer,
    view: viewLayer,
  },
  rules: [
    publicAbstraction('page'),
    publicAbstraction('public-api'),
    noUnabstractionFiles(),
  ],
})
