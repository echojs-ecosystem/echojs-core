import type { AsyncOptions } from './async-options'
import type { MaybePromise } from './maybe-promise'
import { throwIfAborted } from './throw-if-aborted'

/** Map `items` sequentially — each `fn` runs after the previous settles. */
export const mapSerial = async <T, R>(
  items: readonly T[],
  fn: (item: T, index: number, signal?: AbortSignal) => MaybePromise<R>,
  options?: AsyncOptions,
): Promise<R[]> => {
  const results: R[] = []
  for (let index = 0; index < items.length; index++) {
    throwIfAborted(options?.signal)
    results.push(await fn(items[index]!, index, options?.signal))
  }
  return results
}
