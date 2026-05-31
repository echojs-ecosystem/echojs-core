import { describe, expectTypeOf, it } from 'vitest'

import { createMemoryUrlStateAdapter } from '../adapters/memory-adapter'
import { createQueryParam } from './create-query-param'
import { parseAsInteger } from '../parsers/integer'
import { parseAsString } from '../parsers/string'

describe('createQueryParam types', () => {
  it('infers value type from parser with default', () => {
    const page = createQueryParam('page', parseAsInteger.withDefault(1), {
      adapter: createMemoryUrlStateAdapter(''),
    })

    expectTypeOf(page.value()).toEqualTypeOf<number>()
    expectTypeOf(page.kind).toEqualTypeOf<'query-param'>()
    expectTypeOf(page.key).toEqualTypeOf<string>()
  })

  it('infers value type from parser without default', () => {
    const q = createQueryParam('q', parseAsString, {
      adapter: createMemoryUrlStateAdapter(''),
    })

    expectTypeOf(q.value()).toEqualTypeOf<string>()
  })

  it('set accepts value or null', () => {
    const page = createQueryParam('page', parseAsInteger.withDefault(1), {
      adapter: createMemoryUrlStateAdapter(''),
    })

    expectTypeOf(page.set).parameter(0).toEqualTypeOf<number | null>()
  })
})
