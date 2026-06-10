import { Subscribable } from './subscribable'
import { InfiniteQuery, type InfiniteQueryConfig } from './infinite-query'
import type { InfiniteQueryCacheEvent, QueryFilter, QueryKey } from '../types'
import { hashKey } from '../utils/hash'
import { matchQuery, type QueryFilters } from '../utils/match-query'

export class InfiniteQueryCache extends Subscribable<InfiniteQueryCacheEvent> {
  #queries = new Map<string, InfiniteQuery<unknown, void, unknown, unknown>>()

  get(queryHash: string): InfiniteQuery<unknown, void, unknown, unknown> | undefined {
    return this.#queries.get(queryHash)
  }

  getByKey(queryKey: QueryKey): InfiniteQuery<unknown, void, unknown, unknown> | undefined {
    return this.#queries.get(hashKey(queryKey))
  }

  getAll(): InfiniteQuery<unknown, void, unknown, unknown>[] {
    return [...this.#queries.values()]
  }

  build<TPage, TParams = void, TPageParam = unknown, TError = unknown>(
    config: InfiniteQueryConfig<TPage, TParams, TPageParam, TError>,
  ): InfiniteQuery<TPage, TParams, TPageParam, TError> {
    const hash = hashKey(config.queryKey)
    const cached = this.#queries.get(hash) as
      | InfiniteQuery<TPage, TParams, TPageParam, TError>
      | undefined
    if (cached) return cached

    const query = new InfiniteQuery(config)
    this.add(query)
    return query
  }

  add<TPage, TParams = void, TPageParam = unknown, TError = unknown>(
    query: InfiniteQuery<TPage, TParams, TPageParam, TError>,
  ): void {
    if (!this.#queries.has(query.queryHash)) {
      this.#queries.set(
        query.queryHash,
        query as unknown as InfiniteQuery<unknown, void, unknown, unknown>,
      )
      this.emit({
        type: 'infiniteQueryAdded',
        queryKey: query.queryKey,
        hash: query.queryHash,
      })
    }
  }

  remove<TPage, TParams = void, TPageParam = unknown, TError = unknown>(
    query: InfiniteQuery<TPage, TParams, TPageParam, TError>,
  ): void {
    const cached = this.#queries.get(query.queryHash)
    if (cached && cached.queryHash === query.queryHash) {
      void query.cancel({ silent: true })
      this.#queries.delete(query.queryHash)
      this.emit({
        type: 'infiniteQueryRemoved',
        queryKey: query.queryKey,
        hash: query.queryHash,
      })
    }
  }

  find(filters: QueryFilters): InfiniteQuery<unknown, void, unknown, unknown> | undefined {
    return this.getAll().find((query) => matchQuery(filters, query))
  }

  findAll(filter: QueryFilter = []): InfiniteQuery<unknown, void, unknown, unknown>[] {
    if (Array.isArray(filter)) {
      if (filter.length === 0) return this.getAll()
      return this.getAll().filter((query) => matchQuery({ queryKey: filter }, query))
    }
    const objectFilter = filter as QueryFilters
    return this.getAll().filter((query) =>
      matchQuery(
        { queryKey: objectFilter.queryKey!, exact: objectFilter.exact },
        query,
      ),
    )
  }

  clear(): void {
    for (const query of [...this.getAll()]) {
      this.remove(query)
    }
  }

  emit(event: InfiniteQueryCacheEvent): void {
    this.notify(event)
  }

  onFocus(): void {
    for (const query of this.getAll()) {
      query.onFocus()
    }
  }

  onOnline(): void {
    for (const query of this.getAll()) {
      query.onOnline()
    }
  }
}

export const createInfiniteQueryCache = (): InfiniteQueryCache => new InfiniteQueryCache()
