import { abstraction, noUnabstractionFiles } from '@echojs-ecosystem/architect'

/** `view/` — presentation only: views, compound layouts, colocated styles. */
export const viewLayer = abstraction({
  name: 'view',
  children: {
    '*.view.ts': abstraction('view-module'),
    '*.compound.ts': abstraction('compound-view'),
    '*.styles.ts': abstraction('view-styles'),
  },
  rules: [noUnabstractionFiles()],
})
