import type { AsyncOptions } from './async-options'
import { withAbortSignal } from './with-abort-signal'

/** `Promise.all` with optional cooperative `signal` cancellation. */
export const all = <T extends readonly unknown[] | []>(
  values: T,
  options?: AsyncOptions,
): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }> =>
  withAbortSignal(() => Promise.all(values), options) as Promise<{
    -readonly [P in keyof T]: Awaited<T[P]>
  }>
