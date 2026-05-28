# @echojs/url-state

`@echojs/url-state` — **type-safe state manager для URL search params** в стиле EchoJS.

По идее он похож на `nuqs` (query params как state), но сделан для EchoJS:

- без React hooks
- без React/Vue/Solid
- на signals
- с adapter-архитектурой (browser/router/memory)
- с type-safe парсерами, default values и контролем history push/replace

## Basic query param

```ts
import { createQueryParam, parseAsInteger } from "@echojs/url-state";

const page = createQueryParam("page", parseAsInteger.withDefault(1));

page.value(); // 1
page.set(2); // ?page=2
page.update((p) => p + 1); // ?page=3
page.reset(); // back to default
```

## Query params group

```ts
import { createQueryParams, parseAsBoolean, parseAsInteger, parseAsLiteral, parseAsString } from "@echojs/url-state";

const filters = createQueryParams({
  q: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  inStock: parseAsBoolean.withDefault(false),
  view: parseAsLiteral(["grid", "list"] as const).withDefault("grid"),
});

filters.value();
// { q: "", page: 1, inStock: false, view: "grid" }

filters.set({ q: "bike", page: 2 });
filters.update((v) => ({ ...v, page: v.page + 1 }));
filters.reset();
filters.clear();
```

## Router integration

```ts
import { createQueryParams, createRouterUrlStateAdapter, parseAsInteger, parseAsString } from "@echojs/url-state";
import { appRouter } from "./router";

const filters = createQueryParams(
  {
    q: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(1),
  },
  {
    adapter: createRouterUrlStateAdapter(appRouter),
  },
);
```

## urlKeys (remapping)

```ts
import { createQueryParams, parseAsFloat } from "@echojs/url-state";

const coordinates = createQueryParams(
  {
    latitude: parseAsFloat.withDefault(45.18),
    longitude: parseAsFloat.withDefault(5.72),
  },
  {
    urlKeys: {
      latitude: "lat",
      longitude: "lng",
    },
  },
);
```

## History

```ts
import { createQueryParam, parseAsInteger } from "@echojs/url-state";

const page = createQueryParam("page", parseAsInteger.withDefault(1));
page.set(2, { history: "push" });
```

## clearOnDefault

```ts
import { createQueryParam, parseAsInteger } from "@echojs/url-state";

const page = createQueryParam("page", parseAsInteger.withDefault(1), {
  clearOnDefault: true,
});

page.set(1); // URL stays clean (no ?page=1)
```

## Parsers

- `parseAsString`
- `parseAsInteger`
- `parseAsFloat`
- `parseAsBoolean`
- `parseAsLiteral` / `parseAsStringLiteral` / `parseAsNumberLiteral`
- `parseAsArrayOf`
- `parseAsJson`
- `parseAsIsoDate`
- `parseAsTimestamp`

## Adapters

### Browser adapter

```ts
import { createBrowserUrlStateAdapter, createQueryParam, parseAsString } from "@echojs/url-state";

const q = createQueryParam("q", parseAsString.withDefault(""), {
  adapter: createBrowserUrlStateAdapter(),
});
```

### Memory adapter (tests/SSR)

```ts
import { createMemoryUrlStateAdapter, createQueryParam, parseAsInteger } from "@echojs/url-state";

const adapter = createMemoryUrlStateAdapter("?page=1");
const page = createQueryParam("page", parseAsInteger.withDefault(1), { adapter });
```

## Limitations (v1)

- нет server cache как в `nuqs`
- нет framework-specific adapters кроме EchoJS router/browser/memory
- `shallow` имеет смысл только на уровне adapter (core просто прокидывает опцию)
- нет type inference из URL string
- query state не предназначен для больших данных (URL — это small state)

