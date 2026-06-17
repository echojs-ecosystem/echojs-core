import { abstraction, noUnabstractionFiles } from '@echojs-ecosystem/architect'

/** Entity model folder: domain data, route queries, permission subjects. */
export const entityModelLayer = abstraction({
  name: 'model',
  children: {
    '*.query.ts': abstraction('route-query'),
    '*-permission-subject.ts': abstraction('permission-subject'),
    '*-store.ts': abstraction('store-module'),
    '*.ts': abstraction('entity-module'),
  },
  rules: [noUnabstractionFiles()],
})
