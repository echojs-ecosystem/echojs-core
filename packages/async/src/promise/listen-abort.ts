/** Reject when `signal` aborts; returns cleanup. */
export const listenAbort = (
  signal: AbortSignal | undefined,
  onAbort: () => void,
): (() => void) => {
  if (!signal) return () => {}
  if (signal.aborted) {
    onAbort()
    return () => {}
  }
  signal.addEventListener('abort', onAbort, { once: true })
  return () => signal.removeEventListener('abort', onAbort)
}
