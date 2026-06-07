---
title: createQueryParams
description: createQueryParam and createQueryParams — typed reactive URL state.
package: '@echojs-ecosystem/url-state'
---

# createQueryParams

## createQueryParams

```ts
function createQueryParams<
  Schema extends Record<string, ParserWithDefault<unknown>>,
>(schema: Schema, options?: CreateQueryParamsOptions): QueryParamsState<Schema>
```

## createQueryParam

```ts
function createQueryParam<T>(
  name: string,
  parser: ParserWithDefault<T>,
  options?: QueryStateOptions
): QueryParamState<T>
```

## CreateQueryParamsOptions

| Field               | Description                   |
| ------------------- | ----------------------------- |
| `urlKeys`           | Map schema key → URL key name |
| `adapter`           | `UrlStateAdapter`             |
| `history`           | `"push"` \| `"replace"`       |
| `shallow`           | `boolean`                     |
| `scroll`            | `boolean`                     |
| `defaultVisibility` | `"hide"` \| `"show"`          |
| `limitUrlUpdates`   | debounce/throttle/false       |
| `equals`            | custom equality               |

## QueryParamState / QueryParamsState

| Member                 | Description             |
| ---------------------- | ----------------------- |
| `value()`              | Parsed value(s)         |
| `set(value, options?)` | Write URL               |
| `update(fn, options?)` | Functional update       |
| `reset(options?)`      | Defaults                |
| `clear(options?)`      | Remove from URL (group) |

## QueryStateSetOptions

Per-call overrides for `set` / `update` / `reset`: `adapter`, `history`,
`shallow`, `scroll`, `defaultVisibility`, `limitUrlUpdates`, `equals`.

## See also

- [Guides: createQueryParams](/docs/packages/url-state/guides/query-params)
- [Guides: History & Sync](/docs/packages/url-state/guides/history-and-sync)
