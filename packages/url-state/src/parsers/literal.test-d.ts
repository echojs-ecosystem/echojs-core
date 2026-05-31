import { describe, expectTypeOf, it } from 'vitest'

import { parseAsLiteral } from './literal'

describe('parseAsLiteral types', () => {
  it('infers literal union from values array', () => {
    const view = parseAsLiteral(['grid', 'list'] as const)

    expectTypeOf(view.parse('grid')).toEqualTypeOf<'grid' | 'list' | null>()
  })

  it('withDefault narrows to non-null literal', () => {
    const view = parseAsLiteral(['grid', 'list'] as const).withDefault('grid')

    expectTypeOf(view.defaultValue).toEqualTypeOf<'grid' | 'list'>()
  })
})
