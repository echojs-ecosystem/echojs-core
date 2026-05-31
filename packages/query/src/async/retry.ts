import { sleep } from '../utils/sleep'

export const defaultRetryDelay = (failureCount: number): number =>
  Math.min(1000 * 2 ** failureCount, 30_000)

export const shouldRetry = (
  failureCount: number,
  error: unknown,
  retry:
    | number
    | false
    | ((failureCount: number, error: unknown) => boolean)
    | undefined,
  isAborted: boolean,
): boolean => {
  if (isAborted) return false
  if (retry === false || retry === undefined) return false
  if (typeof retry === 'number') return failureCount < retry
  return retry(failureCount, error)
}

export const getRetryDelay = (
  failureCount: number,
  error: unknown,
  retryDelay: number | ((failureCount: number, error: unknown) => number) | undefined,
): number => {
  if (typeof retryDelay === 'function') return retryDelay(failureCount, error)
  if (typeof retryDelay === 'number') return retryDelay
  return defaultRetryDelay(failureCount)
}

export const waitForRetry = async (
  failureCount: number,
  error: unknown,
  retryDelay: number | ((failureCount: number, error: unknown) => number) | undefined,
  signal: AbortSignal,
): Promise<void> => {
  const delay = getRetryDelay(failureCount, error, retryDelay)
  if (delay <= 0) return

  await new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(signal.reason)
      return
    }

    const timer = setTimeout(resolve, delay)
    const onAbort = () => {
      clearTimeout(timer)
      reject(signal.reason ?? new Error('Aborted'))
    }
    signal.addEventListener('abort', onAbort, { once: true })
  }).catch(async (err) => {
    if (signal.aborted) throw err
    await sleep(0)
    throw err
  })
}
