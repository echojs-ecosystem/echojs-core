import { describe, expect, it } from 'vitest'

import { createMemoryUrlStateAdapter } from '../adapters/memory-adapter'
import { createQueryParam } from './create-query-param'
import { createQueryParams } from './create-query-params'
import { parseAsInteger } from '../parsers/integer'
import { parseAsString } from '../parsers/string'

const flush = async (): Promise<void> => {
  await Promise.resolve()
  await Promise.resolve()
}

describe('adapter sync', () => {
  it('createQueryParam reacts to external setSearch', async () => {
    const adapter = createMemoryUrlStateAdapter('?page=1')
    const page = createQueryParam('page', parseAsInteger.withDefault(1), {
      adapter,
    })

    adapter.setSearch('?page=5')
    await flush()
    expect(page.value()).toBe(5)
  })

  it('createQueryParams reacts to external setSearch', async () => {
    const adapter = createMemoryUrlStateAdapter('?q=a&page=1')
    const filters = createQueryParams(
      {
        q: parseAsString.withDefault(''),
        page: parseAsInteger.withDefault(1),
      },
      { adapter }
    )

    adapter.setSearch('?q=bike&page=3')
    await flush()
    expect(filters.value()).toEqual({ q: 'bike', page: 3 })
  })

  it('memory adapter skips notify when search unchanged', () => {
    const adapter = createMemoryUrlStateAdapter('?page=1')
    const calls: string[] = []
    adapter.subscribe(() => calls.push(adapter.getSearch()))

    adapter.setSearch('?page=1')
    expect(calls).toEqual([])
  })
})
