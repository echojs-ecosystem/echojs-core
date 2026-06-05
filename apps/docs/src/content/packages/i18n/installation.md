---
title: Installation
description: Install @echojs-ecosystem/i18n and register createI18nProvider.
package: "@echojs-ecosystem/i18n"
---

# Installation

## Package managers

:::install @echojs-ecosystem/i18n

:::install @echojs-ecosystem/reactivity

## Locale files

Place JSON (or TS) message trees under `public/locales/` or `src/locales/`:

```
public/locales/
  en.json
  ru.json
```

Import eager locales in the provider module; lazy locales use dynamic `import()`.

## Provider (`apps/docs`)

```ts
import { createI18nProvider } from "@echojs-ecosystem/i18n";
import en from "../../../public/locales/en.json";
import ru from "../../../public/locales/ru.json";

export const i18nProvider = createI18nProvider({
  fallbackLocale: "en",
  locales: { en, ru },
  storageKey: "echojs-docs-locale",
  navigatorRules: [{ prefix: "ru", locale: "ru" }],
  documentTitleKey: "shell.documentTitle",
});

export const i18n = i18nProvider.i18n;
```

```ts
createEchoApp({ strictContextChecks: true })
  .use(i18nProvider)
  // ...
  .mount("#app");
```

## Monorepo

```json
{
  "dependencies": {
    "@echojs-ecosystem/i18n": "workspace:*",
    "@echojs-ecosystem/reactivity": "workspace:*"
  }
}
```

## TypeScript

Enable `resolveJsonModule` so `import en from "./en.json"` types the message tree for `TranslationKey`.
