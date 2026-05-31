import { describe, expect, it, vi } from 'vitest'

import { defaultRetryDelay, getRetryDelay, shouldRetry, waitForRetry } from './retry'

describe('async/retry', () => {
  it('defaultRetryDelay exponential cap', () => {
    expect(defaultRetryDelay(0)).toBe(1000)
    expect(defaultRetryDelay(10)).toBe(30_000)
  })

  it('shouldRetry respects abort and retry config', () => {
    expect(shouldRetry(0, new Error(), false, false)).toBe(false)
    expect(shouldRetry(0, new Error(), 2, false)).toBe(true)
    expect(shouldRetry(2, new Error(), 2, false)).toBe(false)
    expect(shouldRetry(0, new Error(), 1, true)).toBe(false)
    expect(shouldRetry(0, new Error(), () => false, false)).toBe(false)
  })

  it('getRetryDelay uses function or number or default', () => {
    expect(getRetryDelay(1, new Error(), 50)).toBe(50)
    expect(getRetryDelay(1, new Error(), (_, e) => (e as Error).message.length)).toBe(0)
    expect(getRetryDelay(0, new Error(), undefined)).toBe(1000)
  })

  it('waitForRetry resolves after delay', async () => {
    vi.useFakeTimers()
    const ac = new AbortController()
    const p = waitForRetry(0, new Error(), 20, ac.signal)
    vi.advanceTimersByTime(20)
    await expect(p).resolves.toBeUndefined()
    vi.useRealTimers()
  })

  it('waitForRetry rejects when aborted', async () => {
    const ac = new AbortController()
    ac.abort(new Error('aborted'))
    await expect(waitForRetry(0, new Error(), 100, ac.signal)).rejects.toBeTruthy()
  })
})
