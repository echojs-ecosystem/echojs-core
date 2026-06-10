import type { QueryFilter, QueryKey } from '../types'

const hasObjectPrototype = (value: unknown): boolean =>
  Object.prototype.toString.call(value) === '[object Object]'

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (!hasObjectPrototype(value)) return false
  const record = value as Record<string, unknown>
  const ctor = record.constructor
  if (ctor === undefined) return true
  const prot = ctor.prototype
  if (!hasObjectPrototype(prot)) return false
  if (!Object.prototype.hasOwnProperty.call(prot, 'isPrototypeOf')) return false
  if (Object.getPrototypeOf(value) !== Object.prototype) return false
  return true
}

/** TanStack Query stable hash — sorts object keys recursively. */
export const hashKey = (queryKey: QueryKey): string =>
  JSON.stringify(queryKey, (_, val) =>
    isPlainObject(val)
      ? Object.keys(val)
          .sort()
          .reduce<Record<string, unknown>>((result, key) => {
            result[key] = val[key]
            return result
          }, {})
      : val,
  )

export const stableHash = hashKey
export const normalizeQueryKey = (key: QueryKey): QueryKey => key

/** TanStack Query partial key match. */
export const partialMatchKey = (a: QueryKey, b: QueryKey): boolean => {
  if (a === b) return true
  if (typeof a !== typeof b) return false
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const bRecord = b as unknown as Record<string, unknown>
    const aRecord = a as unknown as Record<string, unknown>
    return Object.keys(bRecord).every((key) =>
      partialMatchKey(aRecord[key] as QueryKey, bRecord[key] as QueryKey),
    )
  }
  return false
}

export const exactKeyMatch = (target: QueryKey, filter: QueryKey): boolean =>
  filter.length === target.length && partialMatchKey(target, filter)

const isQueryFilterObject = (
  filter: QueryFilter,
): filter is { queryKey: QueryKey; exact?: boolean } => !Array.isArray(filter)

export const matchesQueryFilter = (target: QueryKey, filter: QueryFilter): boolean => {
  if (Array.isArray(filter)) {
    if (filter.length === 0) return true
    return partialMatchKey(target, filter)
  }
  if (isQueryFilterObject(filter)) {
    return filter.exact
      ? exactKeyMatch(target, filter.queryKey)
      : partialMatchKey(target, filter.queryKey)
  }
  return false
}
