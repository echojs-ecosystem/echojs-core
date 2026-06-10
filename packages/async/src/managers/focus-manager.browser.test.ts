// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'

import { FocusManager } from './focus-manager'

describe('FocusManager (browser)', () => {
  it('listens to visibility and window focus events', () => {
    const manager = new FocusManager()
    const listener = vi.fn()
    manager.subscribe(listener)

    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      value: 'hidden',
    })
    document.dispatchEvent(new Event('visibilitychange'))

    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      value: 'visible',
    })
    document.dispatchEvent(new Event('visibilitychange'))
    window.dispatchEvent(new Event('focus'))

    expect(listener).toHaveBeenCalled()
  })
})
