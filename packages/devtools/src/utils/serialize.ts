export type SafeSerializeOptions = {
  maxDepth?: number
}

const DEFAULT_MAX_DEPTH = 12

export const safeSerialize = (value: unknown, options: SafeSerializeOptions = {}): unknown => {
  const maxDepth = options.maxDepth ?? DEFAULT_MAX_DEPTH
  const seen = new WeakSet<object>()

  const walk = (current: unknown, depth: number): unknown => {
    if (depth > maxDepth) return '[MaxDepth]'

    if (current === undefined) return undefined
    if (current === null) return null

    const valueType = typeof current

    if (valueType === 'bigint') return `${current.toString()}n`
    if (valueType === 'symbol') return current.toString()
    if (valueType === 'function') {
      const fn = current as (...args: unknown[]) => unknown
      return `[Function ${fn.name || 'anonymous'}]`
    }
    if (valueType !== 'object') return current

    if (seen.has(current as object)) return '[Circular]'

    if (current instanceof Date) return current.toISOString()
    if (current instanceof RegExp) return current.toString()
    if (current instanceof Map) {
      seen.add(current)
      return {
        __type: 'Map',
        entries: [...current.entries()].map(([key, val]) => [walk(key, depth + 1), walk(val, depth + 1)]),
      }
    }
    if (current instanceof Set) {
      seen.add(current)
      return {
        __type: 'Set',
        values: [...current.values()].map((val) => walk(val, depth + 1)),
      }
    }

    seen.add(current as object)

    if (Array.isArray(current)) {
      return current.map((item) => walk(item, depth + 1))
    }

    const record = current as Record<string, unknown>
    const output: Record<string, unknown> = {}

    for (const key of Object.keys(record)) {
      try {
        output[key] = walk(record[key], depth + 1)
      } catch {
        output[key] = '[Unserializable]'
      }
    }

    return output
  }

  try {
    return walk(value, 0)
  } catch {
    return '[Unserializable]'
  }
}
