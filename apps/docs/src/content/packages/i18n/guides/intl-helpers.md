---
title: Intl Helpers
description: number, currency, date, and relativeTime formatters.
package: '@echojs-ecosystem/i18n'
---

# Intl Helpers

Locale-aware formatting helpers — not stored in JSON message files.

```ts
i18n.number(123456.78)
i18n.currency(1000, 'USD')
i18n.date(new Date(), { dateStyle: 'medium' })
i18n.relativeTime(-1, 'day')
```

Formatters use the **active locale** from `$locale`. Re-read inside reactive
contexts when locale can change.

## HyperDOM usage

```ts
import { i18n } from '@core/providers/i18n.js'

const label = () => i18n.t('locale.en')

button({ onClick: () => void i18n.setLocale('ru') }, () =>
  i18n.t('shell.locale')
)
```

Docs locale dropdown: `widgets/locale-dropdown` → `setAppLocale(id)`.

## See also

- [createI18n API](/docs/packages/i18n/api/create-i18n)
- [Locale Switcher](/docs/packages/i18n/examples/locale-switcher)
