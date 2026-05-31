import { createInfiniteQuery } from '../query/create-infinite-query'

const userPosts = createInfiniteQuery<
  { items: string[]; nextCursor: string | null },
  { userId: string },
  string | null
>({
  queryKey: ({ userId }) => ['user-posts', userId],
  initialPageParam: null,
  queryFn: async () => ({ items: [], nextCursor: null }),
  getNextPageParam: (page) => page.nextCursor,
})

const feed = createInfiniteQuery<
  { items: string[]; nextCursor: string | null },
  void,
  string | null
>({
  queryKey: () => ['feed'],
  initialPageParam: null,
  queryFn: async () => ({ items: [], nextCursor: null }),
  getNextPageParam: (page) => page.nextCursor,
})

// @ts-expect-error — missing required property userId
userPosts.with({})

// @ts-expect-error — void params must not be {}
feed.with({})
