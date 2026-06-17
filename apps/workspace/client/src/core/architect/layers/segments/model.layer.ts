import { abstraction, noUnabstractionFiles } from '@echojs-ecosystem/architect'

/** `model/helpers/` — one pure helper per file + colocated tests. */
export const helpersLayer = abstraction({
  name: 'helpers',
  children: {
    '*.test.ts': abstraction('helper-test'),
    '*.ts': abstraction('helper'),
  },
  rules: [noUnabstractionFiles()],
})

/** `model/` — state, forms, validation, query state. */
export const modelLayer = abstraction({
  name: 'model',
  children: {
    '*.model.ts': abstraction('model-module'),
    '*.form.ts': abstraction('form-module'),
    '*.validation.ts': abstraction('validation-module'),
    '*.constants.ts': abstraction('constants-module'),
    '*.query-params.ts': abstraction('query-params-module'),
    '*-filters.ts': abstraction('query-filters-module'),
    helpers: helpersLayer,
  },
  rules: [noUnabstractionFiles()],
})
