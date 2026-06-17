import { resolve } from 'node:path'

import { defineConfig } from 'vitest/config'

import { echoVitestConfig } from '../../../packages/.configs/vitest.config'

export default defineConfig(
  echoVitestConfig(__dirname, {
    resolve: {
      alias: {
        '@echojs-ecosystem/workspace-shared': resolve(__dirname, '../shared/src/index.ts'),
      },
    },
    test: {
      environment: 'node',
    },
  }),
)
