import { describe, expect, it, vi } from 'vitest'

import { Removable } from './removable'

class TestRemovable extends Removable {
  removed = false

  schedule(onRemove: () => void) {
    this.scheduleGc(onRemove)
  }

  setCacheTime(ms: number) {
    this.updateGcTime(ms)
  }

  clear() {
    this.clearGcTimeout()
  }
}

describe('Removable', () => {
  it('scheduleGc runs onRemove after gcTime', () => {
    vi.useFakeTimers()
    const item = new TestRemovable()
    item.setCacheTime(100)
    item.schedule(() => {
      item.removed = true
    })
    vi.advanceTimersByTime(100)
    expect(item.removed).toBe(true)
    vi.useRealTimers()
  })

  it('clearGcTimeout prevents removal', () => {
    vi.useFakeTimers()
    const item = new TestRemovable()
    item.setCacheTime(100)
    item.schedule(() => {
      item.removed = true
    })
    item.clear()
    vi.advanceTimersByTime(200)
    expect(item.removed).toBe(false)
    vi.useRealTimers()
  })

  it('infinite gcTime does not schedule', () => {
    vi.useFakeTimers()
    const item = new TestRemovable()
    item.setCacheTime(Number.POSITIVE_INFINITY)
    item.schedule(() => {
      item.removed = true
    })
    vi.advanceTimersByTime(10_000)
    expect(item.removed).toBe(false)
    vi.useRealTimers()
  })
})
