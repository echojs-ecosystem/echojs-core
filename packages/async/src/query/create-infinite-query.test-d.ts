import { describe, expectTypeOf, it } from 'vitest'

import { createInfiniteQuery } from './create-infinite-query'
import type {
  InfiniteQueryData,
  InfiniteQueryDefinition,
  InfiniteQueryFnContext,
  InfiniteQueryInstance,
} from '../types'

type FeedPage = { items: string[]; nextCursor: string | null }

describe('createInfiniteQuery typing', () => {
  it('infers page and pageParam types', () => {
    const def = createInfiniteQuery<FeedPage, { userId: string }, string | null>({
      queryKey: ({ userId }) => ['user-posts', userId],
      initialPageParam: null,
      queryFn: async (ctx) => {
        expectTypeOf(ctx).toEqualTypeOf<
          InfiniteQueryFnContext<{ userId: string }, string | null, FeedPage, unknown>
        >()
        expectTypeOf(ctx.pageParam).toEqualTypeOf<string | null>()
        expectTypeOf(ctx.params.userId).toBeString()
        return { items: [], nextCursor: null }
      },
      getNextPageParam: (page) => page.nextCursor,
    })

    expectTypeOf(def).toMatchTypeOf<
      InfiniteQueryDefinition<FeedPage, { userId: string }, string | null, unknown>
    >()
  })

  it('instance API types', () => {
    type Inst = InfiniteQueryInstance<FeedPage, string | null, { userId: string }, Error>

    expectTypeOf<Inst['pages']>().returns.toEqualTypeOf<FeedPage[]>()
    expectTypeOf<Inst['pageParams']>().returns.toEqualTypeOf<(string | null)[]>()
    expectTypeOf<Inst['data']>().returns.toEqualTypeOf<
      InfiniteQueryData<FeedPage, string | null> | null
    >()
    expectTypeOf<Inst['flatMap']>().toBeCallableWith((page: FeedPage) => page.items)
    expectTypeOf<Inst['fetchNextPage']>().returns.toEqualTypeOf<Promise<FeedPage | null>>()
    expectTypeOf<Inst['refetch']>().returns.toEqualTypeOf<
      Promise<InfiniteQueryData<FeedPage, string | null>>
    >()
  })

  it('with requires params shape', () => {
    const def = createInfiniteQuery<string, { id: string }, number>({
      queryKey: ({ id }) => ['x', id],
      initialPageParam: 0,
      queryFn: async () => 'page',
      getNextPageParam: () => undefined,
    })

    expectTypeOf(def.with).toBeCallableWith({ id: '1' })
    expectTypeOf(def.with).returns.toMatchTypeOf<
      InfiniteQueryInstance<string, number, { id: string }, unknown>
    >()
  })
})
