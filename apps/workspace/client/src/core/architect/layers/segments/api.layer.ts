import { abstraction, noUnabstractionFiles, publicAbstraction } from '@echojs-ecosystem/architect'

const apiDomainLayer = (name: string) =>
  abstraction({
    name,
    children: {
      'index.ts': abstraction('public-api'),
      '*.query.ts': abstraction('query-module'),
      '*.mutation.ts': abstraction('mutation-module'),
      '*.ts': abstraction('api-module'),
    },
    rules: [noUnabstractionFiles()],
  })

/** `core/api/` — generated and hand-written API bindings. */
export const apiLayer = abstraction({
  name: 'api',
  children: {
    'index.ts': abstraction('public-api'),
    '*.ts': abstraction('api-root-module'),
    orders: apiDomainLayer('orders'),
    users: apiDomainLayer('users'),
    workspace: apiDomainLayer('workspace'),
  },
  rules: [publicAbstraction('public-api'), noUnabstractionFiles()],
})
