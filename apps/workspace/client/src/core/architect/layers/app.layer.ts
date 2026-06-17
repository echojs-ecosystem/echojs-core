import { abstraction, noUnabstractionFiles } from '@echojs-ecosystem/architect'

export const appLayer = abstraction({
  name: 'app',
  children: {
    router: abstraction({
      name: 'router',
      children: {
        '*.ts': abstraction('routes-module'),
      },
      rules: [noUnabstractionFiles()],
    }),
    styles: abstraction('styles'),
    'main.ts': abstraction('entry'),
    'bootstrap.ts': abstraction('entry'),
    'router-provider.ts': abstraction('router-provider'),
  },
  rules: [noUnabstractionFiles()],
})
