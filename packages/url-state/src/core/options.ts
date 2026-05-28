import type { QueryStateOptions, QueryStateSetOptions } from "./types";

export const DEFAULT_QUERY_STATE_OPTIONS = {
  history: "replace",
  clearOnDefault: true,
  shallow: true,
  scroll: false,
  limitUrlUpdates: false,
} as const satisfies Partial<QueryStateOptions>;

export const resolveSetOptions = (args: {
  createOptions?: QueryStateOptions | undefined;
  parserOptions?: Partial<QueryStateOptions> | undefined;
  setOptions?: QueryStateSetOptions | undefined;
}): QueryStateSetOptions => {
  return {
    ...DEFAULT_QUERY_STATE_OPTIONS,
    ...(args.parserOptions ?? {}),
    ...(args.createOptions ?? {}),
    ...(args.setOptions ?? {}),
  };
};

