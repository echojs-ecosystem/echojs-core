import { describe, expect, it } from 'vitest'

import { CancelledError } from '../core/cancelled-error'
import { sleep } from '../utils/sleep'
import { withAbortSignal } from './with-abort-signal'

describe('withAbortSignal', () => {
  it('runs without wrapping when signal is missing', async () => {
    await expect(withAbortSignal(() => Promise.resolve(42))).resolves.toBe(42)
  })

  it('throws before run when signal is already aborted', () => {
    const controller = new AbortController()
    const reason = new CancelledError()
    controller.abort(reason)

    expect(() =>
      withAbortSignal(() => Promise.resolve(42), { signal: controller.signal }),
    ).toThrow(reason)
  })

  it('rejects when signal aborts during run', async () => {
    const controller = new AbortController()
    const pending = withAbortSignal(() => sleep(50).then(() => 'done'), {
      signal: controller.signal,
    })

    controller.abort(new CancelledError())
    await expect(pending).rejects.toBeInstanceOf(CancelledError)
  })

  it('resolves with run result when signal stays active', async () => {
    const controller = new AbortController()
    await expect(
      withAbortSignal(() => Promise.resolve('ok'), { signal: controller.signal }),
    ).resolves.toBe('ok')
  })

  it('propagates run rejection', async () => {
    const err = new Error('fetch failed')
    await expect(withAbortSignal(() => Promise.reject(err))).rejects.toBe(err)
  })
})
