---
title: Interpolation & Plural
description: Message params and Intl.PluralRules buckets.
package: "@echojs-ecosystem/i18n"
---

# Interpolation & Plural

## Interpolation

```ts
i18n.t("common.save");
i18n.t("greeting", { name: "Vova" }); // "Hello, {name}"
```

Use params for dynamic segments — avoid string concatenation in views.

## Plural

Message value can be a plural bucket:

```json
{
  "items": {
    "one": "{count} item",
    "few": "{count} items",
    "many": "{count} items",
    "other": "{count} items"
  }
}
```

```ts
i18n.t("items", { count: 5 });
```

Uses `Intl.PluralRules` for the active locale.

## See also

- [Plural Messages example](/docs/packages/i18n/examples/plural-messages)
- [Messages & Keys](/docs/packages/i18n/guides/messages-and-keys)
