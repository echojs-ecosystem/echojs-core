import { describe, expect, it, vi } from 'vitest'

import { CancelledError } from '../core/cancelled-error'
import { sleep } from '../utils/sleep'
import { serial } from './serial'

describe('serial', () => {
  it('runs thunks lazily in order', async () => {
    const order: number[] = []
    const results = await serial([
      () =>
        sleep(0).then(() => {
          order.push(1)
          return 'a'
        }),
      () =>
        sleep(0).then(() => {
          order.push(2)
          return 'b'
        }),
    ])
    expect(results).toEqual(['a', 'b'])
    expect(order).toEqual([1, 2])
  })

  it('stops when signal aborts between steps', async () => {
    const controller = new AbortController()
    const ran = vi.fn()
    const pending = serial(
      [
        async () => {
          ran()
          return 1
        },
        async () => {
          ran()
          return 2
        },
      ],
      { signal: controller.signal },
    )
    controller.abort(new CancelledError())
    await expect(pending).rejects.toBeInstanceOf(CancelledError)
    expect(ran).toHaveBeenCalledTimes(1)
  })
})
