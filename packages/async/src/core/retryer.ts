import { CancelledError, isAbortError, isCancelledError } from './cancelled-error'
import { sleep } from '../utils/sleep'

export type RetryValue = boolean | number | ((failureCount: number, error: unknown) => boolean)
export type RetryDelayValue = number | ((failureCount: number, error: unknown) => number)

export type RetryerConfig<TData> = {
  fn: () => TData | Promise<TData>
  initialPromise?: Promise<TData>
  onCancel?: (error: CancelledError) => void
  onFail?: (failureCount: number, error: unknown) => void
  retry?: RetryValue
  retryDelay?: RetryDelayValue
}

const defaultRetryDelay = (failureCount: number): number =>
  Math.min(1000 * 2 ** failureCount, 30_000)

const shouldRetry = (
  failureCount: number,
  error: unknown,
  retry: RetryValue | undefined,
): boolean => {
  if (retry === false || retry === undefined) return false
  if (typeof retry === 'number') return failureCount < retry
  if (retry === true) return true
  return retry(failureCount, error)
}

const getRetryDelay = (
  failureCount: number,
  error: unknown,
  retryDelay: RetryDelayValue | undefined,
): number => {
  if (typeof retryDelay === 'function') return retryDelay(failureCount, error)
  if (typeof retryDelay === 'number') return retryDelay
  return defaultRetryDelay(failureCount)
}

export type Retryer<TData> = {
  promise: Promise<TData>
  cancel: (options?: { silent?: boolean }) => void
  start: () => Promise<TData>
}

/** Adapted from TanStack Query createRetryer. */
export const createRetryer = <TData>(config: RetryerConfig<TData>): Retryer<TData> => {
  let failureCount = 0
  let rejectFn!: (error: unknown) => void
  let resolveFn!: (value: TData) => void
  let settled = false

  const promise = new Promise<TData>((resolve, reject) => {
    resolveFn = resolve
    rejectFn = reject
  })

  const cancel = (options?: { silent?: boolean }): void => {
    if (settled) return
    const error = new CancelledError({ silent: options?.silent })
    config.onCancel?.(error)
    settled = true
    rejectFn(error)
  }

  const run = (): void => {
    if (settled) return

    const initialPromise = failureCount === 0 ? config.initialPromise : undefined

    Promise.resolve(initialPromise ?? config.fn())
      .then((value) => {
        if (settled) return
        settled = true
        resolveFn(value)
      })
      .catch(async (error) => {
        if (settled) return

        if (isCancelledError(error) || isAbortError(error)) {
          settled = true
          rejectFn(error)
          return
        }

        if (shouldRetry(failureCount, error, config.retry)) {
          failureCount += 1
          config.onFail?.(failureCount, error)
          await sleep(getRetryDelay(failureCount, error, config.retryDelay))
          if (!settled) run()
          return
        }

        settled = true
        rejectFn(error)
      })
  }

  return {
    promise,
    cancel,
    start: () => {
      run()
      return promise
    },
  }
}
