import { describe, expectTypeOf, it } from 'vitest'

import { listenAbort } from './listen-abort'

describe('listenAbort types', () => {
  it('returns cleanup function', () => {
    expectTypeOf(listenAbort(undefined, () => undefined)).toEqualTypeOf<() => void>()
    expectTypeOf(listenAbort(new AbortController().signal, () => undefined)).toEqualTypeOf<
      () => void
    >()
  })
})
