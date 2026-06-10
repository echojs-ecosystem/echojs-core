import { describe, expect, it, vi } from 'vitest'

import { createTestClient, flush } from '../test-utils'
import { createQuery } from './create-query'

describe('createQuery', () => {
  it('does not fetch immediately', () => {
    const fetcher = vi.fn(async () => 'ok')
    const query = createQuery({
      queryKey: () => ['test'],
      queryFn: fetcher,
    })

    expect(fetcher).not.toHaveBeenCalled()
    void query
  })

  it('with fetches and resolves data', async () => {
    const client = createTestClient()
    const fetcher = vi.fn(async () => ({ id: '1' }))

    const getUserQuery = createQuery({
      queryKey: ({ id }: { id: string }) => ['user', id],
      queryFn: fetcher,
    })

    const user = getUserQuery.with({ id: '1' }, { client })
    await flush()
    await user.refetch()

    expect(fetcher).toHaveBeenCalled()
    expect(user.data()).toEqual({ id: '1' })
    expect(user.isSuccess()).toBe(true)
  })

  it('withStore binds store params', async () => {
    const client = createTestClient()
    const { createStore } = await import('@echojs-ecosystem/store')

    const filters = createStore({ page: 1, q: '' })
    const getUsersQuery = createQuery({
      queryKey: (p: { page: number; q: string }) => ['users', p],
      queryFn: async ({ params }) => params,
    })

    const users = getUsersQuery.withStore(filters, (f) => f, { client })
    await users.refetch()
    expect(users.data()).toEqual({ page: 1, q: '' })

    filters.set({ page: 2, q: 'a' })
    await flush()
    await users.refetch()
    expect(users.params()).toEqual({ page: 2, q: 'a' })
  })
})
