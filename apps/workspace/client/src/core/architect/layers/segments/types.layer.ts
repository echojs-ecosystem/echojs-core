import { abstraction, noUnabstractionFiles } from '@echojs-ecosystem/architect'

/** `types/` — feature-local VM/props contracts. */
export const typesLayer = abstraction({
  name: 'types',
  children: {
    '*.types.ts': abstraction('types-module'),
  },
  rules: [noUnabstractionFiles()],
})
