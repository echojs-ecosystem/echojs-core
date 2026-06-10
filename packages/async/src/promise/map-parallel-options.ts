import type { AsyncOptions } from './async-options'

export type MapParallelOptions = AsyncOptions & {
  /** Max in-flight tasks. Default: all at once (`items.length`). */
  concurrency?: number
}
