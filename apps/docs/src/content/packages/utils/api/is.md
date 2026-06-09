---
title: is
description: Runtime type guards and emptiness checks — dedicated subpath.
package: '@echojs-ecosystem/utils'
keywords: [is, utils]
---

@echojs-ecosystem/utils/is

## Usage

```ts
import { isString, isEmptyArray, isDefined } from '@echojs-ecosystem/utils/is'

if (isDefined(user)) save(user.name)
if (isEmptyArray(items)) return
```

## Type Declarations

```ts
export const isString: (value: unknown) => value is string
export const isBoolean: (value: unknown) => value is boolean
export const isNumber: (value: unknown) => value is number
export const isBigInt: (value: unknown) => value is bigint
export const isSymbol: (value: unknown) => value is symbol
export const isUndefined: (value: unknown) => value is undefined
export const isNull: (value: unknown) => value is null
export const isNullable: (value: unknown) => value is null | undefined
export const isNullish: typeof isNullable
export const isNil: typeof isNullable
export const isDefined: <T>(value: T | null | undefined) => value is T
export const isFunction: (value: unknown) => value is (...args: never[]) => unknown
export const isArray: (value: unknown) => value is unknown[]
export const isObjectLike: (value: unknown) => value is object
export const isObject: (value: unknown) => value is Record<string, unknown>
export const isPlainObject: (value: unknown) => value is Record<string, unknown>
export const isDate: (value: unknown) => value is Date
export const isRegExp: (value: unknown) => value is RegExp
export const isError: (value: unknown) => value is Error
export const isPromise: <T = unknown>(value: unknown) => value is Promise<T>
export const isMap: <K, V>(value: unknown) => value is Map<K, V>
export const isSet: <T>(value: unknown) => value is Set<T>
export const isWeakMap: <K extends object, V>(value: unknown) => value is WeakMap<K, V>
export const isWeakSet: <T extends object>(value: unknown) => value is WeakSet<T>
export const isPrimitive: (value: unknown) => value is string | number | boolean | bigint | symbol | null | undefined
export const isInteger: (value: unknown) => value is number
export const isFiniteNumber: (value: unknown) => value is number
export const isNaN: (value: unknown) => value is number
export const isEmptyString: (value: unknown) => value is ''
export const isEmptyArray: (value: unknown) => value is never[]
export const isEmptyObject: (value: unknown) => boolean
export const isEmpty: (value: unknown) => boolean
export const isNonEmptyArray: <T>(value: unknown) => value is [T, ...T[]]
export const hasOwn: <T extends object, K extends PropertyKey>(
  value: T,
  key: K,
) => value is T & Record<K, unknown>
```

## API

### Exports

| Member | Type | Description |
| --- | --- | --- |
| Each guard | `boolean` | Runtime check; narrows TypeScript types |
