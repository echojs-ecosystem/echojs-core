import { describe, expect, it } from 'vitest'

import type { UrlStateAdapter } from './types'
import { createMemoryUrlStateAdapter } from '../adapters/memory-adapter'
import { createQueryParam } from './create-query-param'
import { parseAsInteger } from '../parsers/integer'
import { parseAsString } from '../parsers/string'

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

describe('history options', () => {
  it('default history is replace', async () => {
    const calls: Array<'replace' | 'push' | undefined> = []
    let search = ''
    const adapter: UrlStateAdapter = {
      kind: 'test',
      getSearch: () => search,
      setSearch: (next, opts) => {
        search = next
        calls.push(opts?.history)
      },
      subscribe: () => () => {},
    }

    const page = createQueryParam('page', parseAsInteger.withDefault(1), {
      adapter,
    })
    page.set(2)
    await flush()
    expect(calls).toEqual(['replace'])
  })

  it('call-level push overrides create-level replace', async () => {
    const calls: Array<'replace' | 'push' | undefined> = []
    let search = ''
    const adapter: UrlStateAdapter = {
      kind: 'test',
      getSearch: () => search,
      setSearch: (next, opts) => {
        search = next
        calls.push(opts?.history)
      },
      subscribe: () => () => {},
    }

    const page = createQueryParam('page', parseAsInteger.withDefault(1), {
      adapter,
      history: 'replace',
    })
    page.set(2, { history: 'push' })
    await flush()
    expect(calls).toEqual(['push'])
  })
})

describe('clearOnDefault', () => {
  it('default: true removes default value from URL', async () => {
    const adapter = createMemoryUrlStateAdapter('')
    const page = createQueryParam('page', parseAsInteger.withDefault(1), {
      adapter,
      clearOnDefault: true,
    })
    page.set(1)
    await flush()
    expect(adapter.getSearch()).toBe('')
  })

  it('clearOnDefault: false keeps default value in URL', async () => {
    const adapter = createMemoryUrlStateAdapter('')
    const page = createQueryParam('page', parseAsInteger.withDefault(1), {
      adapter,
      clearOnDefault: false,
    })
    page.set(1)
    await flush()
    expect(adapter.getSearch()).toBe('?page=1')
  })
})
