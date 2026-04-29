export type AnyFn = (...args: any[]) => any;

export const isObjectLike = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

export const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (!isObjectLike(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
};

export const isFunction = (value: unknown): value is Function => {
  return typeof value === "function";
};
