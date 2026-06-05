import { echoTsupConfig } from '@echojs-ecosystem/oxc-config/tsup'

export default echoTsupConfig({
  entry: {
    index: 'src/index.ts',
    'cli/index': 'src/cli/index.ts',
  },
  platform: 'node',
  banner: {
    js: '#!/usr/bin/env node',
  },
})
