import { abstraction, restrictCrossImports } from '@echojs-ecosystem/architect'

import { pageLayer } from './page.layer'

/** `pages/` layer — routing surface. */
export const pagesLayer = abstraction({
  name: 'pages',
  children: { '*': pageLayer, '**/*': pageLayer },
  rules: [restrictCrossImports()],
})
