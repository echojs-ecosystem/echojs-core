import { describe, expectTypeOf, it } from 'vitest'

import { all } from './all'

describe('all types', () => {
  it('infers tuple result types', () => {
    expectTypeOf(all([Promise.resolve(1), Promise.resolve('a')])).toEqualTypeOf<
      Promise<[number, string]>
    >()
  })

  it('accepts optional AsyncOptions', () => {
    expectTypeOf(
      all([Promise.resolve(1)], { signal: new AbortController().signal }),
    ).toEqualTypeOf<Promise<[number]>>()
  })
})
