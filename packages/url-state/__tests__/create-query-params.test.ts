import { describe, expect, it } from 'vitest'

import {
  createMemoryUrlStateAdapter,
  createQueryParams,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
} from '@echojs/url-state'

const flush = async () => {
  await Promise.resolve()
  await Promise.resolve()
}

describe('createQueryParams', () => {
  it('reads group from URL + defaults when missing', () => {
    const adapter = createMemoryUrlStateAdapter('?q=bike')
    const filters = createQueryParams(
      {
        q: parseAsString.withDefault(''),
        page: parseAsInteger.withDefault(1),
        inStock: parseAsBoolean.withDefault(false),
      },
      { adapter }
    )
    expect(filters.value()).toEqual({ q: 'bike', page: 1, inStock: false })
  })

  it('set partial value updates only provided keys', async () => {
    const adapter = createMemoryUrlStateAdapter('?q=a&page=1&inStock=true')
    const filters = createQueryParams(
      {
        q: parseAsString.withDefault(''),
        page: parseAsInteger.withDefault(1),
        inStock: parseAsBoolean.withDefault(false),
      },
      { adapter }
    )
    filters.set({ page: 2 })
    await flush()
    expect(adapter.getSearch()).toBe('?inStock=true&page=2&q=a')
  })

  it('set(null) clears managed keys only', async () => {
    const adapter = createMemoryUrlStateAdapter('?q=a&page=1&x=1')
    const filters = createQueryParams(
      {
        q: parseAsString.withDefault(''),
        page: parseAsInteger.withDefault(1),
      },
      { adapter }
    )
    filters.set(null)
    await flush()
    expect(adapter.getSearch()).toBe('?x=1')
  })

  it('update works', async () => {
    const adapter = createMemoryUrlStateAdapter('?page=1')
    const filters = createQueryParams(
      { page: parseAsInteger.withDefault(1) },
      { adapter }
    )
    filters.update((v) => ({ page: v.page + 1 }))
    await flush()
    expect(adapter.getSearch()).toBe('?page=2')
  })

  it('urlKeys remapping', async () => {
    const adapter = createMemoryUrlStateAdapter('')
    const coordinates = createQueryParams(
      {
        latitude: parseAsString.withDefault('45.18'),
        longitude: parseAsString.withDefault('5.72'),
      },
      { adapter, urlKeys: { latitude: 'lat', longitude: 'lng' } }
    )
    coordinates.set({ latitude: '1', longitude: '2' })
    await flush()
    expect(adapter.getSearch()).toBe('?lat=1&lng=2')
  })

  it('array values (repeated keys) in group', () => {
    const adapter = createMemoryUrlStateAdapter('?tag=a&tag=b')
    const filters = createQueryParams(
      { tag: parseAsArrayOf(parseAsString).withDefault([]) },
      { adapter }
    )
    expect(filters.value()).toEqual({ tag: ['a', 'b'] })
  })

  it('reset restores defaults', async () => {
    const adapter = createMemoryUrlStateAdapter('?page=5')
    const filters = createQueryParams(
      { page: parseAsInteger.withDefault(1), q: parseAsString.withDefault('') },
      { adapter }
    )
    filters.reset()
    await flush()
    expect(filters.value()).toEqual({ page: 1, q: '' })
    expect(adapter.getSearch()).toBe('')
  })

  it('clear removes all managed keys', async () => {
    const adapter = createMemoryUrlStateAdapter('?page=2&q=x&other=1')
    const filters = createQueryParams(
      { page: parseAsInteger.withDefault(1), q: parseAsString.withDefault('') },
      { adapter }
    )
    filters.clear()
    await flush()
    expect(adapter.getSearch()).toBe('?other=1')
    expect(filters.value()).toEqual({ page: 1, q: '' })
  })

  it('set null field restores parser default', async () => {
    const adapter = createMemoryUrlStateAdapter('?page=5')
    const filters = createQueryParams(
      { page: parseAsInteger.withDefault(1) },
      { adapter }
    )
    filters.set({ page: null })
    await flush()
    expect(filters.value().page).toBe(1)
    expect(adapter.getSearch()).toBe('')
  })

  it('subscribe emits on changes', async () => {
    const adapter = createMemoryUrlStateAdapter('?page=1')
    const filters = createQueryParams(
      { page: parseAsInteger.withDefault(1) },
      { adapter }
    )
    const events: number[] = []
    const unsub = filters.subscribe((v) => events.push(v.page))
    filters.set({ page: 2 })
    await flush()
    unsub()
    expect(events.length).toBeGreaterThan(0)
    expect(events.every((page) => page === 2)).toBe(true)
  })
})
