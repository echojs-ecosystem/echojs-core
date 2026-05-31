import { describe, expectTypeOf, it } from 'vitest'

import { createQueryProvider } from './query-provider'
import type { MutationInstance, QueryDefinition, QueryInstance } from '../types'

describe('QueryProvider', () => {
  it('createQuery preserves definition generics', () => {
    const provider = createQueryProvider()

    const def = provider.createQuery<number, { id: number }>({
      queryKey: ({ id }) => ['item', id],
      queryFn: async ({ params }) => params.id,
    })

    expectTypeOf(def).toMatchObjectType<QueryDefinition<number, { id: number }, unknown>>()
    expectTypeOf(def.with).parameter(0).toEqualTypeOf<{ id: number } | (() => { id: number })>()
    expectTypeOf(def.with).returns.toMatchTypeOf<QueryInstance<number, { id: number }, unknown>>()
  })

  it('createMutation preserves mutation generics', () => {
    const provider = createQueryProvider()

    const def = provider.createMutation<boolean, { on: boolean }>({
      mutationFn: async ({ variables }) => variables.on,
    })

    type ProviderMutation = MutationInstance<boolean, { on: boolean }, unknown>
    expectTypeOf(def.create).returns.toMatchTypeOf<ProviderMutation>()
    type Inst = import('../types').MutationInstance<boolean, { on: boolean }, unknown>
    expectTypeOf<Inst['run']>().parameter(0).toEqualTypeOf<{ on: boolean }>()
  })
})
