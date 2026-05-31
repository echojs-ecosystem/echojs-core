import { describe, expect, it, vi } from 'vitest'

import { CancelledError } from './cancelled-error'
import { createRetryer } from './retryer'

describe('createRetryer', () => {
  it('resolves on success', async () => {
    const retryer = createRetryer({ fn: async () => 'ok' })
    await expect(retryer.start()).resolves.toBe('ok')
  })

  it('retries then succeeds', async () => {
    vi.useFakeTimers()
    let calls = 0
    const retryer = createRetryer({
      fn: async () => {
        calls += 1
        if (calls < 2) throw new Error('fail')
        return 'ok'
      },
      retry: 1,
      retryDelay: 10,
    })
    const p = retryer.start()
    await vi.runAllTimersAsync()
    await expect(p).resolves.toBe('ok')
    expect(calls).toBe(2)
    vi.useRealTimers()
  })

  it('cancel rejects with CancelledError', async () => {
    const onCancel = vi.fn()
    const retryer = createRetryer({
      fn: () => new Promise(() => {}),
      onCancel,
    })
    const p = retryer.start()
    retryer.cancel()
    await expect(p).rejects.toBeInstanceOf(CancelledError)
    expect(onCancel).toHaveBeenCalled()
  })

  it('does not retry CancelledError', async () => {
    let calls = 0
    const retryer = createRetryer({
      fn: async () => {
        calls += 1
        throw new CancelledError()
      },
      retry: 3,
    })
    await expect(retryer.start()).rejects.toBeInstanceOf(CancelledError)
    expect(calls).toBe(1)
  })

  it('uses initialPromise on first attempt', async () => {
    const retryer = createRetryer({
      fn: async () => 'fn',
      initialPromise: Promise.resolve('initial'),
    })
    await expect(retryer.start()).resolves.toBe('initial')
  })
})
