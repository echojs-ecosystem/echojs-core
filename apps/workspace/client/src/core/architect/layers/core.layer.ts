import { abstraction, noUnabstractionFiles, publicAbstraction } from '@echojs-ecosystem/architect'

import { apiLayer } from './segments/api.layer'

const coreModuleLayer = (name: string) =>
  abstraction({
    name,
    children: {
      '*.ts': abstraction('module'),
      'index.ts': abstraction('public-api'),
    },
    rules: [publicAbstraction('public-api'), noUnabstractionFiles()],
  })

/** `core/architect/` — FSD lint rules for this app. */
const architectModuleLayer = abstraction({
  name: 'architect',
  children: {
    'config.ts': abstraction('config'),
    'index.ts': abstraction('public-api'),
    layers: abstraction({
      name: 'layers',
      children: {
        '**/*.ts': abstraction('layer-definition'),
      },
      rules: [noUnabstractionFiles()],
    }),
  },
  rules: [publicAbstraction('public-api'), noUnabstractionFiles()],
})

/** `core/` layer — app-wide infrastructure. */
export const coreLayer = abstraction({
  name: 'core',
  children: {
    architect: architectModuleLayer,
    api: apiLayer,
    async: coreModuleLayer('async'),
    'http-client': coreModuleLayer('http-client'),
    i18n: coreModuleLayer('i18n'),
    theme: coreModuleLayer('theme'),
    ui: coreModuleLayer('ui'),
    permission: coreModuleLayer('permission'),
    styles: abstraction({
      name: 'styles',
      children: { '**/*': abstraction('style-module') },
    }),
  },
})
