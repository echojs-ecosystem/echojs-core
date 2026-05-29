import { describe, expect, it } from 'vitest'

import { parseAsBoolean } from '@echojs/url-state'

describe('parseAsBoolean', () => {
  it('parse: true/false', () => {
    expect(parseAsBoolean.parse('true')).toBe(true)
    expect(parseAsBoolean.parse('false')).toBe(false)
  })

  it('parse: 1/0', () => {
    expect(parseAsBoolean.parse('1')).toBe(true)
    expect(parseAsBoolean.parse('0')).toBe(false)
  })

  it('parse: invalid -> null', () => {
    expect(parseAsBoolean.parse('yes')).toBeNull()
  })

  it('serialize', () => {
    expect(parseAsBoolean.serialize(true)).toBe('true')
    expect(parseAsBoolean.serialize(false)).toBe('false')
  })
})
