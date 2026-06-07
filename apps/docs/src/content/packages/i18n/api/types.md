---
title: Types
description: TranslationKey, locale inference, and message schema types.
package: '@echojs-ecosystem/i18n'
---

# Types

```ts
import type {
  TranslationKey,
  InferMessagesFromLocalesMap,
  InferLocaleFromLocalesMap,
  LocaleSource,
  MessageSchema,
  Messages,
  MissingKeyStrategy,
  EchoI18nProvider,
} from '@echojs-ecosystem/i18n'
```

| Type                             | Description                       |
| -------------------------------- | --------------------------------- |
| `TranslationKey<TMessages>`      | Union of nested key paths         |
| `InferMessagesFromLocalesMap<T>` | Message schema from eager locales |
| `InferLocaleFromLocalesMap<T>`   | `keyof locales`                   |
| `LocaleSource<T>`                | Object or lazy importer           |
| `MessageSchema` / `Messages`     | JSON tree shape                   |
| `MissingKeyStrategy`             | `"key"` \| `"empty"`              |
| `EchoI18nProvider`               | Provider return type              |

Enable `resolveJsonModule` and import at least one eager locale JSON file for
full key inference.

## See also

- [Messages & Keys](/docs/packages/i18n/guides/messages-and-keys)
