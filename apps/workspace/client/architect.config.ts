import {
  abstraction,
  defineConfig,
  dependenciesDirection,
  noUnabstractionFiles,
  publicAbstraction,
  restrictCrossImports,
} from '@echojs-ecosystem/architect'

const appLayer = abstraction({
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

const coreModule = (name: string) =>
  abstraction({
    name,
    children: {
      '*.ts': abstraction('module'),
      'index.ts': abstraction('public-api'),
    },
    rules: [publicAbstraction('public-api'), noUnabstractionFiles()],
  })

const coreLayer = abstraction({
  name: 'core',
  children: {
    http: coreModule('http'),
    i18n: coreModule('i18n'),
    theme: coreModule('theme'),
    query: coreModule('query'),
    ui: coreModule('ui'),
    permission: coreModule('permission'),
    styles: abstraction({
      name: 'styles',
      children: { '**/*': abstraction('style-module') },
    }),
  },
})

const pageSlice = abstraction({
  name: 'page',
  children: {
    '*.page.ts': abstraction('page'),
    '*.page.styles.ts': abstraction('page-styles'),
    '*.layout.ts': abstraction('layout'),
    '*.layout.styles.ts': abstraction('layout-styles'),
    'index.ts': abstraction('public-api'),
    ui: abstraction('ui'),
    model: abstraction('model'),
  },
  rules: [
    publicAbstraction('page'),
    publicAbstraction('public-api'),
    noUnabstractionFiles(),
  ],
})

const widgetSlice = abstraction({
  name: 'slice',
  children: {
    model: abstraction('model'),
    ui: abstraction('ui'),
    types: abstraction('types'),
    constants: abstraction('constants'),
    'index.ts': abstraction('public-api'),
    '*.ts': abstraction('module'),
    '*.styles.ts': abstraction('styles'),
  },
  rules: [publicAbstraction('public-api'), noUnabstractionFiles()],
})

const entitySlice = abstraction({
  name: 'slice',
  children: {
    api: abstraction('api'),
    model: abstraction('model'),
    ui: abstraction('ui'),
    types: abstraction('types'),
    constants: abstraction('constants'),
    'index.ts': abstraction('public-api'),
  },
  rules: [publicAbstraction('public-api'), noUnabstractionFiles()],
})

export default defineConfig({
  baseUrl: 'src',
  ignores: ['**/*.md', '**/*.css', '**/*.json', '**/*.html'],
  root: abstraction({
    name: 'src',
    children: {
      app: appLayer,
      pages: abstraction({
        name: 'pages',
        children: { '*': pageSlice, '**/*': pageSlice },
        rules: [restrictCrossImports()],
      }),
      widgets: abstraction({
        name: 'widgets',
        children: { '*': widgetSlice },
        rules: [restrictCrossImports()],
      }),
      features: abstraction({
        name: 'features',
        children: { '*': widgetSlice },
        rules: [restrictCrossImports()],
      }),
      entities: abstraction({
        name: 'entities',
        children: { '*': entitySlice },
      }),
      core: coreLayer,
    },
    rules: [
      dependenciesDirection(
        ['app', 'pages', 'entities', 'widgets', 'features', 'core'],
        {
          allowDownward: ['**/app/router/**'],
        },
      ),
    ],
  }),
})
