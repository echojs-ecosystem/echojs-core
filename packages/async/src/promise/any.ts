import type { AsyncOptions } from './async-options'
import { withAbortSignal } from './with-abort-signal'

/** `Promise.any` with optional cooperative `signal` cancellation. */
export const any = <T extends readonly unknown[] | []>(
  values: T,
  options?: AsyncOptions,
): Promise<Awaited<T[number]>> =>
  withAbortSignal(() => Promise.any(values), options) as Promise<Awaited<T[number]>>
