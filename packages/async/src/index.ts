export { createQuery } from './query/create-query'
export { createInfiniteQuery } from './query/create-infinite-query'
export { createQueryClient, QueryClient } from './client/query-client'
export {
  getDefaultQueryClient,
  setDefaultQueryClient,
} from './client/default-client'
export { QueryProvider, setQueryProvider } from './provider/query-provider'
export {
  getQueryProvider,
  requireQueryProvider,
  resetQueryProvider,
} from './provider/context'
export {
  createQueryProvider,
  createQueryPlugin,
  queryPlugin,
  QUERY_PROVIDER_KEY,
  type EchoQueryProvider,
  type EchoQueryPlugin,
  type QueryPlugin,
  type QueryProviderHost,
  type QueryPluginHost,
} from './plugin/query-plugin'
export { createMutation } from './mutation/create-mutation'
export { FocusManager, focusManager } from './managers/focus-manager'
export { OnlineManager, onlineManager } from './managers/online-manager'

export { Query } from './core/query'
export { InfiniteQuery } from './core/infinite-query'
export { QueryCache } from './core/query-cache'
export { InfiniteQueryCache } from './core/infinite-query-cache'
export { Mutation } from './core/mutation'
export { MutationCache } from './core/mutation-cache'
export { QueryObserver } from './query/query-observer'
export { InfiniteQueryObserver } from './query/infinite-query-observer'
export {
  hasInfiniteNextPage,
  hasInfinitePreviousPage,
} from './core/infinite-query'
export { hashKey, partialMatchKey } from './utils/hash'
export { matchQuery } from './utils/match-query'
export { CancelledError, isCancelledError } from './core/cancelled-error'
export {
  createFetchAbortHandle,
  mergeFetchAbortSource,
  resolveAbortInput,
  abortWithReason,
} from './async/abort-control'
export {
  all,
  allSettled,
  race,
  any,
  serial,
  mapSerial,
  mapParallel,
  type AsyncOptions,
  type AsyncTask,
  type MaybePromise,
  type MapParallelOptions,
} from './promise'

export type {
  QueryClientConfig,
  QueryKey,
  QueryDefinition,
  QueryInstance,
  InfiniteQueryData,
  InfiniteQueryDefinition,
  InfiniteQueryInstance,
  InfiniteQueryOptions,
  InfiniteQueryInstanceOptions,
  InfiniteQueryFnContext,
  QueryStatus,
  QueryFetchStatus,
  QueryOptions,
  QueryInstanceOptions,
  QueryFnContext,
  InvalidateQueriesOptions,
  MutationDefinition,
  MutationInstance,
  MutationStatus,
  MutationOptions,
  MutationFnContext,
  StoreLike,
  QueryFilter,
  RefetchOptions,
  FetchPageOptions,
  MutationRunOptions,
  AbortControlOptions,
  AbortInput,
  CancelOptions,
  AbortCapable,
} from './types'

export type {
  QueryProviderConfig,
  QueryProviderDefaultOptions,
} from './provider/query-provider-types'
