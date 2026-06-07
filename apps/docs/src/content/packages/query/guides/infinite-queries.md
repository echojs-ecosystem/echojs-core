---
title: Infinite Queries
description:
  createInfiniteQuery — paginated data, fetchNextPage, and flatMap helpers.
package: '@echojs-ecosystem/query'
---

# Infinite Queries

**Infinite queries** load data in pages — ideal for feeds, tables with "load
more", and cursor-based APIs.

## Definition

```ts
import { createInfiniteQuery } from '@echojs-ecosystem/query'

type PostsPage = { posts: Post[]; nextOffset: number | null }

export const userPostsInfinite = createInfiniteQuery<
  PostsPage,
  { userId: number },
  number
>({
  name: 'user-posts-infinite',
  queryKey: ({ userId }) => ['posts', userId] as const,
  initialPageParam: 0,
  queryFn: async ({ params, pageParam, signal }) => {
    /* fetch page */
  },
  getNextPageParam: (page) => page.nextOffset,
})
```

## Options beyond standard queries

| Field                  | Description                                         |
| ---------------------- | --------------------------------------------------- |
| `initialPageParam`     | First page cursor                                   |
| `getNextPageParam`     | `(lastPage, allPages) => next \| null \| undefined` |
| `getPreviousPageParam` | Optional backward pagination                        |

## Binding and reading

```ts
const posts = userPostsInfinite.with(() => ({ userId: $userId.value() }))

posts.pages()
posts.pageParams()
posts.flatMap((page) => page.posts)
posts.hasNextPage()
posts.fetchingNextPage()
```

## Pagination actions

```ts
await posts.fetchNextPage()
await posts.fetchPreviousPage() // when getPreviousPageParam is set
await posts.refetch()
posts.reset()
```

## Instance signals

`$data`, `$pages`, `$pageParams`, `$pending`, `$fetching`, and
pagination-specific helpers like `hasInfiniteNextPage`.

## Related

- [Reactive Binding](/docs/packages/query/guides/reactive-binding)
- [API: createInfiniteQuery](/docs/packages/query/api/create-infinite-query)
