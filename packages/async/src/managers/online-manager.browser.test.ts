// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'

import { OnlineManager } from './online-manager'

describe('OnlineManager (browser)', () => {
  it('listens to online/offline events', () => {
    const manager = new OnlineManager()
    const listener = vi.fn()
    manager.subscribe(listener)

    window.dispatchEvent(new Event('offline'))
    window.dispatchEvent(new Event('online'))

    expect(listener).toHaveBeenCalled()
  })
})
