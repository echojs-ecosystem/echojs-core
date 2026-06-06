---
title: Plural Messages
description: Plural buckets with Intl.PluralRules.
package: "@echojs-ecosystem/i18n"
---

# Plural Messages

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
i18n.t("items", { count: 1 });  // "1 item"
i18n.t("items", { count: 5 });  // "5 items"
```

`Intl.PluralRules` selects the bucket for the active locale — rules differ between languages (e.g. Russian `few` / `many`).

## See also

- [Interpolation & Plural](/docs/packages/i18n/guides/interpolation-and-plural)
