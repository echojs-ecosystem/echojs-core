import { describe, expectTypeOf, it } from 'vitest'

import { race } from './race'

describe('race types', () => {
  it('infers union of awaited value types', () => {
    expectTypeOf(race([Promise.resolve(1), Promise.resolve('a')])).toEqualTypeOf<
      Promise<number | string>
    >()
  })
})
