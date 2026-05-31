import type { QueryFetchStatus, QueryKey, QueryStatus } from '../types'
import { hashKey, partialMatchKey } from './hash'

export type QueryFilters = {
  exact?: boolean
  queryKey?: QueryKey
  stale?: boolean
  fetchStatus?: QueryFetchStatus
  status?: QueryStatus
  predicate?: (query: QueryLike) => boolean
}

export type QueryLike = {
  queryKey: QueryKey
  queryHash: string
  isStale(): boolean
  isActive(): boolean
  state: {
    fetchStatus: QueryFetchStatus
    status: QueryStatus
  }
}

/** TanStack Query matchQuery — filter queries in cache. */
export const matchQuery = (filters: QueryFilters, query: QueryLike): boolean => {
  const { exact, fetchStatus, predicate, queryKey, stale } = filters

  if (queryKey) {
    if (exact) {
      if (query.queryHash !== hashKey(queryKey)) return false
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false
    }
  }

  if (typeof stale === 'boolean' && query.isStale() !== stale) return false
  if (fetchStatus && fetchStatus !== query.state.fetchStatus) return false
  if (predicate && !predicate(query)) return false

  return true
}
