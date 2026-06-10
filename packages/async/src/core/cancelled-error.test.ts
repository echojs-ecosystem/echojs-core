import { describe, expect, it } from 'vitest'

import { CancelledError, isAbortError, isCancelledError } from './cancelled-error'

describe('CancelledError', () => {
  it('isCancelledError detects instance', () => {
    const err = new CancelledError()
    expect(isCancelledError(err)).toBe(true)
    expect(isCancelledError(new Error('x'))).toBe(false)
  })

  it('isAbortError treats CancelledError and AbortError as abort', () => {
    expect(isAbortError(new CancelledError())).toBe(true)
    expect(isAbortError(new CancelledError({ silent: true }))).toBe(true)
    expect(isAbortError({ name: 'AbortError' })).toBe(true)
    expect(isAbortError(new Error('fail'))).toBe(false)
  })
})
