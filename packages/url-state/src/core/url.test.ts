import { describe, expect, it } from 'vitest'

import {
  getSearchParam,
  normalizeSearch,
  parseSearch,
  removeSearchParam,
  setSearchParam,
  stringifySearch,
} from './url'

describe('url helpers', () => {
  it('normalizeSearch', () => {
    expect(normalizeSearch('')).toBe('')
    expect(normalizeSearch('?')).toBe('')
    expect(normalizeSearch('page=1')).toBe('?page=1')
    expect(normalizeSearch('?page=1')).toBe('?page=1')
  })

  it('getSearchParam: missing -> null', () => {
    expect(getSearchParam('', 'q')).toBeNull()
  })

  it('getSearchParam: single value -> string', () => {
    expect(getSearchParam('?q=hello', 'q')).toBe('hello')
  })

  it('getSearchParam: repeated keys -> array', () => {
    expect(getSearchParam('?tag=a&tag=b', 'tag')).toEqual(['a', 'b'])
  })

  it('setSearchParam: set, append array, remove', () => {
    expect(setSearchParam('', 'page', '1')).toBe('?page=1')
    expect(setSearchParam('?page=1', 'q', 'x')).toBe('?page=1&q=x')
    expect(setSearchParam('?tag=a', 'tag', ['b', 'c'])).toBe('?tag=b&tag=c')
    expect(setSearchParam('?page=1&q=x', 'q', null)).toBe('?page=1')
  })

  it('removeSearchParam', () => {
    expect(removeSearchParam('?a=1&b=2', 'a')).toBe('?b=2')
  })

  it('stringifySearch sorts keys for stable output', () => {
    const params = parseSearch('?z=1&a=2&a=3')
    expect(stringifySearch(params)).toBe('?a=2&a=3&z=1')
  })
})
