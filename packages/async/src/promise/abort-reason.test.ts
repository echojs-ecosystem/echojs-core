import { describe, expect, it } from 'vitest'

import { CancelledError } from '../core/cancelled-error'
import { abortReason } from './abort-reason'

describe('abortReason', () => {
  it('returns CancelledError when signal is missing', () => {
    expect(abortReason()).toBeInstanceOf(CancelledError)
  })

  it('returns CancelledError when signal is not aborted', () => {
    const controller = new AbortController()
    expect(abortReason(controller.signal)).toBeInstanceOf(CancelledError)
  })

  it('returns signal.reason when aborted', () => {
    const controller = new AbortController()
    const reason = new Error('user cancelled')
    controller.abort(reason)
    expect(abortReason(controller.signal)).toBe(reason)
  })
})
