import type { Pattern, TypePattern, WhenPattern, Wildcard } from './types'

type Primitive = string | number | boolean | bigint | symbol | null | undefined

type InvertTypePattern<p extends TypePattern, i> = p['__pattern'] extends 'string'
  ? Extract<i, string>
  : p['__pattern'] extends 'number'
    ? Extract<i, number>
    : p['__pattern'] extends 'boolean'
      ? Extract<i, boolean>
      : p['__pattern'] extends 'bigint'
        ? Extract<i, bigint>
        : p['__pattern'] extends 'symbol'
          ? Extract<i, symbol>
          : p['__pattern'] extends 'null'
            ? Extract<i, null>
            : p['__pattern'] extends 'undefined'
              ? Extract<i, undefined>
              : p['__pattern'] extends 'nullish'
                ? Extract<i, null | undefined>
                : never

type InvertArrayPattern<p extends readonly unknown[], i> = i extends readonly (infer item)[]
  ? p extends readonly [infer head, ...infer tail]
    ? readonly [
        InvertPattern<head, item>,
        ...InvertArrayPattern<tail, i extends readonly [...infer _, ...infer rest] ? rest : item[]>,
      ]
    : p extends readonly []
      ? readonly []
      : never
  : never

/** Maps a pattern to the narrowed value type — same idea as ts-pattern `InvertPattern`. */
export type InvertPattern<p, i> = p extends Wildcard
  ? i
  : p extends WhenPattern<infer _input, infer narrowed>
    ? narrowed
    : p extends TypePattern
      ? InvertTypePattern<p, i>
      : p extends (value: infer input) => boolean
          ? input
          : p extends readonly unknown[]
            ? InvertArrayPattern<p, i>
            : p extends Primitive
              ? Extract<i, p>
              : p extends object
                ? [Extract<i, p>] extends [never]
                  ? DistributeStructPattern<p, i>
                  : Extract<i, p>
                : never

/** Partial struct patterns on unions — distribute like ts-pattern. */
type DistributeStructPattern<p, i> = i extends infer member
  ? keyof p & keyof member extends never
    ? never
    : {
        readonly [K in keyof p & keyof member]: InvertPattern<p[K], member[K]>
      }
  : never
