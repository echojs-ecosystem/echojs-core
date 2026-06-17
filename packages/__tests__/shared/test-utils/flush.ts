/** Flush microtasks — url-state adapter + hyperdom reactive updates. */
export const flush = async (): Promise<void> => {
  await Promise.resolve()
  await Promise.resolve()
}

export const flushUntil = async (
  predicate: () => boolean,
  attempts = 20,
): Promise<void> => {
  for (let i = 0; i < attempts; i += 1) {
    if (predicate()) return
    await flush()
  }
  throw new Error('flushUntil: predicate did not become true')
}
