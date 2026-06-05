---
title: URL State
description: Typed search params with parsers and router integration.
package: "@echojs-ecosystem/url-state"
keywords: [createQueryParams, parseAsString, nuqs]
---

:::package-overview url-state

:::install @echojs-ecosystem/url-state

## Quick start

```ts
import { createQueryParams, parseAsInteger } from "@echojs-ecosystem/url-state";

const catalogParams = createQueryParams({
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(""),
});
```

> [!tip]
> Path segments and layouts stay in `@echojs-ecosystem/router`.
