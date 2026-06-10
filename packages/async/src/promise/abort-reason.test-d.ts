import { describe, expectTypeOf, it } from 'vitest'

import { abortReason } from './abort-reason'

describe('abortReason types', () => {
  it('returns unknown', () => {
    expectTypeOf(abortReason()).toEqualTypeOf<unknown>()
    expectTypeOf(abortReason(new AbortController().signal)).toEqualTypeOf<unknown>()
  })
})
