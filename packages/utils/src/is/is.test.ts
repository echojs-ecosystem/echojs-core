import { describe, expect, it } from "vitest";

import * as guards from "./is";

const {
  hasOwn,
  isArray,
  isBigInt,
  isBoolean,
  isDate,
  isDefined,
  isEmpty,
  isEmptyArray,
  isEmptyObject,
  isEmptyString,
  isError,
  isFiniteNumber,
  isFunction,
  isInteger,
  isMap,
  isNaN,
  isNil,
  isNonEmptyArray,
  isNull,
  isNullable,
  isNullish,
  isNumber,
  isObject,
  isObjectLike,
  isPlainObject,
  isPrimitive,
  isPromise,
  isRegExp,
  isSet,
  isString,
  isSymbol,
  isUndefined,
  isWeakMap,
  isWeakSet,
} = guards;

type Case = { value: unknown; expected: boolean; label?: string };

const caseLabel = (value: unknown): string => {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  const kind = Object.prototype.toString.call(value);
  if (kind === "[object Object]") return "object";
  return kind.slice(8, -1);
};

const runCases = (fn: (value: unknown) => boolean, cases: Case[]) => {
  for (const { value, expected, label } of cases) {
    expect(fn(value), label ?? caseLabel(value)).toBe(expected);
  }
};

describe("is — primitives (typeof)", () => {
  it("isString", () => {
    runCases(isString, [
      { value: "", expected: true },
      { value: "hello", expected: true },
      { value: String("x"), expected: true },
      { value: 0, expected: false },
      { value: false, expected: false },
      { value: null, expected: false },
      { value: undefined, expected: false },
      { value: [], expected: false },
      { value: {}, expected: false },
      { value: Symbol("s"), expected: false },
    ]);
  });

  it("isBoolean", () => {
    runCases(isBoolean, [
      { value: true, expected: true },
      { value: false, expected: true },
      { value: Boolean(1), expected: true },
      { value: 0, expected: false },
      { value: "true", expected: false },
      { value: null, expected: false },
    ]);
  });

  it("isNumber", () => {
    runCases(isNumber, [
      { value: 0, expected: true },
      { value: -1.5, expected: true },
      { value: Number.MAX_VALUE, expected: true },
      { value: NaN, expected: true },
      { value: Infinity, expected: true },
      { value: Number("42"), expected: true },
      { value: "42", expected: false },
      { value: BigInt(1), expected: false },
      { value: null, expected: false },
    ]);
  });

  it("isBigInt", () => {
    runCases(isBigInt, [
      { value: 0n, expected: true },
      { value: BigInt(Number.MAX_SAFE_INTEGER), expected: true },
      { value: 1, expected: false },
      { value: "1n", expected: false },
    ]);
  });

  it("isSymbol", () => {
    const sym = Symbol("test");
    runCases(isSymbol, [
      { value: sym, expected: true },
      { value: Symbol.for("shared"), expected: true },
      { value: "symbol", expected: false },
      { value: null, expected: false },
    ]);
  });

  it("isUndefined", () => {
    runCases(isUndefined, [
      { value: undefined, expected: true },
      { value: void 0, expected: true },
      { value: null, expected: false },
      { value: 0, expected: false },
    ]);
  });

  it("isNull", () => {
    runCases(isNull, [
      { value: null, expected: true },
      { value: undefined, expected: false },
      { value: 0, expected: false },
    ]);
  });
});

describe("is — nullable aliases", () => {
  const nullableCases: Case[] = [
    { value: null, expected: true },
    { value: undefined, expected: true },
    { value: 0, expected: false },
    { value: "", expected: false },
    { value: false, expected: false },
  ];

  it("isNullable", () => runCases(isNullable, nullableCases));
  it("isNullish matches isNullable", () => runCases(isNullish, nullableCases));
  it("isNil matches isNullable", () => runCases(isNil, nullableCases));

  it("aliases are the same function", () => {
    expect(isNullish).toBe(isNullable);
    expect(isNil).toBe(isNullable);
  });

  it("isDefined", () => {
    runCases(isDefined, [
      { value: 0, expected: true },
      { value: "", expected: true },
      { value: false, expected: true },
      { value: null, expected: false },
      { value: undefined, expected: false },
    ]);
  });
});

