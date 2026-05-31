import { describe, expect, it, vi } from 'vitest'

import { createInfiniteQuery } from '../query/create-infinite-query'
import { createTestClient, flush } from '../test-utils'

type FeedPage = { items: string[]; next: string | null }

describe('InfiniteQueryCache', () => {
  it('build returns same query for same key', async () => {
    const client = createTestClient()
    const def = createInfiniteQuery<FeedPage, void, string | null>({
      queryKey: () => ['inf-dup'],
      initialPageParam: null,
      queryFn: async () => ({ items: ['a'], next: null }),
      getNextPageParam: (page) => page.next,
    })

    const instance = def.with(undefined as void, { client, enabled: false, refetchOnMount: false })
    await instance.fetchNextPage()

    const cached = client.infiniteQueryCache.getByKey(['inf-dup'])
    expect(cached).toBeDefined()
    expect(client.infiniteQueryCache.get(cached!.queryHash)).toBe(cached)
  })

  it('findAll, remove and clear', async () => {
    const client = createTestClient()
    const def = createInfiniteQuery<FeedPage, void, string | null>({
      queryKey: () => ['inf-rm'],
      initialPageParam: null,
      queryFn: async () => ({ items: ['a'], next: null }),
      getNextPageParam: (page) => page.next,
    })

    await def.with(undefined as void, { client, enabled: false, refetchOnMount: false }).fetchNextPage()
    const query = client.infiniteQueryCache.getByKey(['inf-rm'])!
    const events: string[] = []
    client.infiniteQueryCache.subscribe((event) => events.push(event.type))

    client.infiniteQueryCache.remove(query)
    expect(client.infiniteQueryCache.getByKey(['inf-rm'])).toBeUndefined()
    expect(events).toContain('infiniteQueryRemoved')

    await def.with(undefined as void, { client, enabled: false, refetchOnMount: false }).fetchNextPage()
    client.infiniteQueryCache.clear()
    expect(client.infiniteQueryCache.getAll()).toHaveLength(0)
  })

  it('findAll with empty array returns all cached queries', async () => {
    const client = createTestClient()
    const def = createInfiniteQuery<FeedPage, void, string | null>({
      queryKey: () => ['inf-all'],
      initialPageParam: null,
      queryFn: async () => ({ items: ['a'], next: null }),
      getNextPageParam: (page) => page.next,
    })

    await def.with(undefined as void, { client, enabled: false, refetchOnMount: false }).fetchNextPage()
    expect(client.infiniteQueryCache.findAll([])).toHaveLength(1)
    expect(client.infiniteQueryCache.findAll(['inf-all'])).toHaveLength(1)
  })

  it('find with object filter exact', async () => {
    const client = createTestClient()
    const def = createInfiniteQuery<FeedPage, void, string | null>({
      queryKey: () => ['inf-find'],
      initialPageParam: null,
      queryFn: async () => ({ items: ['a'], next: null }),
      getNextPageParam: (page) => page.next,
    })

    await def.with(undefined as void, { client, enabled: false, refetchOnMount: false }).fetchNextPage()
    const found = client.infiniteQueryCache.find({ queryKey: ['inf-find'], exact: true })
    expect(found?.queryKey).toEqual(['inf-find'])
  })

  it('onFocus and onOnline delegate to queries', async () => {
    const client = createTestClient()
    const def = createInfiniteQuery<FeedPage, void, string | null>({
      queryKey: () => ['inf-focus'],
      initialPageParam: null,
      queryFn: async () => ({ items: ['a'], next: null }),
      getNextPageParam: (page) => page.next,
      staleTime: 0,
    })

    const instance = def.with(undefined as void, {
      client,
      enabled: false,
      refetchOnMount: false,
      refetchOnWindowFocus: true,
    })
    await instance.fetchNextPage()
    await flush()

    const query = client.infiniteQueryCache.getByKey(['inf-focus'])!
    const focusSpy = vi.spyOn(query, 'onFocus')
    const onlineSpy = vi.spyOn(query, 'onOnline')

    client.infiniteQueryCache.onFocus()
    client.infiniteQueryCache.onOnline()

    expect(focusSpy).toHaveBeenCalled()
    expect(onlineSpy).toHaveBeenCalled()
  })
})
