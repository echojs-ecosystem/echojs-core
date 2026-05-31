import { assertType, describe, expectTypeOf, it } from 'vitest'

import { createQueryClient } from './query-client'
import { createQuery } from '../query/create-query'
import type { QueryClient, QueryDefinition, QueryFilter, QueryKey } from '../types'

type User = { id: string; name: string }

describe('QueryClient.getQueryData', () => {
  it('infers TData from definition and params', () => {
    const client = createQueryClient()
    const getUser = createQuery<User, { id: string }>({
      queryKey: ({ id }) => ['user', id],
      queryFn: async ({ params }) => ({ id: params.id, name: 'Echo' }),
    })

    const data = client.getQueryData(getUser, { id: '1' })
    expectTypeOf(data).toEqualTypeOf<User | undefined>()
  })

  it('infers TData from explicit generic with raw key', () => {
    const client = createQueryClient()
    const key = ['user', '1'] as const
    const data = client.getQueryData<User>(key)
    expectTypeOf(data).toEqualTypeOf<User | undefined>()
  })

  it('requires params when definition has non-void TParams', () => {
    type GetUserData = (
      definition: QueryDefinition<string, { id: string }>,
      params: { id: string },
    ) => string | undefined

    expectTypeOf<GetUserData>().toBeCallableWith(
      {} as QueryDefinition<string, { id: string }>,
      { id: '1' },
    )
  })
})

describe('QueryClient.setQueryData', () => {
  it('types updater prev from definition', async () => {
    const client = createQueryClient()
    const getUser = createQuery<User, { id: string }>({
      queryKey: ({ id }) => ['user', id],
      queryFn: async ({ params }) => ({ id: params.id, name: 'Old' }),
    })

    await client.fetchQuery(getUser, { id: '1' })

    client.setQueryData(getUser, { id: '1' }, (prev) => {
      expectTypeOf(prev).toEqualTypeOf<User | undefined>()
      return prev ? { ...prev, name: 'New' } : { id: '1', name: 'New' }
    })
  })

  it('types updater with explicit generic and raw key', async () => {
    const client = createQueryClient()
    const getUser = createQuery<User, { id: string }>({
      queryKey: ({ id }) => ['user', id],
      queryFn: async ({ params }) => ({ id: params.id, name: 'Old' }),
    })
    await client.fetchQuery(getUser, { id: '1' })
    const key = ['user', '1'] as const

    client.setQueryData<User>(key, (prev) => {
      expectTypeOf(prev).toEqualTypeOf<User | undefined>()
      return { id: '1', name: 'Typed' }
    })
  })
})

describe('QueryClient.fetchQuery', () => {
  it('returns TData from definition', async () => {
    const client = createQueryClient()
    const getPosts = createQuery<{ id: number }[], void>({
      queryKey: () => ['posts'],
      queryFn: async () => [{ id: 1 }],
    })

    const data = await client.fetchQuery(getPosts)
    expectTypeOf(data).toEqualTypeOf<{ id: number }[]>()
  })

  it('returns transformed TData', async () => {
    const client = createQueryClient()
    const q = createQuery<number, void, unknown, { raw: number }>({
      queryKey: () => ['count'],
      queryFn: async () => ({ raw: 1 }),
      transform: (d) => d.raw + 1,
    })

    const data = await client.fetchQuery(q)
    expectTypeOf(data).toEqualTypeOf<number>()
  })
})

describe('QueryClient filters', () => {
  it('accepts array QueryFilter', () => {
    const client = createQueryClient()
    client.invalidateQueries(['users'])
    client.cancelQueries(['users', { page: 1 }])
    client.removeQueries([])
    assertType<Parameters<QueryClient['refetchQueries']>>([['users']])
  })

  it('accepts object QueryFilter with queryKey array', () => {
    const client = createQueryClient()
    const filter: QueryFilter = { queryKey: ['users'], exact: true }
    client.invalidateQueries(filter)
    expectTypeOf(filter.queryKey).toEqualTypeOf<QueryKey>()
  })

  it('rejects non-array queryKey', () => {
    assertType<Parameters<QueryClient['invalidateQueries']>>([
      // @ts-expect-error queryKey must be QueryKey (array)
      { queryKey: 'users' },
    ])
    assertType<Parameters<QueryClient['invalidateQueries']>>([
      // @ts-expect-error queryKey must be QueryKey (array)
      { queryKey: { id: '1' } },
    ])
  })
})
