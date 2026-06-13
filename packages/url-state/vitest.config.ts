import { defineConfig } from 'vitest/config'

import { echoVitestConfig } from '../.configs/vitest.config'

export default defineConfig(
  echoVitestConfig(__dirname, {
    test: {
      environment: 'node',
      include: ['src/**/*.test.ts', 'src/**/*.integration.test.ts'],
      environmentMatchGlobs: [
        ['src/adapters/browser-adapter.test.ts', 'jsdom'],
        ['src/**/*.integration.test.ts', 'jsdom'],
      ],
    },
  })
)