describe("is — functions", () => {
  it("isFunction", () => {
    runCases(isFunction, [
      { value: () => {}, expected: true, label: "arrow" },
      { value: function named() {}, expected: true, label: "declaration" },
      { value: async () => {}, expected: true, label: "async" },
      { value: function* gen() {}, expected: true, label: "generator" },
      { value: class Foo {}, expected: true, label: "class" },
      { value: Array.isArray, expected: true, label: "builtin" },
      { value: {}, expected: false },
      { value: "fn", expected: false },
    ]);
  });
});

describe("is — arrays", () => {
  it("isArray", () => {
    runCases(isArray, [
      { value: [], expected: true },
      { value: [1, 2], expected: true },
      { value: new Array(2), expected: true },
      { value: Array.from("ab"), expected: true },
      { value: { length: 0 }, expected: false },
      { value: "[]", expected: false },
    ]);
  });

  it("isEmptyArray", () => {
    runCases(isEmptyArray, [
      { value: [], expected: true },
      { value: new Array(), expected: true },
      { value: [0], expected: false },
      { value: {}, expected: false },
    ]);
  });

  it("isNonEmptyArray", () => {
    runCases(isNonEmptyArray, [
      { value: [1], expected: true },
      { value: [undefined], expected: true },
      { value: [], expected: false },
      { value: "a", expected: false },
    ]);
  });
});

describe("is — objects", () => {
  class Foo {
    x = 1;
  }

  it("isObjectLike", () => {
    runCases(isObjectLike, [
      { value: {}, expected: true },
      { value: [], expected: true },
      { value: new Date(), expected: true },
      { value: null, expected: false },
      { value: 1, expected: false },
    ]);
  });

  it("isObject (non-array object)", () => {
    runCases(isObject, [
      { value: {}, expected: true },
      { value: new Foo(), expected: true },
      { value: Object.create(null), expected: true },
      { value: [], expected: false },
      { value: null, expected: false },
    ]);
  });

  it("isPlainObject", () => {
    runCases(isPlainObject, [
      { value: {}, expected: true },
      { value: Object.assign({}, { a: 1 }), expected: true },
      { value: Object.create(null), expected: true },
      { value: new Foo(), expected: false },
      { value: new Date(), expected: false },
      { value: [], expected: false },
      { value: null, expected: false },
    ]);
  });
});

describe("is — built-in constructors", () => {
  it("isDate", () => {
    runCases(isDate, [
      { value: new Date(), expected: true },
      { value: new Date("2020-01-01"), expected: true },
      { value: Date.now(), expected: false },
      { value: "2020-01-01", expected: false },
      { value: {}, expected: false },
    ]);
  });

  it("isRegExp", () => {
    runCases(isRegExp, [
      { value: /abc/gi, expected: true },
      { value: new RegExp("abc", "i"), expected: true },
      { value: "/abc/", expected: false },
      { value: {}, expected: false },
    ]);
  });

  it("isError", () => {
    runCases(isError, [
      { value: new Error("fail"), expected: true },
      { value: new TypeError("type"), expected: true },
      { value: { message: "x", name: "Error" }, expected: false },
      { value: "error", expected: false },
    ]);
  });

  it("isMap", () => {
    runCases(isMap, [
      { value: new Map(), expected: true },
      { value: new Map([["a", 1]]), expected: true },
      { value: {}, expected: false },
    ]);
  });

  it("isSet", () => {
    runCases(isSet, [
      { value: new Set(), expected: true },
      { value: new Set([1, 2]), expected: true },
      { value: [], expected: false },
    ]);
  });

  it("isWeakMap", () => {
    const key = {};
    runCases(isWeakMap, [
      { value: new WeakMap(), expected: true },
      { value: new WeakMap([[key, 1]]), expected: true },
      { value: new Map(), expected: false },
    ]);
  });

  it("isWeakSet", () => {
    const item = {};
    runCases(isWeakSet, [
      { value: new WeakSet(), expected: true },
      { value: new WeakSet([item]), expected: true },
      { value: new Set(), expected: false },
    ]);
  });
});

