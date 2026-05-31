import { describe, expect, it } from 'vitest'

import { CancelledError } from '../core/cancelled-error'
import { createTestClient, sleep } from '../test-utils'
import { createQuery } from '../query/create-query'

describe('QueryClient', () => {
  it('fetchQuery, get/setQueryData', async () => {
    const client = createTestClient()
    const getUserQuery = createQuery({
      queryKey: ({ id }: { id: string }) => ['user', id],
      queryFn: async ({ params }) => ({ id: params.id, name: 'Echo' }),
    })

    const data = await client.fetchQuery(getUserQuery, { id: '1' })
    expect(data).toEqual({ id: '1', name: 'Echo' })
    expect(client.getQueryData(getUserQuery, { id: '1' })).toEqual(data)

    client.setQueryData(getUserQuery, { id: '1' }, (prev) => ({
      ...prev!,
      name: 'Updated',
    }))

    expect(client.getQueryData(['user', '1'])).toEqual({
      id: '1',
      name: 'Updated',
    })
  })

  it('prefetchQuery and ensureQueryData', async () => {
    const client = createTestClient()
    const q = createQuery({
      queryKey: () => ['prefetch'],
      queryFn: async () => 'cached',
      staleTime: Infinity,
    })

    await client.prefetchQuery(q, {})
    const data = await client.ensureQueryData(q, {})
    expect(data).toBe('cached')
  })

  it('invalidate, refetch, cancel, remove, clear', async () => {
    const client = createTestClient()
    let calls = 0
    const q = createQuery({
      queryKey: () => ['users'],
      queryFn: async () => {
        calls += 1
        return calls
      },
      staleTime: 0,
    })

    await client.fetchQuery(q, {})
    expect(calls).toBe(1)
    client.invalidateQueries(['users'])
    await client.refetchQueries(['users'])
    expect(calls).toBe(2)

    await client.fetchQuery(q, {})
    client.cancelQueries(['users'])
    client.removeQueries(['users'])
    expect(client.getQueryData(['users'])).toBeUndefined()

    await client.fetchQuery(q, {})
    client.clear()
    expect(client.getQueryData(['users'])).toBeUndefined()
  })

  it('retries failed requests', async () => {
    const client = createTestClient()
    let attempts = 0

    const q = createQuery({
      queryKey: () => ['retry'],
      retry: 2,
      retryDelay: 1,
      queryFn: async () => {
        attempts += 1
        if (attempts < 3) throw new Error('fail')
        return 'ok'
      },
    })

    const data = await client.fetchQuery(q, {})
    expect(data).toBe('ok')
    expect(attempts).toBe(3)
  })

  it('does not retry on abort', async () => {
    const client = createTestClient()
    let attempts = 0

    const q = createQuery({
      queryKey: () => ['retry-abort'],
      retry: 3,
      queryFn: async () => {
        attempts += 1
        throw new CancelledError()
      },
    })

    await expect(client.fetchQuery(q, {})).rejects.toBeTruthy()
    expect(attempts).toBe(1)
  })

  it('uses staleTime to avoid refetch', async () => {
    const client = createTestClient()
    let calls = 0

    const q = createQuery({
      queryKey: () => ['stale'],
      staleTime: Infinity,
      queryFn: async () => {
        calls += 1
        return calls
      },
    })

    await client.fetchQuery(q, {})
    await client.fetchQuery(q, {})
    expect(calls).toBe(1)
  })

  it('fetchQuery throws when disabled without cache', async () => {
    const client = createTestClient()
    const q = createQuery({
      queryKey: () => ['disabled-fetch'],
      queryFn: async () => 'x',
    })
    await expect(client.fetchQuery(q, {}, { enabled: false })).rejects.toThrow(/disabled/)
  })

  it('setQueryData throws when query missing', () => {
    const client = createTestClient()
    expect(() => client.setQueryData(['missing'], () => 1)).toThrow(/not found/)
  })
})

describe('QueryClient invalidation', () => {
  it('invalidates users queries but not user', async () => {
    const client = createTestClient()
    const users = createQuery({
      queryKey: ({ page }: { page: number }) => ['users', { page }],
      queryFn: async ({ params }) => params.page,
    })
    const user = createQuery({
      queryKey: ({ id }: { id: string }) => ['user', id],
      queryFn: async ({ params }) => params.id,
    })

    await client.fetchQuery(users, { page: 1 })
    await client.fetchQuery(users, { page: 2 })
    await client.fetchQuery(user, { id: '1' })

    client.invalidateQueries(['users'])

    const usersQueries = client.queryCache.findAll(['users'])
    expect(usersQueries.every((entry) => entry.state.isInvalidated)).toBe(true)

    const userQuery = client.queryCache.getByKey(['user', '1'])
    expect(userQuery?.state.isInvalidated).toBe(false)
  })

  it('invalidateQueries with refetch none does not refetch', async () => {
    const client = createTestClient()
    let calls = 0
    const q = createQuery({
      queryKey: () => ['no-refetch'],
      queryFn: async () => {
        calls += 1
        return calls
      },
      staleTime: 0,
    })

    await client.fetchQuery(q, {})
    client.invalidateQueries(['no-refetch'], { refetch: 'none' })
    await sleep(20)
    expect(calls).toBe(1)
  })
})

describe('QueryCache events', () => {
  it('emits query cache events', async () => {
    const client = createTestClient()
    const events: string[] = []
    client.queryCache.subscribe((event) => events.push(event.type))

    const q = createQuery({
      queryKey: () => ['events'],
      queryFn: async () => 1,
    })

    await client.fetchQuery(q, {})
    expect(events).toContain('queryAdded')
    expect(events).toContain('queryFetched')
  })
})
