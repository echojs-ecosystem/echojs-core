import { describe, expectTypeOf, it } from 'vitest'

import { allSettled } from './all-settled'

describe('allSettled types', () => {
  it('infers settled tuple result types', () => {
    expectTypeOf(allSettled([Promise.resolve(1), Promise.resolve('a')])).toEqualTypeOf<
      Promise<
        [
          PromiseSettledResult<number>,
          PromiseSettledResult<string>,
        ]
      >
    >()
  })
})
