import { describe, expect, it } from 'vitest'

import { hashKey } from './hash'
import { matchQuery } from './match-query'
import type { QueryLike } from './match-query'

const mockQuery = (overrides: Partial<QueryLike> & Pick<QueryLike, 'queryKey'>): QueryLike => ({
  queryHash: overrides.queryHash ?? JSON.stringify(overrides.queryKey),
  isStale: () => overrides.isStale?.() ?? false,
  isActive: () => overrides.isActive?.() ?? true,
  state: overrides.state ?? { status: 'success', fetchStatus: 'idle' },
  ...overrides,
})

describe('matchQuery', () => {
  it('matches by partial queryKey', () => {
    const query = mockQuery({ queryKey: ['users', { page: 1 }] })
    expect(matchQuery({ queryKey: ['users'] }, query)).toBe(true)
    expect(matchQuery({ queryKey: ['user'] }, query)).toBe(false)
  })

  it('matches exact queryKey hash', () => {
    const queryKey = ['users'] as const
    const query = mockQuery({
      queryKey: [...queryKey],
      queryHash: hashKey(queryKey),
    })
    expect(matchQuery({ queryKey: [...queryKey], exact: true }, query)).toBe(true)
    expect(
      matchQuery({ queryKey: [...queryKey], exact: true }, { ...query, queryHash: 'other' }),
    ).toBe(false)
  })

  it('filters by stale and fetchStatus', () => {
    const stale = mockQuery({
      queryKey: ['a'],
      isStale: () => true,
      state: { status: 'success', fetchStatus: 'fetching' },
    })
    expect(matchQuery({ stale: true }, stale)).toBe(true)
    expect(matchQuery({ stale: false }, stale)).toBe(false)
    expect(matchQuery({ fetchStatus: 'fetching' }, stale)).toBe(true)
    expect(matchQuery({ fetchStatus: 'idle' }, stale)).toBe(false)
  })

  it('uses predicate', () => {
    const query = mockQuery({ queryKey: ['x'], isActive: () => false })
    expect(matchQuery({ predicate: (q) => q.isActive() }, query)).toBe(false)
    expect(matchQuery({ predicate: (q) => q.queryKey[0] === 'x' }, query)).toBe(true)
  })
})
