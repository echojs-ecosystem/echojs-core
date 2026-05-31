import { describe, expect, it } from 'vitest'

import { createQueryParams } from '../core/create-query-params'
import type { StandardSchemaLike } from '../core/standard-schema'
import { createMemoryUrlStateAdapter } from '../adapters/memory-adapter'
import { parseAsJson } from './json'

describe('parseAsJson', () => {
  it('parse: valid json', () => {
    const p = parseAsJson<{ id: number }>()
    expect(p.parse('{"id":1}')).toEqual({ id: 1 })
  })

  it('parse: invalid json -> null', () => {
    const p = parseAsJson()
    expect(p.parse('{')).toBeNull()
  })

  it('serialize', () => {
    const p = parseAsJson<{ id: number }>()
    expect(p.serialize({ id: 1 })).toBe('{"id":1}')
  })

  it('validates with Standard Schema', () => {
    type Pkg = { pkg: string; version: number }
    const schema: StandardSchemaLike<Pkg> = {
      '~standard': {
        version: 1,
        vendor: 'test',
        validate(value) {
          if (
            typeof value === 'object' &&
            value !== null &&
            'pkg' in value &&
            typeof (value as Pkg).pkg === 'string' &&
            'version' in value &&
            typeof (value as Pkg).version === 'number'
          ) {
            return { value: value as Pkg }
          }
          return { issues: [{ message: 'invalid' }] }
        },
      },
    }
    const p = parseAsJson<Pkg>(schema)

    expect(p.parse('{"pkg":"echojs","version":2}')).toEqual({
      pkg: 'echojs',
      version: 2,
    })
    expect(p.parse('{"pkg":"x"}')).toBeNull()
  })

  it('validates with custom function', () => {
    const p = parseAsJson<number>((value) =>
      typeof value === 'number' ? value : null
    )
    expect(p.parse('42')).toBe(42)
    expect(p.parse('"nope"')).toBeNull()
  })

  it('works in createQueryParams', async () => {
    const adapter = createMemoryUrlStateAdapter('?meta={"n":1}')
    const state = createQueryParams(
      { meta: parseAsJson<{ n: number }>() },
      { adapter }
    )
    expect(state.value().meta).toEqual({ n: 1 })

    state.set({ meta: { n: 2 } })
    await Promise.resolve()
    await Promise.resolve()
    expect(adapter.getSearch()).toBe('?meta=%7B%22n%22%3A2%7D')
  })
})
