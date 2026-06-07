---
title: With i18n
description: createProvider factory with install, provideKey, and wrapRoot.
package: '@echojs-ecosystem/framework'
---

# With i18n

Custom provider using `createProvider` — typed install, auto-provide, and root
wrapper.

## Theme provider

```ts
import { createProvider } from '@echojs-ecosystem/framework/app'

const THEME_KEY = Symbol('theme')

export const themeProvider = createProvider({
  name: 'theme',
  install: () => ({ mode: 'light' as const }),
  provideKey: THEME_KEY,
  wrapRoot: (inner) => () => div({ class: 'theme-root' }, inner()),
})
```

## Full stack with i18n

```ts
import { createEchoApp } from '@echojs-ecosystem/framework/app'
import {
  i18nProvider,
  queryProvider,
  routerProvider,
  themeProvider,
  uiProvider,
} from './providers/index.js'

export const bootstrap = () =>
  createEchoApp({ strictContextChecks: true })
    .use(queryProvider)
    .use(uiProvider)
    .use(i18nProvider)
    .use(themeProvider)
    .use(routerProvider)
    .mount('#app')
```

Register i18n **before** router when route views read translated strings during
first navigation.

## Related

- [createProvider API](/docs/packages/framework/api/create-provider)
- [i18n Examples](/docs/packages/i18n/example)
