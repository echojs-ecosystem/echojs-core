import { describe, expect, it } from 'vitest'

import { parseTime } from './time'

describe('parseTime', () => {
  it('parses duration strings', () => {
    expect(parseTime('5s')).toBe(5000)
    expect(parseTime('1m')).toBe(60_000)
    expect(parseTime('Infinity')).toBe(Number.POSITIVE_INFINITY)
  })

  it('returns numbers as-is', () => {
    expect(parseTime(100)).toBe(100)
  })

  it('throws on invalid string', () => {
    expect(() => parseTime('invalid')).toThrow(/Invalid time/)
  })
})
