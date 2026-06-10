import type { Child } from '../../types'

export type Wildcard = typeof wildcardToken

type Primitive = string | number | boolean | bigint | symbol | null | undefined

/** Partial object / tuple shape — `{ status: 'loading' }` matches any value with that field. */
export type StructPattern<T> = T extends readonly (infer Item)[]
  ? readonly Pattern<Item>[]
  : T extends object
    ? { readonly [K in keyof T]?: Pattern<T[K]> }
    : never

/** Pattern accepted by {@link MatchBuilder.When}. */
export type Pattern<T = unknown> =
  | (T extends Primitive ? T : never)
  | StructPattern<T>
  | Wildcard
  | WhenPattern<T>
  | TypePattern
  | ((value: T) => boolean)

export type WhenPattern<T = unknown, Narrowed = T> = {
  readonly __pattern: 'when'
  readonly predicate: (value: T) => boolean
  /** Phantom — carries predicate narrowing to {@link InvertPattern}. */
  readonly __narrowed?: Narrowed
}

export type TypePattern = {
  readonly __pattern:
    | 'string'
    | 'number'
    | 'boolean'
    | 'bigint'
    | 'symbol'
    | 'null'
    | 'undefined'
    | 'nullish'
}

export type WhenCase<T> = {
  readonly tag: 'when'
  readonly pattern: Pattern<unknown>
  readonly render: (value: T) => Child
}

export type OtherwiseCase = {
  readonly tag: 'otherwise'
  readonly render: () => Child
}

export type MatchCase<T> = WhenCase<T> | OtherwiseCase

/** @internal */
export const wildcardToken = Symbol('hyperdom.match.wildcard')
