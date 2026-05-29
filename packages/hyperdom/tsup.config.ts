import { echoTsupConfig } from '@echojs/oxc-config/tsup'

export default echoTsupConfig({
  entry: {
    index: 'src/index.ts',
    'lifecycle/mount': 'src/lifecycle/mount.ts',
  },
})
