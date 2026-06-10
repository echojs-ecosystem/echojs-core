import { describe, expect, it, vi } from 'vitest'

import { listenAbort } from './listen-abort'

describe('listenAbort', () => {
  it('returns noop cleanup when signal is missing', () => {
    const onAbort = vi.fn()
    const cleanup = listenAbort(undefined, onAbort)
    expect(onAbort).not.toHaveBeenCalled()
    expect(() => cleanup()).not.toThrow()
  })

  it('calls onAbort immediately when signal is already aborted', () => {
    const controller = new AbortController()
    controller.abort()
    const onAbort = vi.fn()

    listenAbort(controller.signal, onAbort)

    expect(onAbort).toHaveBeenCalledTimes(1)
  })

  it('calls onAbort when signal aborts later', () => {
    const controller = new AbortController()
    const onAbort = vi.fn()

    listenAbort(controller.signal, onAbort)
    expect(onAbort).not.toHaveBeenCalled()

    controller.abort()
    expect(onAbort).toHaveBeenCalledTimes(1)
  })

  it('cleanup removes abort listener', () => {
    const controller = new AbortController()
    const onAbort = vi.fn()

    const cleanup = listenAbort(controller.signal, onAbort)
    cleanup()
    controller.abort()

    expect(onAbort).not.toHaveBeenCalled()
  })
})
