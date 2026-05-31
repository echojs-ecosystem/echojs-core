import { describe, expectTypeOf, it } from 'vitest'

import { createMemoryUrlStateAdapter } from '../adapters/memory-adapter'
import { createQueryParams } from './create-query-params'
import { parseAsBoolean } from '../parsers/boolean'
import { parseAsInteger } from '../parsers/integer'
import { parseAsString } from '../parsers/string'

describe('createQueryParams types', () => {
  it('infers parsed schema from parsers', () => {
    const filters = createQueryParams(
      {
        q: parseAsString.withDefault(''),
        page: parseAsInteger.withDefault(1),
        inStock: parseAsBoolean.withDefault(false),
      },
      { adapter: createMemoryUrlStateAdapter('') }
    )

    const value = filters.value()
    expectTypeOf(value.q).toEqualTypeOf<string>()
    expectTypeOf(value.page).toEqualTypeOf<number>()
    expectTypeOf(value.inStock).toEqualTypeOf<boolean>()
    expectTypeOf(filters.kind).toEqualTypeOf<'query-params'>()
  })

  it('set accepts partial schema', () => {
    const filters = createQueryParams(
      { page: parseAsInteger.withDefault(1) },
      { adapter: createMemoryUrlStateAdapter('') }
    )

    type PartialPage = Partial<{ page: number }> | null

    expectTypeOf<(typeof filters)['set']>().parameter(0).toEqualTypeOf<PartialPage>()
  })
})
