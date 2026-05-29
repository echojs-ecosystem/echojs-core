import { describe, expect, it } from 'vitest'

import type { StandardSchemaLike } from '@echojs/url-state'

import { validateJsonSchema } from '../src/core/standard-schema'

describe('validateJsonSchema', () => {
  it('returns value as-is when schema is omitted', () => {
    expect(validateJsonSchema(undefined, { ok: true })).toEqual({ ok: true })
  })

  it('uses sync validator function', () => {
    const schema = (value: unknown): number | null =>
      typeof value === 'number' ? value : null
    expect(validateJsonSchema(schema, 42)).toBe(42)
    expect(validateJsonSchema(schema, 'nope')).toBeNull()
  })

  it('validator throw -> null', () => {
    const schema = () => {
      throw new Error('bad')
    }
    expect(validateJsonSchema(schema, 1)).toBeNull()
  })

  it('Standard Schema success and failure', () => {
    const schema: StandardSchemaLike<{ id: string }> = {
      '~standard': {
        version: 1,
        vendor: 'test',
        validate(value) {
          if (
            typeof value === 'object' &&
            value !== null &&
            'id' in value &&
            typeof (value as { id: unknown }).id === 'string'
          ) {
            return { value: value as { id: string } }
          }
          return { issues: [{ message: 'invalid' }] }
        },
      },
    }
    expect(validateJsonSchema(schema, { id: 'a' })).toEqual({ id: 'a' })
    expect(validateJsonSchema(schema, { id: 1 })).toBeNull()
  })
})
