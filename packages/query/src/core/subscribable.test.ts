import { describe, expect, it, vi } from 'vitest'

import { Subscribable } from './subscribable'

class TestBus extends Subscribable<{ type: string }> {
  emit() {
    this.notify({ type: 'ping' })
  }
}

describe('Subscribable', () => {
  it('subscribe and unsubscribe', () => {
    const bus = new TestBus()
    const listener = vi.fn()
    const unsub = bus.subscribe(listener)

    bus.emit()
    expect(listener).toHaveBeenCalledWith({ type: 'ping' })

    unsub()
    bus.emit()
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('hasListeners', () => {
    const bus = new TestBus()
    expect(bus.hasListeners()).toBe(false)
    const unsub = bus.subscribe(() => {})
    expect(bus.hasListeners()).toBe(true)
    unsub()
    expect(bus.hasListeners()).toBe(false)
  })
})
