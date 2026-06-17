/** JSON-serializable async option values written into generated definitions. */
export type AsyncGeneratorDefaultValue =
  | string
  | number
  | boolean
  | null
  | AsyncGeneratorDefaultValue[]
  | { [key: string]: AsyncGeneratorDefaultValue };

export interface AsyncGeneratorDefaultsConfig {
  /** Base options spread into every generated `createQuery` definition. */
  query?: Record<string, AsyncGeneratorDefaultValue>;
  /** Base options spread into every generated `createInfiniteQuery` definition. */
  infiniteQuery?: Record<string, AsyncGeneratorDefaultValue>;
  /** Base options spread into every generated `createMutation` definition. */
  mutation?: Record<string, AsyncGeneratorDefaultValue>;
}

export interface ResolvedAsyncGeneratorDefaults {
  query: Record<string, AsyncGeneratorDefaultValue>;
  infiniteQuery: Record<string, AsyncGeneratorDefaultValue>;
  mutation: Record<string, AsyncGeneratorDefaultValue>;
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
