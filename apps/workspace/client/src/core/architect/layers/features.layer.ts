import { abstraction, restrictCrossImports } from '@echojs-ecosystem/architect'

import { moduleLayer } from './module.layer'

/** `features/` layer — use-cases and screens. */
export const featuresLayer = abstraction({
  name: 'features',
  children: { '*': moduleLayer },
  rules: [restrictCrossImports()],
})
