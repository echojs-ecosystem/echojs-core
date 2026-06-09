import { expectTypeOf, test } from "vitest";

import {
  isDefined,
  isEmptyArray,
  isNil,
  isNonEmptyArray,
  isNullable,
  isPlainObject,
  isPromise,
  isString,
} from "./is";

test("is type narrowing", () => {
  const value: unknown = "hello";
  if (isString(value)) {
    expectTypeOf(value).toEqualTypeOf<string>();
  }

  const maybe: string | null | undefined = "x";
  if (isDefined(maybe)) {
    expectTypeOf(maybe).toEqualTypeOf<string>();
  }

  const items: unknown = [];
  if (isEmptyArray(items)) {
    expectTypeOf(items).toEqualTypeOf<never[]>();
  }

  const list: unknown = [1];
  if (isNonEmptyArray<number>(list)) {
    expectTypeOf(list).toEqualTypeOf<[number, ...number[]]>();
  }

  const record: unknown = { a: 1 };
  if (isPlainObject(record)) {
    expectTypeOf(record).toEqualTypeOf<Record<string, unknown>>();
  }

  const maybeNull: string | null = null;
  if (isNullable(maybeNull)) {
    expectTypeOf(maybeNull).toEqualTypeOf<null>();
  }

  const nil: unknown = undefined;
  if (isNil(nil)) {
    expectTypeOf(nil).toEqualTypeOf<null | undefined>();
  }

  const pending: unknown = Promise.resolve(1);
  if (isPromise<number>(pending)) {
    expectTypeOf(pending).toEqualTypeOf<Promise<number>>();
  }
});
