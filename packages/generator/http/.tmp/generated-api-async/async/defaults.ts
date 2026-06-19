import type { InfiniteQueryOptions, MutationOptions, QueryOptions } from "@echojs-ecosystem/async";

export type GeneratedQueryDefaults = Partial<Omit<QueryOptions<unknown>, "queryKey" | "queryFn">>;
export type GeneratedInfiniteQueryDefaults = Partial<
  Omit<
    InfiniteQueryOptions<unknown>,
    "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam" | "getPreviousPageParam"
  >
>;
export type GeneratedMutationDefaults = Partial<Omit<MutationOptions<unknown, unknown>, "mutationFn">>;

export const queryDefaults = {
  keepPreviousData: true,
  staleTime: 60000,
} satisfies GeneratedQueryDefaults;
export const infiniteQueryDefaults = {} satisfies GeneratedInfiniteQueryDefaults;
export const mutationDefaults = {
  retry: false,
} satisfies GeneratedMutationDefaults;