import {
  abstraction,
  noUnabstractionFiles,
  publicAbstraction,
} from '@echojs-ecosystem/architect'

import { entityModelLayer } from './segments/entity-model.layer'

/** `entities/*` — domain slice. */
export const entityLayer = abstraction({
  name: 'entity',
  children: {
    model: entityModelLayer,
    'index.ts': abstraction('public-api'),
  },
  rules: [publicAbstraction('public-api'), noUnabstractionFiles()],
})
