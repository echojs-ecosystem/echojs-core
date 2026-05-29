import { echoTsupConfig } from '@echojs/oxc-config/tsup'

export default echoTsupConfig({
  entry: {
    index: 'src/index.ts',
    'hyperdom/index': 'src/hyperdom/index.ts',
  },
})
