const TIME_UNITS: Record<string, number> = {
  ms: 1,
  s: 1000,
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000,
}

export const parseTime = (input: number | string): number => {
  if (typeof input === 'number') {
    if (!Number.isFinite(input)) return Number.POSITIVE_INFINITY
    return input
  }

  const trimmed = input.trim()
  if (trimmed === 'Infinity') return Number.POSITIVE_INFINITY

  const match = /^(\d+(?:\.\d+)?)(ms|s|m|h|d)?$/.exec(trimmed)
  if (!match) {
    throw new TypeError(`Invalid time value: "${input}"`)
  }

  const value = Number(match[1])
  const unit = match[2] ?? 'ms'
  const multiplier = TIME_UNITS[unit]
  if (!multiplier) {
    throw new TypeError(`Invalid time unit in "${input}"`)
  }

  return value * multiplier
}

export const now = (): number => Date.now()

export const isInfiniteTime = (ms: number): boolean => !Number.isFinite(ms)
