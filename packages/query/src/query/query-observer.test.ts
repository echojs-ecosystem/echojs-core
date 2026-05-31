import { describe, expect, it, vi } from 'vitest'

import { createTestClient } from '../test-utils'
import { createQuery } from './create-query'
import { QueryObserver } from './query-observer'

describe('QueryObserver', () => {
  it('fetch and refetch', async () => {
    const client = createTestClient()
    const def = createQuery({ queryKey: () => ['obs'], queryFn: async () => 99 })
    const observer = new QueryObserver(def, client, {}, { refetchOnMount: false })
    const data = await observer.fetch()
    expect(data).toBe(99)
    await observer.refetch()
    expect(observer.getQuery()?.hasData()).toBe(true)
    observer.destroy()
  })

  it('invalidate marks query stale', async () => {
    const client = createTestClient()
    const def = createQuery({
      queryKey: () => ['obs-inv'],
      queryFn: async () => 1,
      staleTime: Infinity,
    })
    const observer = new QueryObserver(def, client, {}, { refetchOnMount: false })
    await observer.fetch()
    const query = observer.getQuery()!
    expect(query.state.isInvalidated).toBe(false)
    observer.invalidate()
    expect(query.state.isInvalidated).toBe(true)
    observer.destroy()
  })

  it('remove drops query from cache', async () => {
    const client = createTestClient()
    const def = createQuery({ queryKey: () => ['obs-rm'], queryFn: async () => 1 })
    const observer = new QueryObserver(def, client, {}, { refetchOnMount: false })
    await observer.fetch()
    observer.remove()
    expect(observer.getQuery()).toBeNull()
    expect(client.queryCache.getByKey(['obs-rm'])).toBeUndefined()
  })

  it('subscribe notifies on updates', async () => {
    const client = createTestClient()
    const def = createQuery({ queryKey: () => ['obs-sub'], queryFn: async () => 1 })
    const observer = new QueryObserver(def, client, {}, { refetchOnMount: false })
    const listener = vi.fn()
    observer.subscribe(listener)
    await observer.fetch()
    expect(listener).toHaveBeenCalled()
    observer.destroy()
  })

  it('setParams with same hash does not rebuild', async () => {
    const client = createTestClient()
    const fetcher = vi.fn(async () => 1)
    const def = createQuery({
      queryKey: ({ id }: { id: string }) => ['same', id],
      queryFn: fetcher,
    })
    const observer = new QueryObserver(def, client, { id: '1' }, { refetchOnMount: false })
    await observer.fetch()
    const first = observer.getQuery()
    observer.setParams({ id: '1' })
    expect(observer.getQuery()).toBe(first)
    observer.destroy()
  })
})
