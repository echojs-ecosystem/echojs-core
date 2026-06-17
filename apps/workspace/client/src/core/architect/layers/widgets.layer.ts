import { abstraction, restrictCrossImports } from '@echojs-ecosystem/architect'

import { moduleLayer } from './module.layer'

/** `widgets/` layer — composite UI blocks. */
export const widgetsLayer = abstraction({
  name: 'widgets',
  children: { '*': moduleLayer },
  rules: [restrictCrossImports()],
})
