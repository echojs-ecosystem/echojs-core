import { describe, expectTypeOf, it } from 'vitest'

import { any } from './any'

describe('any types', () => {
  it('infers union of awaited value types', () => {
    expectTypeOf(any([Promise.resolve(1), Promise.resolve('a')])).toEqualTypeOf<
      Promise<number | string>
    >()
  })
})
