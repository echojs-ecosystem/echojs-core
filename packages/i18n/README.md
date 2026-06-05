<div align="center">

# @echojs-ecosystem/i18n

**Signal-native internationalization with typed message keys and Intl helpers.**

[![npm](https://img.shields.io/npm/v/@echojs-ecosystem/i18n)](https://www.npmjs.com/package/@echojs-ecosystem/i18n)
[![docs](https://img.shields.io/badge/docs-echojs.dev-blue)](https://echojs.dev/docs/packages/i18n)

</div>

---

Lightweight i18n for EchoJS. **Locale is a signal** — `t()` inside `computed` / `effect` re-runs when the locale changes. Works in browser, SSR, and Node.js.

## Features

- **Typed keys** — `TranslationKey` inferred from your JSON locale files
- **Eager + lazy locales** — inline object or dynamic `import()`
- **Interpolation & plural** — `{name}`, `{count}` in messages
- **Intl helpers** — `number`, `currency`, `date`, `relativeTime`
- **Framework-agnostic** — no hooks, no VDOM

## Install

```bash
npm install @echojs-ecosystem/i18n @echojs-ecosystem/reactivity
```

## Quick start

```ts
import { createI18n } from "@echojs-ecosystem/i18n";
import ru from "./locales/ru.json";

const i18n = createI18n({
  defaultLocale: "ru",
  fallbackLocale: "en",
  locales: {
    ru,
    en: () => import("./locales/en.json"),
  },
});

i18n.t("common.save"); // typed key
i18n.t("greeting", { name: "Vova" });
i18n.t("items", { count: 5 }); // plural

await i18n.setLocale("en");
i18n.$locale.value(); // reactive
```

## API

| Export | Description |
|--------|-------------|
| `createI18n` | Factory |
| `i18n.t(key, params?)` | Translate |
| `i18n.setLocale` / `i18n.loadLocale` | Switch & lazy-load |
| `i18n.number` / `currency` / `date` / `relativeTime` | Intl formatting |
| `TranslationKey` | Type helper for nested keys |

## Provider (apps)

Use `createI18nProvider` with [`@echojs-ecosystem/framework`](https://www.npmjs.com/package/@echojs-ecosystem/framework) to inject `i18n` into views.

## Documentation

[echojs.dev/docs/packages/i18n](https://echojs.dev/docs/packages/i18n)
