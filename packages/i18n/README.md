# @echojs/i18n

Signal-native интернационализация для EchoJS на базе [`@echojs/reactivity`](../reactivity) и стандартного **Intl API**.

Пакет **framework-agnostic**: без React, Vue, hooks и VDOM. Работает в browser, SSR и Node.js.

## Установка

```bash
bun add @echojs/i18n @echojs/reactivity
```

## Basic usage

```ts
import { createI18n } from "@echojs/i18n";

type Messages = {
  common: {
    save: string;
    cancel: string;
  };
};

const i18n = createI18n<"ru" | "en", Messages>({
  defaultLocale: "ru",
  fallbackLocale: "en",
  locales: {
    ru: {
      common: { save: "Сохранить", cancel: "Отмена" },
    },
    en: {
      common: { save: "Save", cancel: "Cancel" },
    },
  },
});

i18n.supportedLocales; // readonly ["ru", "en"]
i18n.locale(); // "ru"
i18n.$locale.value(); // "ru"
```

## Typed keys

Ключи перевода типизируются по схеме сообщений — поддерживается вложенность:

```ts
i18n.t("common.save"); // ok
// i18n.t("common.unknown"); // TS error
```

Тип `TranslationKey<TMessages>` строит union всех путей до строковых листьев и plural-объектов.

## Translation

```ts
i18n.t("common.save");
i18n.exists("common.save");
```

## Interpolation

```ts
i18n.t("greeting", { name: "Вова" }); // "Привет, {name}" → "Привет, Вова"
```

## Plural

```ts
i18n.t("items", { count: 5 });
```

## Formatting

```ts
i18n.number(123456.78);
i18n.currency(1000, "USD");
i18n.date(new Date(), { dateStyle: "medium" });
i18n.relativeTime(-1, "day");
```

## Locales (eager + lazy import)

Опция `locales` заменяет прежние `messages` + `loaders`:

- **объект** — локаль доступна сразу (eager);
- **функция** — lazy `import()` при `setLocale` / `loadLocale`.

```ts
import ru from "./locales/ru.json";

const i18n = createI18n<"ru" | "en", typeof ru>({
  defaultLocale: "ru",
  fallbackLocale: "en",
  locales: {
    ru,
    en: () => import("./locales/en.json"),
  },
});

await i18n.setLocale("en");
```

## Reactivity

`locale` хранится в signal. Вызов `i18n.t()` внутри `computed` / `effect` пересчитывается при смене локали.

## Public API

| Export | Описание |
|--------|----------|
| `createI18n` | Фабрика экземпляра i18n |
| `I18n` | Тип экземпляра |
| `CreateI18nOptions` | Опции фабрики |
| `TranslationKey` | Union вложенных ключей |
| `LocaleSource` | Объект или `() => import(...)` |
| `MessageSchema` | Схема дерева сообщений |

## License

MIT
