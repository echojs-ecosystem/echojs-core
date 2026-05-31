import { describe, expect, it, vi } from 'vitest'

import { CancelledError } from '../core/cancelled-error'
import { createInfiniteQuery } from './create-infinite-query'
import { createTestClient, flush } from '../test-utils'

type FeedPage = {
  items: string[]
  nextCursor: string | null
  prevCursor: string | null
}

describe('createInfiniteQuery', () => {
  it('does not fetch immediately', () => {
    const fetcher = vi.fn(async () => ({
      items: [],
      nextCursor: null,
      prevCursor: null,
    }))
    const def = createInfiniteQuery<FeedPage, void, string | null>({
      queryKey: () => ['feed'],
      initialPageParam: null,
      queryFn: fetcher,
      getNextPageParam: (page) => page.nextCursor,
    })
    expect(fetcher).not.toHaveBeenCalled()
    void def
  })

  it('loads first page and fetchNextPage appends', async () => {
    const client = createTestClient()
    let call = 0

    const feedQuery = createInfiniteQuery<FeedPage, void, string | null>({
      queryKey: () => ['feed'],
      initialPageParam: null,
      queryFn: async ({ pageParam }) => {
        call += 1
        if (pageParam === null) {
          return { items: ['a'], nextCursor: 'c1', prevCursor: null }
        }
        return { items: ['b'], nextCursor: null, prevCursor: 'c1' }
      },
      getNextPageParam: (page) => page.nextCursor,
    })

    const feed = feedQuery.with(undefined as void, { client, refetchOnMount: false, enabled: false })
    await feed.fetchNextPage()

    expect(feed.pages()).toEqual([{ items: ['a'], nextCursor: 'c1', prevCursor: null }])
    expect(feed.pageParams()).toEqual([null])
    expect(feed.hasNextPage()).toBe(true)
    expect(feed.flatMap((p) => p.items)).toEqual(['a'])

    await feed.fetchNextPage()
    expect(feed.pages()).toHaveLength(2)
    expect(feed.flatMap((p) => p.items)).toEqual(['a', 'b'])
    expect(feed.hasNextPage()).toBe(false)
    expect(call).toBe(2)
  })

  it('fetchNextPage returns null when hasNextPage is false', async () => {
    const client = createTestClient()
    const feedQuery = createInfiniteQuery<FeedPage, void, string | null>({
      queryKey: () => ['feed-end'],
      initialPageParam: null,
      queryFn: async () => ({ items: ['x'], nextCursor: null, prevCursor: null }),
      getNextPageParam: (page) => page.nextCursor,
    })

    const feed = feedQuery.with(undefined as void, { client, refetchOnMount: false, enabled: false })
    await feed.fetchNextPage()
    const result = await feed.fetchNextPage()
    expect(result).toBeNull()
  })

  it('refetch reloads from initial page param', async () => {
    const client = createTestClient()
    let version = 1

    const feedQuery = createInfiniteQuery<FeedPage, void, string | null>({
      queryKey: () => ['feed-refetch'],
      initialPageParam: null,
      queryFn: async () => ({
        items: [`v${version}`],
        nextCursor: null,
        prevCursor: null,
      }),
      getNextPageParam: (page) => page.nextCursor,
    })

    const feed = feedQuery.with(undefined as void, { client, refetchOnMount: false, enabled: false })
    await feed.fetchNextPage()
    version = 2
    await feed.refetch()
    expect(feed.flatMap((p) => p.items)).toEqual(['v2'])
  })

  it('reset clears pages', async () => {
    const client = createTestClient()
    const feedQuery = createInfiniteQuery<FeedPage, void, string | null>({
      queryKey: () => ['feed-reset'],
      initialPageParam: null,
      queryFn: async () => ({ items: ['a'], nextCursor: null, prevCursor: null }),
      getNextPageParam: (page) => page.nextCursor,
    })

    const feed = feedQuery.with(undefined as void, { client, refetchOnMount: false, enabled: false })
    await feed.fetchNextPage()
    feed.reset()
    expect(feed.data()).toBeNull()
    expect(feed.pages()).toEqual([])
  })

  it('uses separate cache entries per params', async () => {
    const client = createTestClient()
    const feedQuery = createInfiniteQuery<FeedPage, { userId: string }, string | null>({
      queryKey: ({ userId }) => ['user-posts', userId],
      initialPageParam: null,
      queryFn: async ({ params }) => ({
        items: [params.userId],
        nextCursor: null,
        prevCursor: null,
      }),
      getNextPageParam: (page) => page.nextCursor,
    })

    const a = feedQuery.with({ userId: '1' }, { client, refetchOnMount: false })
    const b = feedQuery.with({ userId: '2' }, { client, refetchOnMount: false })
    await a.fetchNextPage()
    await b.fetchNextPage()
    expect(a.flatMap((p) => p.items)).toEqual(['1'])
    expect(b.flatMap((p) => p.items)).toEqual(['2'])
  })

  it('fetchPreviousPage prepends when getPreviousPageParam provided', async () => {
    const client = createTestClient()

    const feedQuery = createInfiniteQuery<FeedPage, void, string | null>({
      queryKey: () => ['feed-prev'],
      initialPageParam: 'mid',
      queryFn: async ({ pageParam }) => {
        if (pageParam === 'mid') {
          return { items: ['mid'], nextCursor: null, prevCursor: 'start' }
        }
        return { items: ['start'], nextCursor: 'mid', prevCursor: null }
      },
      getNextPageParam: (page) => page.nextCursor,
      getPreviousPageParam: (page) => page.prevCursor,
    })

    const feed = feedQuery.with(undefined as void, { client, refetchOnMount: false, enabled: false })
    await feed.fetchNextPage()
    expect(feed.hasPreviousPage()).toBe(true)
    await feed.fetchPreviousPage()
    expect(feed.pages()).toHaveLength(2)
    expect(feed.flatMap((p) => p.items)).toEqual(['start', 'mid'])
  })

  it('cancel aborts in-flight fetch', async () => {
    const client = createTestClient()
    let resolveFetch!: (value: FeedPage) => void

    const feedQuery = createInfiniteQuery<FeedPage, void, string | null>({
      queryKey: () => ['feed-cancel'],
      initialPageParam: null,
      queryFn: ({ signal }) =>
        new Promise<FeedPage>((resolve, reject) => {
          resolveFetch = resolve
          signal.addEventListener('abort', () => reject(new CancelledError()))
        }),
      getNextPageParam: (page) => page.nextCursor,
    })

    const feed = feedQuery.with(undefined as void, { client, refetchOnMount: false })
    const p = feed.fetchNextPage()
    feed.cancel()
    await expect(p).resolves.toBeNull()
    expect(feed.data()).toBeNull()
    resolveFetch!({ items: [], nextCursor: null, prevCursor: null })
  })

  it('ignores stale responses via requestId on param change', async () => {
    const client = createTestClient()
    const { signal: $userId } = await import('@echojs/reactivity')
    const userId = $userId('1')

    let resolveSlow!: (value: FeedPage) => void
    const feedQuery = createInfiniteQuery<FeedPage, { id: string }, string | null>({
      queryKey: ({ id }) => ['race', id],
      initialPageParam: null,
      queryFn: async ({ params }) => {
        if (params.id === '1') {
          return new Promise<FeedPage>((resolve) => {
            resolveSlow = resolve
          })
        }
        return { items: [params.id], nextCursor: null, prevCursor: null }
      },
      getNextPageParam: (page) => page.nextCursor,
    })

    const feed = feedQuery.with(() => ({ id: userId.value() }), { client, refetchOnMount: false })
    void feed.fetchNextPage()
    userId.set('2')
    await flush()
    await feed.fetchNextPage()
    expect(feed.flatMap((p) => p.items)).toEqual(['2'])

    resolveSlow!({ items: ['stale'], nextCursor: null, prevCursor: null })
    await flush()
    expect(feed.flatMap((p) => p.items)).toEqual(['2'])
  })
})
