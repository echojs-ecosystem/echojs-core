/** JSON-serializable async option values written into generated definitions. */
export type AsyncGeneratorDefaultValue =
  | string
  | number
  | boolean
  | null
  | AsyncGeneratorDefaultValue[]
  | { [key: string]: AsyncGeneratorDefaultValue };

/**
 * Serializable subset of `QueryOptions` from `@echojs-ecosystem/async`.
 * Used in generator config and re-exported in generated `async/defaults.ts`.
 */
export type AsyncGeneratorQueryDefaults = {
  staleTime?: number;
  cacheTime?: number;
  keepPreviousData?: boolean;
  abortPrevious?: boolean;
  refetchOnMount?: boolean | "stale";
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
  retry?: number | false;
  retryDelay?: number;
  enabled?: boolean;
};

/**
 * Serializable subset of `InfiniteQueryOptions` from `@echojs-ecosystem/async`.
 */
export type AsyncGeneratorInfiniteQueryDefaults = {
  staleTime?: number;
  cacheTime?: number;
  keepPreviousData?: boolean;
  abortPrevious?: boolean;
  refetchOnMount?: boolean | "stale";
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
  retry?: number | false;
  retryDelay?: number;
  enabled?: boolean;
};

/**
 * Serializable subset of `MutationOptions` from `@echojs-ecosystem/async`.
 */
export type AsyncGeneratorMutationDefaults = {
  retry?: number | false;
  retryDelay?: number;
};

export interface AsyncGeneratorDefaultsConfig {
  /** Base options spread into every generated `createQuery` definition. */
  query?: AsyncGeneratorQueryDefaults;
  /** Base options spread into every generated `createInfiniteQuery` definition. */
  infiniteQuery?: AsyncGeneratorInfiniteQueryDefaults;
  /** Base options spread into every generated `createMutation` definition. */
  mutation?: AsyncGeneratorMutationDefaults;
}

export interface ResolvedAsyncGeneratorDefaults {
  query: AsyncGeneratorQueryDefaults;
  infiniteQuery: AsyncGeneratorInfiniteQueryDefaults;
  mutation: AsyncGeneratorMutationDefaults;
}

/** Per-operation OpenAPI extension (`x-echo-async`). */
export interface EchoAsyncOperationExtension {
  kind?: "query" | "mutation" | "infiniteQuery" | "skip";
  pagination?: {
    /** Raw TypeScript expression, e.g. `null` or `1`. */
    initialPageParam: string;
    /** Raw TypeScript expression, e.g. `(lastPage) => lastPage.nextCursor`. */
    getNextPageParam: string;
    /** Raw TypeScript expression (optional). */
    getPreviousPageParam?: string;
    /** Raw TS type for page param. Defaults to `unknown`. */
    pageParamType?: string;
    /** Query parameter name that receives `pageParam`. Required for infinite queries. */
    pageParamQueryName?: string;
  };
}
