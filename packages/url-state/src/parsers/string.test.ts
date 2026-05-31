import { describe, expect, it } from 'vitest'

import { parseAsString } from './string'

describe('parseAsString', () => {
  it('parse: string -> string', () => {
    expect(parseAsString.parse('hello')).toBe('hello')
  })

  it('parse: null -> null', () => {
    expect(parseAsString.parse(null)).toBeNull()
  })

  it('serialize: string -> string', () => {
    expect(parseAsString.serialize('hello')).toBe('hello')
  })
})
