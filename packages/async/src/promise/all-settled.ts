import type { AsyncOptions } from './async-options'
import { withAbortSignal } from './with-abort-signal'

/** `Promise.allSettled` with optional cooperative `signal` cancellation. */
export const allSettled = <T extends readonly unknown[] | []>(
  values: T,
  options?: AsyncOptions,
): Promise<{ -readonly [P in keyof T]: PromiseSettledResult<Awaited<T[P]>> }> =>
  withAbortSignal(() => Promise.allSettled(values), options) as Promise<{
    -readonly [P in keyof T]: PromiseSettledResult<Awaited<T[P]>>
  }>
