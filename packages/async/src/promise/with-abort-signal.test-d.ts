import { describe, expectTypeOf, it } from 'vitest'

import type { AsyncOptions } from './async-options'
import { withAbortSignal } from './with-abort-signal'

describe('withAbortSignal types', () => {
  it('infers result from run callback', () => {
    expectTypeOf(withAbortSignal(() => Promise.resolve(42))).toEqualTypeOf<Promise<number>>()
    expectTypeOf(withAbortSignal(() => Promise.resolve('ok'))).toEqualTypeOf<Promise<string>>()
  })

  it('accepts optional AsyncOptions', () => {
    const options: AsyncOptions = { signal: new AbortController().signal }
    expectTypeOf(withAbortSignal(() => Promise.resolve(true), options)).toEqualTypeOf<
      Promise<boolean>
    >()
  })
})
