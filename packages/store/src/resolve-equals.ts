import type { EqualsFn, EqualsOption } from "./types";

export const resolveEquals = <T>(equals?: EqualsOption<T>): EqualsFn<T> => {
  if (equals === false) {
    return () => false;
  }
  if (equals) {
    return equals;
  }
  return Object.is;
};
