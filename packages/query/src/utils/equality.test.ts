import { describe, expect, it } from 'vitest'

import { deepEqual } from './equality'

describe('deepEqual', () => {
  it('compares primitives with Object.is', () => {
    expect(deepEqual(1, 1)).toBe(true)
    expect(deepEqual(NaN, NaN)).toBe(true)
    expect(deepEqual(1, 2)).toBe(false)
  })

  it('compares arrays deeply', () => {
    expect(deepEqual([1, { a: 1 }], [1, { a: 1 }])).toBe(true)
    expect(deepEqual([1], [1, 2])).toBe(false)
  })

  it('compares plain objects with sorted keys', () => {
    expect(deepEqual({ b: 1, a: 2 }, { a: 2, b: 1 })).toBe(true)
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false)
  })

  it('returns false for null mismatch', () => {
    expect(deepEqual(null, {})).toBe(false)
  })
})
