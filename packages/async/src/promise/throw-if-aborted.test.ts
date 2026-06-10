import { describe, expect, it } from 'vitest'

import { CancelledError } from '../core/cancelled-error'
import { throwIfAborted } from './throw-if-aborted'

describe('throwIfAborted', () => {
  it('does nothing when signal is missing', () => {
    expect(() => throwIfAborted()).not.toThrow()
  })

  it('does nothing when signal is active', () => {
    const controller = new AbortController()
    expect(() => throwIfAborted(controller.signal)).not.toThrow()
  })

  it('throws abort reason when signal is already aborted', () => {
    const controller = new AbortController()
    const reason = new CancelledError()
    controller.abort(reason)
    expect(() => throwIfAborted(controller.signal)).toThrow(reason)
  })
})
