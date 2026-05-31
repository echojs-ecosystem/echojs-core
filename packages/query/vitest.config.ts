import { defineConfig } from 'vitest/config'

import { echoVitestConfig } from '../.configs/vitest.config'

export default defineConfig(
  echoVitestConfig(__dirname, {
    test: {
      environment: 'node',
      include: ['src/**/*.test.ts', 'src/**/*.test-d.ts', 'src/**/*.test-d.tsx'],
      exclude: ['**/*.errors.test-d.ts', 'src/typetests/**'],
      typecheck: {
        enabled: true,
        include: ['src/**/*.test-d.ts', 'src/**/*.test-d.tsx'],
        tsconfig: './tsconfig.json',
      },
    },
  }),
)
