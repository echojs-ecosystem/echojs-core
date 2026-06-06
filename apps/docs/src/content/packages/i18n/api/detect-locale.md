---
title: detectLocale
description: Resolve locale from localStorage and navigator rules.
package: "@echojs-ecosystem/i18n"
---

# detectLocale

```ts
function detectLocale(options): string
```

Standalone browser locale resolution — used internally by `createI18n` / provider when browser options are set.

## Options

| Field | Description |
| --- | --- |
| `supported` | Allowed locale ids |
| `fallback` | Fallback when no match |
| `storageKey` | Read persisted locale from `localStorage` |
| `navigatorRules` | `{ prefix, locale }[]` matched against `navigator.language` |

## Example

```ts
import { detectLocale } from "@echojs-ecosystem/i18n";

const locale = detectLocale({
  supported: ["en", "ru"],
  fallback: "en",
  storageKey: "app-locale",
  navigatorRules: [{ prefix: "ru", locale: "ru" }],
});
```

Priority: `localStorage[storageKey]` → `navigatorRules` → `fallback`.

## See also

- [Locales](/docs/packages/i18n/guides/locales)
