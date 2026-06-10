import { Subscribable } from './subscribable'
import { Query, type QueryConfig } from './query'
import type { QueryCacheEvent, QueryFilter, QueryKey } from '../types'
import { hashKey } from '../utils/hash'
import { matchQuery, type QueryFilters } from '../utils/match-query'

export class QueryCache extends Subscribable<QueryCacheEvent> {
  #queries = new Map<string, Query<unknown, void, unknown>>()

  get(queryHash: string): Query<unknown, void, unknown> | undefined {
    return this.#queries.get(queryHash)
  }

  getByKey(queryKey: QueryKey): Query<unknown, void, unknown> | undefined {
    return this.#queries.get(hashKey(queryKey))
  }

  getAll(): Query<unknown, void, unknown>[] {
    return [...this.#queries.values()]
  }

  build<TData, TParams = void, TError = unknown, TQueryData = TData>(
    config: QueryConfig<TData, TParams, TError, TQueryData>,
  ): Query<TData, TParams, TError, TQueryData> {
    const hash = hashKey(config.queryKey)
    const cached = this.#queries.get(hash) as
      | Query<TData, TParams, TError, TQueryData>
      | undefined
    if (cached) return cached

    const query = new Query(config)
    this.add(query)
    return query
  }

  add<TData, TParams = void, TError = unknown, TQueryData = TData>(
    query: Query<TData, TParams, TError, TQueryData>,
  ): void {
    if (!this.#queries.has(query.queryHash)) {
      this.#queries.set(
        query.queryHash,
        query as unknown as Query<unknown, void, unknown>,
      )
      this.emit({
        type: 'queryAdded',
        queryKey: query.queryKey,
        hash: query.queryHash,
      })
    }
  }

  remove<TData, TParams = void, TError = unknown, TQueryData = TData>(
    query: Query<TData, TParams, TError, TQueryData>,
  ): void {
    const cached = this.#queries.get(query.queryHash)
    if (cached && cached.queryHash === query.queryHash) {
      void query.cancel({ silent: true })
      this.#queries.delete(query.queryHash)
      this.emit({
        type: 'queryRemoved',
        queryKey: query.queryKey,
        hash: query.queryHash,
      })
    }
  }

  find(filters: QueryFilters): Query<unknown, void, unknown> | undefined {
    return this.getAll().find((query) => matchQuery(filters, query))
  }

  findAll(filter: QueryFilter = []): Query<unknown, void, unknown>[] {
    if (Array.isArray(filter)) {
      if (filter.length === 0) return this.getAll()
      return this.getAll().filter((query) =>
        matchQuery({ queryKey: filter }, query),
      )
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

  emit(event: QueryCacheEvent): void {
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

export const createQueryCache = (): QueryCache => new QueryCache()
