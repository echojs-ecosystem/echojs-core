---
title: History & Sync
description:
  push vs replace, defaultVisibility, debounce/throttle, and scroll options.
package: '@echojs-ecosystem/url-state'
---

# History & Sync

URL writes accept per-call and group-level options that control browser history,
visibility of defaults, and update rate.

## History behavior

| Option    | Values                  | Meaning                |
| --------- | ----------------------- | ---------------------- |
| `history` | `"push"` \| `"replace"` | History stack behavior |

```ts
page.set(2, { history: 'push' }) // user can Back to page 1
filters.set({ q: 'bike' }, { history: 'replace' }) // replace current entry
```

Typical convention: **`replace`** for filter typing, **`push`** for pagination
steps.

## Default visibility

| Option              | Values               | Meaning                                  |
| ------------------- | -------------------- | ---------------------------------------- |
| `defaultVisibility` | `"hide"` \| `"show"` | Omit defaults from URL vs show `?page=1` |

```ts
createQueryParams(schema, {
  defaultVisibility: 'show', // always write ?page=1 even when default
})
```

## Shallow and scroll

| Option    | Meaning                                                       |
| --------- | ------------------------------------------------------------- |
| `shallow` | Router shallow update when supported — skip full route reload |
| `scroll`  | Scroll after URL change                                       |

## Rate limiting

| Option            | Values                                    | Meaning           |
| ----------------- | ----------------------------------------- | ----------------- |
| `limitUrlUpdates` | `debounce(ms)` / `throttle(ms)` / `false` | Rate-limit writes |

```ts
import { debounce, createQueryParams } from '@echojs-ecosystem/url-state'

createQueryParams(schema, {
  limitUrlUpdates: debounce(500),
})
```

Useful for search inputs that would otherwise write the URL on every keystroke.

## Custom equality

Pass `equals` in set options when parsed objects need custom change detection
beyond parser `eq`.

## HyperDOM reads

```ts
const { q, page } = filters.value()

effect(() => {
  const { q } = filters.value()
  renderList(q)
})
```

Prefer `.value()` in models; reactive children track URL state automatically
when the adapter notifies.

## Related

- [createQueryParams](/docs/packages/url-state/guides/query-params)
- [Examples: Pagination](/docs/packages/url-state/examples/pagination)
- [Examples: Catalog Filters](/docs/packages/url-state/examples/catalog-filters)
