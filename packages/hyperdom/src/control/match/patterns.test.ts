import { describe, expect, it } from 'vitest'

import { isMatching, matches, P } from './patterns'

type Status =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: string }
  | { status: 'error'; error: Error }

describe('matches — primitives', () => {
  it('matches literals with Object.is', () => {
    expect(matches('idle', 'idle')).toBe(true)
    expect(matches('idle', 'loading')).toBe(false)
    expect(matches(0, 0)).toBe(true)
    expect(matches(0, false)).toBe(false)
  })

  it('matches NaN only with Object.is', () => {
    expect(matches(Number.NaN, Number.NaN)).toBe(true)
    expect(matches(0, Number.NaN)).toBe(false)
  })
})

describe('matches — struct patterns', () => {
  it('matches partial object shapes on unions', () => {
    expect(matches({ status: 'loading' }, { status: 'loading' } satisfies Status)).toBe(true)
    expect(matches({ status: 'loading' }, { status: 'loading', extra: 1 } as Status)).toBe(true)
    expect(matches({ status: 'success' }, { status: 'success', data: 'ok' } satisfies Status)).toBe(
      true,
    )
    expect(matches({ status: 'success' }, { status: 'idle' } satisfies Status)).toBe(false)
  })

  it('matches nested struct patterns', () => {
    expect(
      matches(
        { user: { name: 'Ada' } },
        { user: { name: 'Ada', age: 36 }, id: 1 },
      ),
    ).toBe(true)
    expect(matches({ user: { name: 'Ada' } }, { user: { name: 'Bob' } })).toBe(false)
  })

  it('rejects struct patterns for non-objects', () => {
    expect(matches({ status: 'idle' }, 'idle')).toBe(false)
    expect(matches({ length: 1 }, [1, 2])).toBe(false)
  })
})

describe('matches — tuples', () => {
  it('matches array patterns element-wise', () => {
    expect(matches(['a', P.number], ['a', 1])).toBe(true)
    expect(matches(['a', P.number], ['a', 'b'])).toBe(false)
    expect(matches([P._, P._], [1, 2, 3])).toBe(false)
  })
})

describe('matches — wildcards and type patterns', () => {
  it('P._ matches anything', () => {
    expect(matches(P._, null)).toBe(true)
    expect(matches(P._, { nested: { x: 1 } })).toBe(true)
  })

  it('matches runtime type patterns', () => {
    expect(matches(P.string, 'hello')).toBe(true)
    expect(matches(P.number, 42)).toBe(true)
    expect(matches(P.boolean, true)).toBe(true)
    expect(matches(P.string, 1)).toBe(false)
    expect(matches(P.number, '1')).toBe(false)
  })

  it('matches nullish', () => {
    expect(matches(P.nullish, null)).toBe(true)
    expect(matches(P.nullish, undefined)).toBe(true)
    expect(matches(P.nullish, 0)).toBe(false)
  })
})

describe('matches — predicates', () => {
  it('supports inline predicate functions', () => {
    expect(matches((n: number) => n > 0, 3)).toBe(true)
    expect(matches((n: number) => n > 0, 0)).toBe(false)
  })

  it('supports P.when guards', () => {
    const isError = P.when<Status>((s) => s.status === 'error')
    expect(matches(isError, { status: 'error', error: new Error('x') } satisfies Status)).toBe(
      true,
    )
    expect(matches(isError, { status: 'idle' } satisfies Status)).toBe(false)
  })
})

describe('isMatching', () => {
  it('is an alias for matches', () => {
    expect(isMatching(P.string, 'x')).toBe(true)
    expect(isMatching(P.string, 1)).toBe(false)
  })
})
