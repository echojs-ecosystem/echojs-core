import { defineConfig } from 'vitest/config'

import { echoVitestConfig } from '../.configs/vitest.config'

export default defineConfig(
  echoVitestConfig(__dirname, {
    test: {
      environment: 'node',
      include: ['packages/**/*.test.ts', 'stacks/**/*.test.ts'],
      environmentMatchGlobs: [
        ['packages/async/with-network.http-query.test.ts', 'node'],
        ['packages/network/with-async.http-query.test.ts', 'node'],
        ['packages/**/*.test.ts', 'jsdom'],
        ['stacks/**/*.test.ts', 'jsdom'],
      ],
    },
  }),
)
