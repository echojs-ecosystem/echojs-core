import type { ReadonlySignal, Signal } from "@echojs-ecosystem/reactivity";
import { isSignal as isReactiveSignal, isReadonlySignal } from "@echojs-ecosystem/reactivity";

export { isReactiveSignal as isSignal, isReadonlySignal };

export const isFunction = (value: unknown): value is (...args: unknown[]) => unknown =>
  typeof value === "function";

export const isSignalish = <T>(value: unknown): value is Signal<T> | ReadonlySignal<T> => {
  return isReactiveSignal(value) || isReadonlySignal(value);
};

export const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value);

export const isArray = Array.isArray;

export const isString = (value: unknown): value is string => typeof value === "string";

export const isNumber = (value: unknown): value is number => typeof value === "number";

export const isNullOrUndefined = (value: unknown): value is null | undefined =>
  value === null || value === undefined;

export const normalizeValue = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  if (isString(value)) return value;
  if (isNumber(value)) return String(value);
  return String(value);
};
