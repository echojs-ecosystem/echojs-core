import { describe, expect, it } from 'vitest'

import {
  exactKeyMatch,
  hashKey,
  matchesQueryFilter,
  normalizeQueryKey,
  partialMatchKey,
  stableHash,
} from './hash'

describe('hash', () => {
  it('stableHash ignores object key order', () => {
    const a = stableHash(['users', { page: 1, q: 'x' }])
    const b = stableHash(['users', { q: 'x', page: 1 }])
    expect(a).toBe(b)
  })

  it('hashKey ignores object key order', () => {
    const a = hashKey(['users', { page: 1, q: 'x' }])
    const b = hashKey(['users', { q: 'x', page: 1 }])
    expect(a).toBe(b)
  })

  it('normalizeQueryKey returns key as-is', () => {
    expect(normalizeQueryKey([{ b: 1, a: 2 }])).toEqual([{ b: 1, a: 2 }])
  })

  it('partialMatchKey matches prefixes', () => {
    expect(partialMatchKey(['users', { page: 1 }], ['users'])).toBe(true)
    expect(partialMatchKey(['user', '1'], ['users'])).toBe(false)
  })

  it('exactKeyMatch requires equal length', () => {
    expect(exactKeyMatch(['users'], ['users'])).toBe(true)
    expect(exactKeyMatch(['users', { page: 1 }], ['users'])).toBe(false)
  })

  it('matchesQueryFilter array and object forms', () => {
    expect(matchesQueryFilter(['users', 1], [])).toBe(true)
    expect(matchesQueryFilter(['users', 1], ['users'])).toBe(true)
    expect(matchesQueryFilter(['users', 1], { queryKey: ['users', 1], exact: true })).toBe(
      true,
    )
    expect(matchesQueryFilter(['user'], ['users'])).toBe(false)
  })
})
