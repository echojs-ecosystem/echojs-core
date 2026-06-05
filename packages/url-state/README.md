<div align="center">

# @echojs-ecosystem/url-state

**Type-safe URL search params — nuqs-style, signal-native.**

[![npm](https://img.shields.io/npm/v/@echojs-ecosystem/url-state)](https://www.npmjs.com/package/@echojs-ecosystem/url-state)
[![docs](https://img.shields.io/badge/docs-echojs.dev-blue)](https://echojs.dev/docs/packages/url-state)

</div>

---

Manage **query string state** with typed parsers, defaults, and router integration. Built for EchoJS signals — no React hooks.

## Features

- **`createQueryParam`** — single typed param
- **`createQueryParams`** — object of params with batch updates
- **Rich parsers** — string, int, float, bool, literal, array, JSON + Standard Schema
- **Router adapter** — auto-sync with `@echojs-ecosystem/router/hyperdom`
- **History control** — `push` / `replace` per update
- **`urlKeys`** — remap param names in the URL

## Install

```bash
npm install @echojs-ecosystem/url-state @echojs-ecosystem/reactivity
```

## Quick start

```ts
import {
  createQueryParams,
  parseAsInteger,
  parseAsString,
  parseAsBoolean,
} from "@echojs-ecosystem/url-state";

const filters = createQueryParams({
  q: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  inStock: parseAsBoolean.withDefault(false),
});

filters.value(); // { q: "", page: 1, inStock: false }
filters.set({ q: "bike", page: 2 });
filters.update((v) => ({ ...v, page: v.page + 1 }));
filters.reset();
```

### With router

```ts
import { createRouter } from "@echojs-ecosystem/router/hyperdom";

export const appRouter = createRouter({ routes });

export const filters = appRouter.createQueryParams({
  q: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
});
```

## Parsers

| Parser | Example |
|--------|---------|
| `parseAsString` | `?q=hello` |
| `parseAsInteger` / `parseAsFloat` | `?page=2` |
| `parseAsBoolean` | `?open=true` |
| `parseAsLiteral(["a","b"])` | Enum values |
| `parseAsArrayOf` | `?tag=a&tag=b` |
| `parseAsJson(schema)` | Complex objects |

## Related packages

| Package | Role |
|---------|------|
| [`@echojs-ecosystem/router`](https://www.npmjs.com/package/@echojs-ecosystem/router) | SPA URL sync |
| [`@echojs-ecosystem/reactivity`](https://www.npmjs.com/package/@echojs-ecosystem/reactivity) | Signal-backed param state |

## Documentation

[echojs.dev/docs/packages/url-state](https://echojs.dev/docs/packages/url-state)
