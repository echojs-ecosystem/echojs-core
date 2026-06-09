/** Type guards and emptiness checks — zero dependencies beyond TS. */

export const isString = (value: unknown): value is string => typeof value === "string";

export const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";

export const isNumber = (value: unknown): value is number => typeof value === "number";

export const isBigInt = (value: unknown): value is bigint => typeof value === "bigint";

export const isSymbol = (value: unknown): value is symbol => typeof value === "symbol";

export const isUndefined = (value: unknown): value is undefined => value === undefined;

export const isNull = (value: unknown): value is null => value === null;

/** `null` or `undefined`. */
export const isNullable = (value: unknown): value is null | undefined =>
  value === null || value === undefined;

/** Alias of {@link isNullable}. */
export const isNullish = isNullable;

/** Alias of {@link isNullable} (lodash-style). */
export const isNil = isNullable;

/** Neither `null` nor `undefined`. */
export const isDefined = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined;

export const isFunction = (
  value: unknown,
): value is (...args: never[]) => unknown => typeof value === "function";

export const isArray = Array.isArray;

export const isObjectLike = (value: unknown): value is object =>
  typeof value === "object" && value !== null;

/** Non-array object (`Record` shape). */
export const isObject = (value: unknown): value is Record<string, unknown> =>
  isObjectLike(value) && !Array.isArray(value);

export const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (!isObjectLike(value) || Array.isArray(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
};

export const isDate = (value: unknown): value is Date => value instanceof Date;

export const isRegExp = (value: unknown): value is RegExp => value instanceof RegExp;

export const isError = (value: unknown): value is Error => value instanceof Error;

export const isPromise = <T = unknown>(value: unknown): value is Promise<T> =>
  isObjectLike(value) && typeof (value as Promise<T>).then === "function";

export const isMap = <K = unknown, V = unknown>(value: unknown): value is Map<K, V> =>
  value instanceof Map;

export const isSet = <T = unknown>(value: unknown): value is Set<T> => value instanceof Set;

export const isWeakMap = <K extends object = object, V = unknown>(
  value: unknown,
): value is WeakMap<K, V> => value instanceof WeakMap;

export const isWeakSet = <T extends object = object>(value: unknown): value is WeakSet<T> =>
  value instanceof WeakSet;

export const isPrimitive = (
  value: unknown,
): value is string | number | boolean | bigint | symbol | null | undefined =>
  value === null ||
  value === undefined ||
  (typeof value !== "object" && typeof value !== "function");

export const isInteger = (value: unknown): value is number =>
  isNumber(value) && Number.isInteger(value);

export const isFiniteNumber = (value: unknown): value is number =>
  isNumber(value) && Number.isFinite(value);

export const isNaN = (value: unknown): value is number => isNumber(value) && Number.isNaN(value);

export const isEmptyString = (value: unknown): value is "" =>
  isString(value) && value.length === 0;

export const isEmptyArray = (value: unknown): value is never[] =>
  Array.isArray(value) && value.length === 0;

export const isEmptyObject = (value: unknown): boolean => {
  if (!isPlainObject(value)) return false;
  return Object.keys(value).length === 0;
};

/**
 * Universal emptiness check:
 * `null` / `undefined`, `""`, `[]`, empty plain `{}`, empty `Map` / `Set`.
 */
export const isEmpty = (value: unknown): boolean => {
  if (isNullable(value)) return true;
  if (isString(value)) return value.length === 0;
  if (isArray(value)) return value.length === 0;
  if (isMap(value) || isSet(value)) return value.size === 0;
  if (isPlainObject(value)) return Object.keys(value).length === 0;
  return false;
};

export const isNonEmptyArray = <T>(value: unknown): value is [T, ...T[]] =>
  isArray(value) && value.length > 0;

export const hasOwn = <T extends object, K extends PropertyKey>(
  value: T,
  key: K,
): value is T & Record<K, unknown> => Object.prototype.hasOwnProperty.call(value, key);
