import type { AsyncOptions } from './async-options'
import { withAbortSignal } from './with-abort-signal'

/** `Promise.race` with optional cooperative `signal` cancellation. */
export const race = <T extends readonly unknown[] | []>(
  values: T,
  options?: AsyncOptions,
): Promise<Awaited<T[number]>> =>
  withAbortSignal(() => Promise.race(values), options) as Promise<Awaited<T[number]>>
