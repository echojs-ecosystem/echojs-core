import { echoTsupConfig } from '@echojs-ecosystem/oxc-config/tsup'

export default echoTsupConfig({
  entry: {
    index: 'src/index.ts',
  },
})
