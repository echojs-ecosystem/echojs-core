import { describe, expect, it, vi } from 'vitest'

import { MutationCache } from './mutation-cache'

describe('MutationCache', () => {
  it('emits events to subscribers', () => {
    const cache = new MutationCache()
    const listener = vi.fn()
    cache.subscribe(listener)

    cache.emit({ type: 'mutationAdded', mutationId: 1 })
    cache.emit({ type: 'mutationUpdated', mutationId: 1 })

    expect(listener).toHaveBeenCalledTimes(2)
  })

  it('clear removes listeners', () => {
    const cache = new MutationCache()
    const listener = vi.fn()
    cache.subscribe(listener)
    cache.clear()
    cache.emit({ type: 'mutationAdded', mutationId: 1 })
    expect(listener).not.toHaveBeenCalled()
  })
})
