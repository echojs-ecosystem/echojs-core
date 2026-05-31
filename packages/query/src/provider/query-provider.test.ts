import { describe, expect, it } from 'vitest'

import { resetDefaultQueryClient } from '../client/default-client'
import { resetQueryProvider } from './context'
import { createQueryProvider, setQueryProvider } from './query-provider'

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
})
