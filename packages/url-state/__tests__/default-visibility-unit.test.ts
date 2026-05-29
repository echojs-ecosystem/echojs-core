import { describe, expect, it } from 'vitest'

import { createCustomParser } from '@echojs/url-state'
import { parseAsInteger } from '@echojs/url-state'

import {
  resolveDefaultVisibility,
  shouldHideDefaultInUrl,
} from '../src/core/default-visibility'

describe('default visibility helpers', () => {
  it('resolveDefaultVisibility prefers defaultVisibility over clearOnDefault', () => {
    expect(
      resolveDefaultVisibility({
        defaultVisibility: 'show',
        clearOnDefault: true,
      })
    ).toBe('show')
    expect(resolveDefaultVisibility({ clearOnDefault: false })).toBe('show')
    expect(resolveDefaultVisibility({ clearOnDefault: true })).toBe('hide')
    expect(resolveDefaultVisibility({})).toBe('hide')
  })

  it('resolveDefaultVisibility supports deprecated defaultParamsBehavior', () => {
    expect(resolveDefaultVisibility({ defaultParamsBehavior: 'show' })).toBe(
      'show'
    )
  })

  it('shouldHideDefaultInUrl hides when value equals default', () => {
    const parser = parseAsInteger.withDefault(1)
    expect(
      shouldHideDefaultInUrl(1, parser, { defaultVisibility: 'hide' })
    ).toBe(true)
    expect(
      shouldHideDefaultInUrl(2, parser, { defaultVisibility: 'hide' })
    ).toBe(false)
    expect(
      shouldHideDefaultInUrl(1, parser, { defaultVisibility: 'show' })
    ).toBe(false)
  })

  it('shouldHideDefaultInUrl uses parser.eq when provided', () => {
    const parser = createCustomParser({
      parse: (v) => {
        const raw = Array.isArray(v) ? v[0] : v
        if (!raw) return null
        return { x: Number(raw) }
      },
      serialize: (v) => String(v.x),
      eq: (a, b) => a.x === b.x,
    }).withDefault({ x: 0 })

    expect(
      shouldHideDefaultInUrl({ x: 0 }, parser, { defaultVisibility: 'hide' })
    ).toBe(true)
    expect(
      shouldHideDefaultInUrl({ x: 1 }, parser, { defaultVisibility: 'hide' })
    ).toBe(false)
  })

  it('shouldHideDefaultInUrl returns false without default on parser', () => {
    expect(
      shouldHideDefaultInUrl(1, parseAsInteger, { defaultVisibility: 'hide' })
    ).toBe(false)
  })
})
