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
  const merged: QueryStateSetOptions = {
    ...DEFAULT_QUERY_STATE_OPTIONS,
    ...(args.createOptions ?? {}),
    ...(args.parserOptions ?? {}),
    ...(args.setOptions ?? {}),
  };

  if (merged.defaultVisibility === "show") merged.clearOnDefault = false;
  else if (merged.defaultVisibility === "hide") merged.clearOnDefault = true;

  return merged;
};
