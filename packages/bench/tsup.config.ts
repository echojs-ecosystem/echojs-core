import { echoTsupConfig } from '@echojs/oxc-config/tsup'

export default echoTsupConfig({
  entry: {
    index: 'src/index.ts',
    cli: 'src/cli.ts',
  },
  platform: 'node',
})
