---
title: URL State
description: Typed search params with parsers and router integration.
package: "@echojs/url-state"
keywords: [createQueryParams, parseAsString, nuqs]
---

:::package-overview url-state

:::install @echojs/url-state

## Quick start

```ts
import { createQueryParams, parseAsInteger } from "@echojs/url-state";

const catalogParams = createQueryParams({
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(""),
});
```

> [!tip]
> Path segments and layouts stay in `@echojs/router`.
