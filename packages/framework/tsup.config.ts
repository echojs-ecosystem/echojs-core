import { echoTsupConfig } from '@echojs-ecosystem/oxc-config/tsup'

const uiSubpaths = [
  'button',
  'icon-button',
  'input',
  'input-mask',
  'input-otp',
  'input-tags',
  'textarea',
  'label',
  'field',
  'checkbox',
  'provider',
  'theme',
  'core',
  'utils',
  'primitives',
] as const

const uiEntries = Object.fromEntries(
  uiSubpaths.map((sub) => [`ui/${sub}`, `src/ui/${sub}.ts`]),
)

export default echoTsupConfig({
  entry: {
    index: 'src/index.ts',
    core: 'src/core.ts',
    reactivity: 'src/reactivity.ts',
    router: 'src/router.ts',
    form: 'src/form.ts',
    persist: 'src/persist.ts',
    store: 'src/store.ts',
    async: 'src/async.ts',
    i18n: 'src/i18n.ts',
    devtools: 'src/devtools.ts',
    ui: 'src/ui.ts',
    hyperdom: 'src/hyperdom.ts',
    'hyperdom-lifecycle-mount': 'src/hyperdom-lifecycle-mount.ts',
    'url-state': 'src/url-state.ts',
    'network/http': 'src/network/http.ts',
    'network/ws': 'src/network/ws.ts',
    'network/mock': 'src/network/mock.ts',
    'network/graphql': 'src/network/graphql.ts',
    app: 'src/app/index.ts',
    ...uiEntries,
  },
})
