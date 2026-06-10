import { describe, expect, it, vi } from 'vitest'

import { createTestClient, deferred, flush } from '../test-utils'
import { createQuery } from '../query/create-query'

describe('Query', () => {
  it('setData updates cache without fetch', async () => {
    const client = createTestClient()
    const def = createQuery({
      queryKey: () => ['set-data'],
      queryFn: async () => 'from-network',
    })
    await client.fetchQuery(def, {})
    const query = client.queryCache.getByKey(['set-data'])!
    query.setData('manual')
    expect(client.getQueryData(['set-data'])).toBe('manual')
  })

  it('invalidate marks stale and emits', async () => {
    const client = createTestClient()
    const events: string[] = []
    client.queryCache.subscribe((e) => events.push(e.type))
    const def = createQuery({
      queryKey: () => ['inv'],
      queryFn: async () => 1,
      staleTime: Infinity,
    })
    await client.fetchQuery(def, {})
    const query = client.queryCache.getByKey(['inv'])!
    query.invalidate()
    expect(query.state.isInvalidated).toBe(true)
    expect(events).toContain('queryInvalidated')
  })

  it('transform runs on fetch', async () => {
    const client = createTestClient()
    const def = createQuery({
      queryKey: () => ['transform'],
      queryFn: async () => ({ n: 1 }),
      transform: (d) => ({ n: d.n + 1 }),
    })
    const data = await client.fetchQuery(def, {})
    expect(data).toEqual({ n: 2 })
  })

  it('lifecycle hooks fire', async () => {
    const client = createTestClient()
    const onStart = vi.fn()
    const onSuccess = vi.fn()
    const onSettled = vi.fn()
    const def = createQuery({
      queryKey: () => ['lifecycle'],
      queryFn: async () => 'x',
      onStart,
      onSuccess,
      onSettled,
    })
    await client.fetchQuery(def, {})
    expect(onStart).toHaveBeenCalled()
    expect(onSuccess).toHaveBeenCalled()
    expect(onSettled).toHaveBeenCalled()
  })

  it('isActive reflects observers', async () => {
    const client = createTestClient()
    const def = createQuery({ queryKey: () => ['active'], queryFn: async () => 1 })
    const instance = def.with({}, { client, refetchOnMount: false })
    await instance.refetch()
    const query = client.queryCache.getByKey(['active'])!
    expect(query.isActive()).toBe(true)
    instance.remove()
    expect(query.isActive()).toBe(false)
  })

  it('fetch returns same promise while already fetching', async () => {
    const client = createTestClient()
    const d = deferred<number>()
    const queryFn = vi.fn(() => d.promise)
    const def = createQuery({
      queryKey: () => ['dedupe'],
      queryFn,
    })
    const instance = def.with({}, { client, refetchOnMount: false })
    const p1 = instance.refetch()
    await flush()
    const query = client.queryCache.getByKey(['dedupe'])!
    const p2 = query.fetch()
    d.resolve(1)
    expect(await p1).toBe(1)
    expect(await p2).toBe(1)
    expect(queryFn).toHaveBeenCalledTimes(1)
  })
})
