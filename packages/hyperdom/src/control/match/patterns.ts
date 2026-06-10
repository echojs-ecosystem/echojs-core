import type { Pattern, TypePattern, WhenPattern, Wildcard } from './types'
import { wildcardToken } from './types'

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isWhenPattern = <T>(pattern: unknown): pattern is WhenPattern<T> =>
  isPlainObject(pattern) && pattern.__pattern === 'when'

const isTypePattern = (pattern: unknown): pattern is TypePattern =>
  isPlainObject(pattern) &&
  typeof pattern.__pattern === 'string' &&
  pattern.__pattern !== 'when'

const isWildcard = (pattern: unknown): pattern is Wildcard => pattern === wildcardToken

const matchTypePattern = (pattern: TypePattern, value: unknown): boolean => {
  switch (pattern.__pattern) {
    case 'string':
      return typeof value === 'string'
    case 'number':
      return typeof value === 'number'
    case 'boolean':
      return typeof value === 'boolean'
    case 'bigint':
      return typeof value === 'bigint'
    case 'symbol':
      return typeof value === 'symbol'
    case 'null':
      return value === null
    case 'undefined':
      return value === undefined
    case 'nullish':
      return value == null
    default:
      return false
  }
}

const matchStructural = (pattern: Record<string, unknown>, value: unknown): boolean => {
  if (!isPlainObject(value)) return false
  for (const key of Object.keys(pattern)) {
    if (!matches(pattern[key] as Pattern, value[key])) return false
  }
  return true
}

/** Returns whether `value` satisfies `pattern`. */
export const matches = (pattern: Pattern<unknown>, value: unknown): boolean => {
  if (isWildcard(pattern)) return true
  if (isWhenPattern(pattern)) return pattern.predicate(value)
  if (isTypePattern(pattern)) return matchTypePattern(pattern, value)
  if (typeof pattern === 'function' && !isWhenPattern(pattern)) {
    return (pattern as (value: unknown) => boolean)(value)
  }

  if (Array.isArray(pattern)) {
    if (!Array.isArray(value) || pattern.length !== value.length) return false
    return pattern.every((item, index) => matches(item as Pattern, value[index]))
  }

  if (isPlainObject(pattern)) return matchStructural(pattern, value)

  return Object.is(pattern, value)
}

/** Alias for {@link matches} — ts-pattern-style naming. */
export const isMatching = matches

export function when<T, Narrowed extends T>(
  predicate: (value: T) => value is Narrowed,
): WhenPattern<T, Narrowed>
export function when<T>(predicate: (value: T) => boolean): WhenPattern<T, T>
export function when(predicate: (value: unknown) => boolean): WhenPattern<unknown, unknown> {
  return {
    __pattern: 'when',
    predicate,
  }
}

/** Wildcards and guards inspired by [ts-pattern](https://github.com/gvergnaud/ts-pattern). */
export const P = {
  _: wildcardToken,
  when,

  string: { __pattern: 'string' } as const,
  number: { __pattern: 'number' } as const,
  boolean: { __pattern: 'boolean' } as const,
  bigint: { __pattern: 'bigint' } as const,
  symbol: { __pattern: 'symbol' } as const,
  nullish: { __pattern: 'nullish' } as const,
} as const
