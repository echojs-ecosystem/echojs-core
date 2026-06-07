---
title: createI18nProvider
description: Echo provider factory with i18n.start() setup.
package: '@echojs-ecosystem/i18n'
---

# createI18nProvider

```ts
function createI18nProvider(options): EchoI18nProvider
```

Echo app provider — exposes `name`, `i18n`, and `setup`.

## Return value

```ts
const provider = createI18nProvider({ ... });
provider.name;   // "i18n"
provider.i18n;   // I18n instance
provider.setup;  // () => i18n.start()
```

## Usage

```ts
export const i18nProvider = createI18nProvider({
  fallbackLocale: 'en',
  locales: { en, ru },
  storageKey: 'echojs-docs-locale',
  navigatorRules: [{ prefix: 'ru', locale: 'ru' }],
  documentTitleKey: 'shell.documentTitle',
})

createEchoApp().use(i18nProvider).mount('#app')
```

`setup` calls `i18n.start()` — browser detect, document sync, locale
persistence.

## See also

- [Locales guide](/docs/packages/i18n/guides/locales)
- [Docs Locales example](/docs/packages/i18n/examples/docs-locales)
