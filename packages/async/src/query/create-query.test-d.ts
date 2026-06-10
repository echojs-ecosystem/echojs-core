import { describe, expectTypeOf, it } from 'vitest'

import { createQuery } from './create-query'
import type {
  QueryDefinition,
  QueryFnContext,
  QueryInstance,
  QueryKey,
  QueryLifecycleContext,
} from '../types'

type User = { id: string; name: string }
type UserRaw = { id: string; raw: boolean }

describe('createQuery generics', () => {
  it('infers TData, TParams, TQueryData from options', () => {
    const def = createQuery<User, { id: string }, unknown, UserRaw>({
      queryKey: ({ id }) => ['user', id],
      queryFn: async ({ params }) => ({ id: params.id, raw: true }),
      transform: (data) => ({ id: data.id, name: 'Echo' }),
    })

    expectTypeOf(def).toMatchObjectType<QueryDefinition<User, { id: string }, unknown, UserRaw>>()
  })

  it('types queryFn context', () => {
    createQuery<string[], { page: number }>({
      queryKey: (p) => ['items', p],
      queryFn: async (ctx) => {
        expectTypeOf(ctx).toEqualTypeOf<
          QueryFnContext<{ page: number }, string[], unknown>
        >()
        expectTypeOf(ctx.params.page).toBeNumber()
        expectTypeOf(ctx.queryKey).toEqualTypeOf<QueryKey>()
        expectTypeOf(ctx.signal).toEqualTypeOf<AbortSignal>()
        expectTypeOf(ctx.abortController).toEqualTypeOf<AbortController>()
        return []
      },
    })
  })

  it('types lifecycle hooks', () => {
    createQuery<string, void, unknown, string>({
      queryKey: () => ['hooked'],
      queryFn: async () => 'data',
      onSuccess: (ctx) => {
        expectTypeOf(ctx).toMatchObjectType<QueryLifecycleContext<string, void, unknown>>()
        expectTypeOf(ctx.data).toEqualTypeOf<string | undefined>()
      },
    })
  })
})

describe('QueryDefinition.with', () => {
  it('requires TParams shape', () => {
    const getUser = createQuery<string, { id: string }>({
      queryKey: ({ id }) => ['user', id],
      queryFn: async ({ params }) => params.id,
    })

    expectTypeOf(getUser.with).parameter(0).toEqualTypeOf<{ id: string } | (() => { id: string })>()
    expectTypeOf(getUser.with).returns.toMatchTypeOf<QueryInstance<string, { id: string }, unknown>>()

    type BadParams = { notId?: string }
    expectTypeOf<BadParams>().not.toEqualTypeOf<{ id: string }>()
  })

  it('void TParams', () => {
    const list = createQuery<string[], void>({
      queryKey: () => ['list'],
      queryFn: async () => ['a'],
    })

    expectTypeOf(list.with).toBeCallableWith(undefined as void)
    expectTypeOf(list.with).returns.toMatchTypeOf<QueryInstance<string[], void, unknown>>()
  })

  it('instance method signatures', () => {
    type Inst = QueryInstance<User, { id: string }, unknown>

    expectTypeOf<Inst['data']>().returns.toEqualTypeOf<User | undefined>()
    expectTypeOf<Inst['params']>().returns.toEqualTypeOf<{ id: string }>()
    expectTypeOf<Inst['refetch']>().returns.toEqualTypeOf<Promise<User>>()
    expectTypeOf<Inst['error']>().returns.toEqualTypeOf<unknown | null>()
  })
})

describe('createQuery custom TError', () => {
  it('propagates TError to instance', () => {
    type ApiError = { code: number; message: string }

    const q = createQuery<string, void, ApiError>({
      queryKey: () => ['err'],
      queryFn: async () => 'ok',
    })

    expectTypeOf(q.with).returns.toMatchTypeOf<QueryInstance<string, void, ApiError>>()
  })
})
