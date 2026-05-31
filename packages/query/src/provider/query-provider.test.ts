import { describe, expect, it } from 'vitest'

import { resetDefaultQueryClient } from '../client/default-client'
import { createInfiniteQuery } from '../query/create-infinite-query'
import { createQuery } from '../query/create-query'
import { resetQueryProvider } from './context'
import { createQueryProvider, QueryProvider, setQueryProvider } from './query-provider'

describe('QueryProvider', () => {
  it('merges defaultOptions into createQuery', async () => {
    resetQueryProvider()
    resetDefaultQueryClient()

    const provider = createQueryProvider({
      defaultOptions: {
        queries: { staleTime: 60_000 },
      },
    })

    let fetchCount = 0
    const query = provider.createQuery({
      queryKey: () => ['provider-defaults'],
      queryFn: async () => {
        fetchCount += 1
        return 'ok'
      },
    })

    await provider.client.fetchQuery(query)
    await provider.client.fetchQuery(query)
    expect(fetchCount).toBe(1)
  })

  it('transform runs after queryFn', async () => {
    const provider = createQueryProvider()

    const q = provider.createQuery({
      queryKey: () => ['transform'],
      queryFn: async () => ({ value: 1 }),
      transform: (data) => ({ value: data.value + 1 }),
    })

    const data = await provider.client.fetchQuery(q)
    expect(data).toEqual({ value: 2 })
  })

  it('setQueryProvider registers active provider', () => {
    const provider = createQueryProvider()
    setQueryProvider(provider)
    const q = provider.createQuery({
      queryKey: () => ['via-provider'],
      queryFn: async () => 'p',
    })
    expect(q.kind).toBe('query-definition')
  })

  it('merges default mutation options', async () => {
    const provider = createQueryProvider({
      defaultOptions: {
        mutations: {
          retry: false,
        },
      },
    })

    let attempts = 0
    const m = provider
      .createMutation<unknown, void>({
        mutationFn: async () => {
          attempts += 1
          throw new Error('fail')
        },
      })
      .create()

    await expect(m.run(undefined as void)).rejects.toThrow('fail')
    expect(attempts).toBe(1)
  })

  it('createInfiniteQuery returns infinite definition', () => {
    const provider = createQueryProvider()
    const def = provider.createInfiniteQuery({
      queryKey: () => ['provider-infinite'],
      initialPageParam: null,
      queryFn: async () => ({ items: [], next: null }),
      getNextPageParam: (page) => page.next,
    })
    expect(def.kind).toBe('infinite-query-definition')
  })

  it('QueryProvider client helpers delegate to QueryClient', async () => {
    const provider = new QueryProvider()
    const def = provider.createQuery({
      queryKey: () => ['provider-helpers'],
      queryFn: async () => 'ok',
    })

    await provider.client.fetchQuery(def, {})
    provider.invalidateQueries(['provider-helpers'])
    await provider.refetchQueries(['provider-helpers'])
    provider.cancelQueries(['provider-helpers'])
    provider.removeQueries(['provider-helpers'])

    expect(provider.client.queryCache.getByKey(['provider-helpers'])).toBeUndefined()
  })
})
