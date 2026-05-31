import { describe, expect, it } from 'vitest'

import { createQueryParams } from '../core/create-query-params'
import { createMemoryUrlStateAdapter } from '../adapters/memory-adapter'
import { parseAsArrayOf } from './array'
import { parseAsInteger } from './integer'
import { parseAsString } from './string'

const flush = async (): Promise<void> => {
  await Promise.resolve()
  await Promise.resolve()
}

describe('parseAsArrayOf', () => {
  it('parse: repeated query keys -> array', () => {
    const tags = parseAsArrayOf(parseAsString)
    expect(tags.parse(['a', 'b'])).toEqual(['a', 'b'])
  })

  it('serialize: array -> string[]', () => {
    const tags = parseAsArrayOf(parseAsString)
    expect(tags.serialize(['a', 'b'])).toEqual(['a', 'b'])
  })

  it('parse/serialize with custom separator', () => {
    const ids = parseAsArrayOf(parseAsInteger, ';')
    expect(ids.parse(['1;2;3'])).toEqual([1, 2, 3])
    expect(ids.serialize([4, 5])).toEqual(['4;5'])
  })

  it('parse: invalid item -> null', () => {
    const ids = parseAsArrayOf(parseAsInteger)
    expect(ids.parse(['1', 'x'])).toBeNull()
  })

  it('eq compares array contents', () => {
    const tags = parseAsArrayOf(parseAsString).withDefault([])
    expect(tags.eq?.(['a'], ['a'])).toBe(true)
    expect(tags.eq?.(['a'], ['b'])).toBe(false)
  })

  it('separator mode in createQueryParams', async () => {
    const adapter = createMemoryUrlStateAdapter('?id=1;2')
    const state = createQueryParams(
      { id: parseAsArrayOf(parseAsInteger, ';').withDefault([]) },
      { adapter }
    )
    expect(state.value().id).toEqual([1, 2])

    state.set({ id: [3] })
    await flush()
    expect(adapter.getSearch()).toBe('?id=3')
  })
})
