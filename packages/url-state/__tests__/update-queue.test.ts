import { describe, expect, it } from 'vitest'

import type { UrlStateAdapter } from '@echojs/url-state'
import {
  createQueryParam,
  createQueryParams,
  parseAsInteger,
  parseAsString,
} from '@echojs/url-state'

const flush = async (): Promise<void> => {
  await Promise.resolve()
  await Promise.resolve()
}

describe('update queue', () => {
  it('merges multiple writes in one microtask into one setSearch', async () => {
    let search = ''
    let calls = 0
    const adapter: UrlStateAdapter = {
      kind: 'test',
      getSearch: () => search,
      setSearch: (next) => {
        search = next
        calls += 1
      },
      subscribe: () => () => {},
    }

    const a = createQueryParam('a', parseAsString.withDefault(''), { adapter })
    const b = createQueryParam('b', parseAsString.withDefault(''), { adapter })

    a.set('1')
    b.set('2')
    await flush()

    expect(calls).toBe(1)
    expect(search).toBe('?a=1&b=2')
  })

  it('push wins when merging history options in one tick', async () => {
    const histories: Array<'push' | 'replace' | undefined> = []
    let search = ''
    const adapter: UrlStateAdapter = {
      kind: 'test',
      getSearch: () => search,
      setSearch: (next, opts) => {
        search = next
        histories.push(opts?.history)
      },
      subscribe: () => () => {},
    }

    const filters = createQueryParams(
      { q: parseAsString.withDefault(''), page: parseAsInteger.withDefault(1) },
      { adapter, history: 'replace' }
    )

    filters.set({ q: 'a' }, { history: 'replace' })
    filters.set({ page: 2 }, { history: 'push' })
    await flush()

    expect(histories).toEqual(['push'])
  })
})