describe("is — promise / thenable", () => {
  it("isPromise", () => {
    runCases(isPromise, [
      { value: Promise.resolve(1), expected: true },
      { value: new Promise(() => {}), expected: true },
      { value: { then: () => {} }, expected: true, label: "thenable" },
      { value: { catch: () => {} }, expected: false },
      { value: async () => 1, expected: false },
    ]);
  });
});

describe("is — number helpers", () => {
  it("isInteger", () => {
    runCases(isInteger, [
      { value: 0, expected: true },
      { value: -3, expected: true },
      { value: 1.5, expected: false },
      { value: NaN, expected: false },
      { value: "1", expected: false },
    ]);
  });

  it("isFiniteNumber", () => {
    runCases(isFiniteNumber, [
      { value: 0, expected: true },
      { value: 1.5, expected: true },
      { value: Infinity, expected: false },
      { value: -Infinity, expected: false },
      { value: NaN, expected: false },
    ]);
  });

  it("isNaN", () => {
    runCases(isNaN, [
      { value: NaN, expected: true },
      { value: Number.NaN, expected: true },
      { value: 0, expected: false },
      { value: Infinity, expected: false },
      { value: "NaN", expected: false },
    ]);
  });
});

describe("is — isPrimitive", () => {
  it("classifies primitives vs objects/functions", () => {
    runCases(isPrimitive, [
      { value: null, expected: true },
      { value: undefined, expected: true },
      { value: "s", expected: true },
      { value: 0, expected: true },
      { value: false, expected: true },
      { value: 1n, expected: true },
      { value: Symbol(), expected: true },
      { value: {}, expected: false },
      { value: [], expected: false },
      { value: () => {}, expected: false },
      { value: new Date(), expected: false },
    ]);
  });
});

describe("is — emptiness", () => {
  it("isEmptyString", () => {
    runCases(isEmptyString, [
      { value: "", expected: true },
      { value: " ", expected: false },
      { value: [], expected: false },
    ]);
  });

  it("isEmptyObject", () => {
    runCases(isEmptyObject, [
      { value: {}, expected: true },
      { value: Object.create(null), expected: true },
      { value: { a: 1 }, expected: false },
      { value: new Date(), expected: false },
      { value: [], expected: false },
    ]);
  });

  it("isEmpty", () => {
    runCases(isEmpty, [
      { value: null, expected: true },
      { value: undefined, expected: true },
      { value: "", expected: true },
      { value: [], expected: true },
      { value: {}, expected: true },
      { value: new Map(), expected: true },
      { value: new Set(), expected: true },
      { value: Object.create(null), expected: true },
      { value: "x", expected: false },
      { value: [1], expected: false },
      { value: { k: 1 }, expected: false },
      { value: new Set([1]), expected: false },
      { value: 0, expected: false },
      { value: false, expected: false },
      { value: new Date(), expected: false },
      { value: /a/, expected: false },
    ]);
  });
});

describe("hasOwn", () => {
  it("detects own properties only", () => {
    const parent = { inherited: true };
    const child = Object.create(parent) as Record<string, unknown>;
    child.own = true;

    expect(hasOwn(child, "own")).toBe(true);
    expect(hasOwn(child, "inherited")).toBe(false);
    expect(hasOwn({ a: 1 }, "a")).toBe(true);
    expect(hasOwn({ a: 1 }, "b")).toBe(false);
  });
});
