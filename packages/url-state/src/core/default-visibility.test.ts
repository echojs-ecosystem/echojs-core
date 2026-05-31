import { describe, expect, it } from 'vitest'

import { createMemoryUrlStateAdapter } from '../adapters/memory-adapter'
import { createCustomParser } from './custom-parser'
import { createQueryParam } from './create-query-param'
import { createQueryParams } from './create-query-params'
import {
  resolveDefaultVisibility,
  shouldHideDefaultInUrl,
} from './default-visibility'
import { parseAsBoolean } from '../parsers/boolean'
import { parseAsInteger } from '../parsers/integer'
import { parseAsLiteral } from '../parsers/literal'
import { parseAsString } from '../parsers/string'

const flush = async (): Promise<void> => {
  await Promise.resolve()
  await Promise.resolve()
}

describe('defaultVisibility', () => {
  it('"hide" omits defaults from URL', async () => {
    const adapter = createMemoryUrlStateAdapter('')
    const page = createQueryParam('page', parseAsInteger.withDefault(1), {
      adapter,
      defaultVisibility: 'hide',
    })
    page.set(1)
    await flush()
    expect(adapter.getSearch()).toBe('')
  })

  it('"show" keeps defaults in URL', async () => {
    const adapter = createMemoryUrlStateAdapter('')
    const page = createQueryParam('page', parseAsInteger.withDefault(1), {
      adapter,
      defaultVisibility: 'show',
    })
    page.set(1)
    await flush()
    expect(adapter.getSearch()).toBe('?page=1')
  })

  it('createQueryParams "show" writes defaults to URL on init', async () => {
    const adapter = createMemoryUrlStateAdapter('')
    createQueryParams(
      { page: parseAsInteger.withDefault(1) },
      { adapter, defaultVisibility: 'show' }
    )
    await flush()
    expect(adapter.getSearch()).toBe('?page=1')
  })

  it('createQueryParams "show" serializes defaults (products-like schema)', async () => {
    const adapter = createMemoryUrlStateAdapter('')
    const filters = createQueryParams(
      {
        q: parseAsString.withDefault(''),
        page: parseAsInteger.withDefault(1),
        inStock: parseAsBoolean.withDefault(false),
        sort: parseAsLiteral(['relevance', 'name'] as const).withDefault(
          'relevance'
        ),
      },
      { adapter, defaultVisibility: 'show', urlKeys: { inStock: 'stock' } }
    )

    filters.set({ q: '', page: 1, inStock: false, sort: 'relevance' })
    await flush()
    expect(adapter.getSearch()).toContain('page=1')
    expect(adapter.getSearch()).toContain('stock=false')
    expect(adapter.getSearch()).toContain('sort=relevance')
  })

  it('applies to createQueryParams group', async () => {
    const adapter = createMemoryUrlStateAdapter('')
    const filters = createQueryParams(
      {
        page: parseAsInteger.withDefault(1),
        size: parseAsInteger.withDefault(10),
      },
      { adapter, defaultVisibility: 'hide' }
    )
    filters.set({ page: 1, size: 10 })
    await flush()
    expect(adapter.getSearch()).toBe('')
  })
})

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
