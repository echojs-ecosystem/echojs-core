import { defineConfig } from 'vitest/config'

import { echoVitestConfig } from '../.configs/vitest.config'

export default defineConfig(
  echoVitestConfig(__dirname, {
    test: {
      environment: 'node',
      include: ['__tests__/**/*.test.ts'],
      environmentMatchGlobs: [
        ['tests/browser-*.test.ts', 'jsdom'],
        ['__tests__/browser-adapter.test.ts', 'jsdom'],
      ],
    },
  })
)
