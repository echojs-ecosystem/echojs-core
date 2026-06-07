---
title: Locale Switcher
description: HyperDOM locale dropdown from apps/docs.
package: '@echojs-ecosystem/i18n'
---

# Locale Switcher

## HyperDOM view

```ts
import { i18n, setAppLocale } from '@core/providers/i18n.js'

button({ onClick: () => void setAppLocale('ru') }, () => i18n.t('locale.ru'))
span(null, () => i18n.t('shell.documentTitle'))
```

## Locale dropdown model

```ts
import { i18n, setAppLocale, type AppLocale } from '@core/providers/i18n.js'

export const createLocaleDropdownModel = createModel(
  () => ({
    locale: () => i18n.locale(),
    options: () =>
      i18n.supportedLocales.map((id) => ({
        id,
        label: i18n.t(`locale.${id}` as const),
      })),
    onSelect: (id: string) => void setAppLocale(id as AppLocale),
  }),
  'LocaleDropdownModel'
)
```

## Live references

| Resource | Path                                     |
| -------- | ---------------------------------------- |
| Widget   | `apps/docs/src/widgets/locale-dropdown/` |
| Provider | `apps/docs/src/core/providers/i18n.ts`   |

## See also

- [Locales](/docs/packages/i18n/guides/locales)
