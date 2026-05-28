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

`createRouter` from `@echojs/router/hyperdom` регистрирует router для url-state и добавляет `router.createQueryParams`.

```ts
import { createRouter } from "@echojs/router/hyperdom";
import { createQueryParams, parseAsInteger, parseAsString } from "@echojs/url-state";

export const appRouter = createRouter({ routes });

// Вариант 1: на роутере (adapter подставляется автоматически)
export const filters = appRouter.createQueryParams({
  q: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
});

// Вариант 2: в модуле страницы без импорта appRouter (нет цикла с routes)
export const filters = createQueryParams({
  q: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
});
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

## defaultVisibility

Одна настройка на всю группу query params:

```ts
const filters = createQueryParams(
  { page: parseAsInteger.withDefault(1) },
  { defaultVisibility: "hide" }, // default не попадают в URL
);

const verbose = createQueryParams(
  { page: parseAsInteger.withDefault(1) },
  { defaultVisibility: "show" }, // ?page=1
);
```

`clearOnDefault: true | false` по-прежнему работает (`true` → hide, `false` → show).

## Parsers

- `parseAsString`
- `parseAsInteger`
- `parseAsFloat`
- `parseAsBoolean`
- `parseAsLiteral` / `parseAsStringLiteral` / `parseAsNumberLiteral`
- `parseAsArrayOf` — массив (повтор ключей или separator в одном ключе)
- `parseAsNativeArrayOf` — только нативный формат `?tag=a&tag=b` ([nuqs](https://nuqs.dev/docs/parsers/built-in#native-arrays))
- `parseAsJson` — JSON + optional Standard Schema ([nuqs](https://nuqs.dev/docs/parsers/built-in#json))
- `parseAsIsoDate`
- `parseAsTimestamp`

### Custom parsers

```ts
import { createCustomParser, createCustomMultiParser } from "@echojs/url-state";

const parseAsStars = createCustomParser({
  parse: (value) => { /* string | string[] | null */ },
  serialize: (value) => "★★★",
  eq: (a, b) => a === b, // для defaultVisibility: "hide"
});

const parseAsIds = createCustomMultiParser({
  parse: (values) => values.map(Number),
  serialize: (ids) => ids.map(String),
});
```

См. [custom parsers в nuqs](https://nuqs.dev/docs/parsers/making-your-own).

### parseAsJson + Zod

```ts
import { z } from "zod";
import { parseAsJson } from "@echojs/url-state";

const schema = z.object({ pkg: z.string(), version: z.number() });
const json = parseAsJson(schema);
```

## Adapters

### Browser adapter

```ts
import { createBrowserUrlStateAdapter, createQueryParam, parseAsString } from "@echojs/url-state";

const q = createQueryParam("q", parseAsString.withDefault(""), {
  adapter: createBrowserUrlStateAdapter(),
});
```

### Memory adapter (tests)

```ts
import { createMemoryUrlStateAdapter, createQueryParams, parseAsString } from "@echojs/url-state";

const adapter = createMemoryUrlStateAdapter("?q=hello");
const state = createQueryParams({ q: parseAsString.withDefault("") }, { adapter });
```
