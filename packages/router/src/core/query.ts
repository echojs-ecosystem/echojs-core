export type QueryPrimitive = string | number | boolean;
export type QueryValue = QueryPrimitive | QueryPrimitive[] | null | undefined;
export type QueryRecord = Record<string, QueryValue>;

const isQueryPrimitive = (value: unknown): value is QueryPrimitive =>
  typeof value === "string" || typeof value === "number" || typeof value === "boolean";

export const parseQuery = (search: string): Record<string, string> => {
  const raw = search.startsWith("?") ? search.slice(1) : search;
  if (!raw) return {};

  const params = new URLSearchParams(raw);
  const result: Record<string, string> = {};
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return result;
};

export const parseQueryValues = (search: string): Record<string, string | string[]> => {
  const raw = search.startsWith("?") ? search.slice(1) : search;
  if (!raw) return {};

  const params = new URLSearchParams(raw);
  const result: Record<string, string | string[]> = {};

  for (const key of new Set(params.keys())) {
    const values = params.getAll(key);
    if (values.length === 1) {
      result[key] = coerceQueryValue(values[0]!);
      continue;
    }
    result[key] = values.map(coerceQueryValue);
  }

  return result;
};

const coerceQueryValue = (value: string): string => {
  if (value === "true") return "true";
  if (value === "false") return "false";
  return value;
};

export const stringifyQuery = (query: QueryRecord): string => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === null || value === undefined) continue;

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item === null || item === undefined) continue;
        params.append(key, String(item));
      }
      continue;
    }

    if (isQueryPrimitive(value)) {
      params.append(key, String(value));
    }
  }

  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
};

export const mapQueryToRecord = <Query extends Record<string, unknown>>(
  raw: Record<string, string>,
): Query => raw as Query;
