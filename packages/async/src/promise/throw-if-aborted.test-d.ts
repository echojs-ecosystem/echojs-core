import { describe, expectTypeOf, it } from 'vitest'

import { throwIfAborted } from './throw-if-aborted'

describe('throwIfAborted types', () => {
  it('accepts optional signal and returns void', () => {
    expectTypeOf(throwIfAborted).parameters.toEqualTypeOf<[signal?: AbortSignal]>()
    expectTypeOf(throwIfAborted()).toEqualTypeOf<void>()
  })
})
