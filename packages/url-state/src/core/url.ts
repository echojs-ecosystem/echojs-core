export type SearchParamValue = string | readonly string[] | null;

export const normalizeSearch = (search: string): string => {
  if (!search) return "";
  if (search === "?") return "";
  return search.startsWith("?") ? search : `?${search}`;
};

export const parseSearch = (search: string): URLSearchParams => new URLSearchParams(normalizeSearch(search));

const paramsToMap = (params: URLSearchParams): Map<string, string[]> => {
  const map = new Map<string, string[]>();
  for (const [key, value] of params.entries()) {
    const arr = map.get(key);
    if (arr) arr.push(value);
    else map.set(key, [value]);
  }
  return map;
};

export const stringifySearch = (params: URLSearchParams): string => {
  const map = paramsToMap(params);
  const keys = [...map.keys()].sort();
  const next = new URLSearchParams();
  for (const key of keys) {
    const values = map.get(key)!;
    for (const value of values) next.append(key, value);
  }
  const str = next.toString();
  return str ? `?${str}` : "";
};

export const getSearchParam = (search: string, key: string): SearchParamValue => {
  const params = parseSearch(search);
  const all = params.getAll(key);
  if (all.length === 0) return null;
  if (all.length === 1) return all[0]!;
  return all;
};

export const removeSearchParam = (search: string, key: string): string => {
  const params = parseSearch(search);
  params.delete(key);
  return stringifySearch(params);
};

export const setSearchParam = (search: string, key: string, value: SearchParamValue): string => {
  const params = parseSearch(search);
  params.delete(key);
  if (value === null) return stringifySearch(params);
  if (Array.isArray(value)) {
    for (const item of value) params.append(key, item);
  } else {
    params.set(key, value as string);
  }
  return stringifySearch(params);
};

