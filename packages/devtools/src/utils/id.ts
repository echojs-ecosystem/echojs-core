const counters = new Map<string, number>()

export const createDevtoolsId = (prefix = 'node'): string => {
  const next = (counters.get(prefix) ?? 0) + 1
  counters.set(prefix, next)
  return `${prefix}_${next}`
}

/** @internal Test helper */
export const resetDevtoolsIds = (): void => {
  counters.clear()
}
