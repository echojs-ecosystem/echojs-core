import { abstraction, restrictCrossImports } from '@echojs-ecosystem/architect'

import { entityLayer } from './entity.layer'

/** `entities/` layer — shared domain. */
export const entitiesLayer = abstraction({
  name: 'entities',
  children: { '*': entityLayer },
})
