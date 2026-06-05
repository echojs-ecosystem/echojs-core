import { describe, expect, it } from 'vitest'

import { safeSerialize } from './serialize'

describe('safeSerialize', () => {
  it('serializes primitives', () => {
    expect(safeSerialize(null)).toBe(null)
    expect(safeSerialize('hello')).toBe('hello')
    expect(safeSerialize(42)).toBe(42)
  })

  it('handles bigint and symbol', () => {
    expect(safeSerialize(10n)).toBe('10n')
    expect(safeSerialize(Symbol('tag'))).toBe('Symbol(tag)')
  })

  it('handles functions', () => {
    function named() {}
    expect(safeSerialize(named)).toBe('[Function named]')
    expect(safeSerialize(() => {})).toBe('[Function anonymous]')
  })

  it('handles circular references', () => {
    const obj: Record<string, unknown> = { a: 1 }
    obj.self = obj
    expect(safeSerialize(obj)).toEqual({ a: 1, self: '[Circular]' })
  })

  it('handles nested objects and arrays', () => {
    expect(safeSerialize({ items: [1, { b: 2 }] })).toEqual({ items: [1, { b: 2 }] })
  })
})
