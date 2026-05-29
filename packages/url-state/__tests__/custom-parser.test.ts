import { describe, expect, it } from 'vitest'

import { createCustomParser, createCustomMultiParser } from '@echojs/url-state'

describe('createCustomParser', () => {
  it('supports custom serialize/parse', () => {
    const stars = createCustomParser({
      parse(value) {
        const raw = Array.isArray(value) ? value[0] : value
        if (!raw) return null
        return raw.split('★').length - 1
      },
      serialize(value) {
        return '★'.repeat(value)
      },
    })

    expect(stars.parse('★★★')).toBe(3)
    expect(stars.serialize(2)).toBe('★★')
  })

  it('uses eq for default visibility', () => {
    const sort = createCustomParser({
      parse(value) {
        const raw = Array.isArray(value) ? value[0] : value
        if (!raw) return null
        const [id = '', dir = 'asc'] = raw.split(':')
        return { id, desc: dir === 'desc' }
      },
      serialize(value) {
        return `${value.id}:${value.desc ? 'desc' : 'asc'}`
      },
      eq(a, b) {
        return a.id === b.id && a.desc === b.desc
      },
    }).withDefault({ id: '', desc: false })

    expect(sort.eq?.({ id: 'foo', desc: false }, sort.defaultValue)).toBe(false)
    expect(sort.eq?.({ id: '', desc: false }, sort.defaultValue)).toBe(true)
  })
})

describe('createCustomMultiParser', () => {
  it('parse/serialize multiple values', () => {
    const ids = createCustomMultiParser({
      parse: (values) => values.map((v) => Number.parseInt(v, 10)),
      serialize: (values) => values.map(String),
    })

    expect(ids.parse(['1', '2'])).toEqual([1, 2])
    expect(ids.serialize([3, 4])).toEqual(['3', '4'])
  })

  it('withDefault on multi parser', () => {
    const ids = createCustomMultiParser({
      parse: (values) => values,
      serialize: (values) => values,
    }).withDefault(['x'])

    expect(ids.defaultValue).toEqual(['x'])
  })

  it('withOptions on multi parser', () => {
    const ids = createCustomMultiParser({
      parse: (values) => values,
      serialize: (values) => values,
    }).withOptions({ history: 'push' })

    expect(ids.options?.history).toBe('push')
  })
})
