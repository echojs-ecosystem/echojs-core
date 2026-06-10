import { describe, expectTypeOf, it } from 'vitest'

import { createMutation } from './create-mutation'
import type {
  MutationDefinition,
  MutationFnContext,
  MutationInstance,
} from '../types'

describe('createMutation generics', () => {
  it('uses TData, TVariables, TError, TRollback order', () => {
    type Vars = { id: string; name: string }
    type Rollback = () => void

    const def = createMutation<
      { id: string; name: string },
      Vars,
      { code: number },
      Rollback
    >({
      mutationFn: async ({ variables }) => ({
        id: variables.id,
        name: variables.name,
      }),
      onMutate: () => (() => {}) as Rollback,
    })

    expectTypeOf(def).toMatchObjectType<
      MutationDefinition<
        { id: string; name: string },
        Vars,
        { code: number },
        Rollback
      >
    >()
  })

  it('types mutationFn context', () => {
    createMutation<number, { n: number }>({
      mutationFn: async (ctx) => {
        expectTypeOf(ctx).toEqualTypeOf<
          MutationFnContext<{ n: number }, number, unknown>
        >()
        expectTypeOf(ctx.variables.n).toBeNumber()
        expectTypeOf(ctx.signal).toEqualTypeOf<AbortSignal>()
        expectTypeOf(ctx.abortController).toEqualTypeOf<AbortController>()
        return ctx.variables.n * 2
      },
    })
  })

  it('types lifecycle contexts', () => {
    type Vars = { id: string }
    type Rollback = { prev: string }

    createMutation<string, Vars, Error, Rollback>({
      mutationFn: async () => 'ok',
      onMutate: (ctx) => {
        expectTypeOf(ctx.variables.id).toBeString()
        expectTypeOf(ctx.rollback).toEqualTypeOf<Rollback | undefined>()
        return { prev: 'x' } satisfies Rollback
      },
      onSuccess: (ctx) => {
        expectTypeOf(ctx.data).toEqualTypeOf<string | undefined>()
        expectTypeOf(ctx.rollback).toEqualTypeOf<Rollback | undefined>()
      },
      onError: (ctx) => {
        expectTypeOf(ctx.error).toEqualTypeOf<Error | null | undefined>()
      },
      onSettled: (ctx) => {
        expectTypeOf(ctx.variables).toEqualTypeOf<Vars>()
      },
    })
  })
})

describe('MutationInstance.run', () => {
  it('requires TVariables', () => {
    const update = createMutation<string, { id: string }>({
      mutationFn: async ({ variables }) => variables.id,
    })

    expectTypeOf(update.create).returns.toMatchTypeOf<
      MutationInstance<string, { id: string }, unknown>
    >()

    type Inst = MutationInstance<string, { id: string }, unknown>
    expectTypeOf<Inst['run']>().parameter(0).toEqualTypeOf<{ id: string }>()
    expectTypeOf<Inst['run']>().returns.toEqualTypeOf<Promise<string>>()
  })

  it('void TVariables', () => {
    const ping = createMutation<string, void>({
      mutationFn: async () => 'pong',
    })

    type Inst = MutationInstance<string, void, unknown>
    expectTypeOf<Inst['run']>().toBeCallableWith(undefined as void)
    expectTypeOf<Inst['run']>().returns.toEqualTypeOf<Promise<string>>()
  })

  it('instance state accessors', () => {
    type Inst = MutationInstance<{ ok: true }, { flag: boolean }, unknown>

    expectTypeOf<Inst['data']>().returns.toEqualTypeOf<{ ok: true } | undefined>()
    expectTypeOf<Inst['variables']>().returns.toEqualTypeOf<{ flag: boolean } | undefined>()
    expectTypeOf<Inst['isSuccess']>().returns.toBeBoolean()
  })
})
