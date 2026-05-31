import { describe, expect, it, vi } from 'vitest'

import { createMemoryUrlStateAdapter } from '../adapters/memory-adapter'
import { createQueryParam } from '../core/create-query-param'
import { parseAsInteger } from '../parsers/integer'
import { throttle } from './throttle'

const flush = async () => {
  await Promise.resolve()
  await Promise.resolve()
}

describe('throttle', () => {
  it('обновляет URL реже, но value меняет сразу', async () => {
    vi.useFakeTimers()
    const adapter = createMemoryUrlStateAdapter('?page=1')
    const page = createQueryParam('page', parseAsInteger.withDefault(1), {
      adapter,
      limitUrlUpdates: throttle(100),
    })

    page.set(2)
    expect(page.value()).toBe(2)
    await flush()
    expect(adapter.getSearch()).toBe('?page=1')

    vi.advanceTimersByTime(100)
    await flush()
    expect(adapter.getSearch()).toBe('?page=2')

    vi.useRealTimers()
  })
})
