import { describe, expect, it } from 'vitest'

import {
  createMemoryUrlStateAdapter,
  createQueryParam,
  parseAsInteger,
  parseAsString,
} from '@echojs/url-state'

const flush = async () => {
  await Promise.resolve()
  await Promise.resolve()
}

describe('createQueryParam', () => {
  it('reads initial value from URL', () => {
    const adapter = createMemoryUrlStateAdapter('?page=2')
    const page = createQueryParam('page', parseAsInteger.withDefault(1), {
      adapter,
    })
    expect(page.value()).toBe(2)
  })

  it('default value when missing', () => {
    const adapter = createMemoryUrlStateAdapter('')
    const page = createQueryParam('page', parseAsInteger.withDefault(1), {
      adapter,
    })
    expect(page.value()).toBe(1)
  })

  it('set updates value and URL', async () => {
    const adapter = createMemoryUrlStateAdapter('?page=1')
    const page = createQueryParam('page', parseAsInteger.withDefault(1), {
      adapter,
    })
    page.set(2)
    expect(page.value()).toBe(2)
    await flush()
    expect(adapter.getSearch()).toBe('?page=2')
  })

  it('update works', async () => {
    const adapter = createMemoryUrlStateAdapter('?page=1')
    const page = createQueryParam('page', parseAsInteger.withDefault(1), {
      adapter,
    })
    page.update((v) => v + 1)
    await flush()
    expect(adapter.getSearch()).toBe('?page=2')
  })

  it('reset works', async () => {
    const adapter = createMemoryUrlStateAdapter('?page=2')
    const page = createQueryParam('page', parseAsInteger.withDefault(1), {
      adapter,
    })
    page.reset()
    await flush()
    expect(page.value()).toBe(1)
  })

  it('clear works (removes key)', async () => {
    const adapter = createMemoryUrlStateAdapter('?page=2')
    const page = createQueryParam('page', parseAsInteger.withDefault(1), {
      adapter,
    })
    page.clear()
    await flush()
    expect(adapter.getSearch()).toBe('')
    expect(page.value()).toBe(1)
  })

  it('preserves unrelated query params', async () => {
    const adapter = createMemoryUrlStateAdapter('?q=bike&page=1')
    const page = createQueryParam('page', parseAsInteger.withDefault(1), {
      adapter,
    })
    page.set(2)
    await flush()
    expect(adapter.getSearch()).toBe('?page=2&q=bike')
  })

  it('subscribe works', async () => {
    const adapter = createMemoryUrlStateAdapter('?q=a')
    const q = createQueryParam('q', parseAsString.withDefault(''), { adapter })
    const events: Array<[string, string]> = []
    const unsubscribe = q.subscribe((value, prev) => events.push([value, prev]))
    q.set('b')
    await flush()
    unsubscribe()
    expect(events).toEqual([['b', 'a']])
  })

  it('multiple instances same key sync', async () => {
    const adapter = createMemoryUrlStateAdapter('?page=1')
    const a = createQueryParam('page', parseAsInteger.withDefault(1), {
      adapter,
    })
    const b = createQueryParam('page', parseAsInteger.withDefault(1), {
      adapter,
    })
    a.set(2)
    await flush()
    expect(b.value()).toBe(2)
  })
})
