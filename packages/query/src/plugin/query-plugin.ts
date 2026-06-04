import { QueryProvider, setQueryProvider } from '../provider/query-provider'
import type { QueryProviderConfig } from '../provider/query-provider-types'

export const QUERY_PROVIDER_KEY = Symbol.for('echojs.query.provider')

/** Minimal host shape — compatible with {@link EchoApp} from `@echojs/framework/app`. */
export type QueryProviderHost = {
  provide?<T>(key: symbol, value: T): unknown
}

/** @deprecated Use {@link QueryProviderHost} */
export type QueryPluginHost = QueryProviderHost

/** Echo app provider with the active {@link QueryProvider} instance. */
export type EchoQueryProvider = {
  name: 'query'
  readonly provider: QueryProvider
  setup: (app: QueryProviderHost) => void
}

/** @deprecated Use {@link EchoQueryProvider} */
export type EchoQueryPlugin = EchoQueryProvider

/** @deprecated Use {@link EchoQueryProvider} */
export type QueryPlugin = EchoQueryProvider

/**
 * Creates a query provider: registers the global provider on call and exposes it on `app.use`.
 *
 * ```ts
 * export const queryProvider = createQueryProvider({
 *   defaultOptions: { queries: { staleTime: 60_000 } },
 * });
 * ```
 */
export const createQueryProvider = (
  config: QueryProviderConfig = {},
): EchoQueryProvider => {
  const provider = new QueryProvider(config)
  setQueryProvider(provider)

  return {
    name: 'query',
    provider,
    setup(app) {
      app.provide?.(QUERY_PROVIDER_KEY, provider)
    },
  }
}

/** @deprecated Use {@link createQueryProvider} */
export const createQueryPlugin = createQueryProvider

/** @deprecated Use {@link createQueryProvider} */
export const queryPlugin = createQueryProvider

export type { QueryProvider, QueryProviderConfig }
