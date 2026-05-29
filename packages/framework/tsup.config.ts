import { echoTsupConfig } from '@echojs/oxc-config/tsup'

export default echoTsupConfig({
  entry: {
    index: 'src/index.ts',
    core: 'src/core.ts',
    reactivity: 'src/reactivity.ts',
    router: 'src/router.ts',
    'router-hyperdom': 'src/router-hyperdom.ts',
    form: 'src/form.ts',
    persist: 'src/persist.ts',
    store: 'src/store.ts',
    ui: 'src/ui.ts',
    hyperdom: 'src/hyperdom.ts',
    'url-state': 'src/url-state.ts',
  },
})
