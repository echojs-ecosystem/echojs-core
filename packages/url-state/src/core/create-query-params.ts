import { signal } from "@echojs/reactivity";
import type {
  CreateQueryParamsOptions,
  ParsedSchema,
  Parser,
  QueryParamsState,
  QueryStateSetOptions,
} from "./types";
import { resolveSetOptions } from "./options";
import { defaultEquals } from "../utils/equality";
import { getSearchParam, type SearchParamValue } from "./url";
import { queueUrlUpdate } from "./update-queue";
import { getDefaultUrlStateAdapter } from "../adapters/adapter";
import { hasDefault, parseRaw, shouldClearOnDefault } from "./query-state";

const getUrlKey = <Schema extends Record<string, Parser<any>>>(
  schemaKey: keyof Schema,
  options: CreateQueryParamsOptions<Schema> | undefined,
): string => {
  const override = options?.urlKeys?.[schemaKey];
  return (override ?? (schemaKey as string)) as string;
};

const rawEquals = (a: SearchParamValue, b: SearchParamValue): boolean => {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i += 1) if (a[i] !== b[i]) return false;
    return true;
  }
  return false;
};

export const createQueryParams = <Schema extends Record<string, Parser<any>>>(
  schema: Schema,
  options: CreateQueryParamsOptions<Schema> = {},
): QueryParamsState<Schema> => {
  const adapter = options.adapter ?? getDefaultUrlStateAdapter();

  const resolveOptions = (setOptions?: QueryStateSetOptions): QueryStateSetOptions =>
    resolveSetOptions({ createOptions: options, parserOptions: undefined, setOptions });

  const readSchema = (): ParsedSchema<Schema> => {
    const search = adapter.getSearch();
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(schema) as (keyof Schema)[]) {
      const parser = schema[key];
      const urlKey = getUrlKey(key, options);
      const raw = getSearchParam(search, urlKey);
      const parsed = parseRaw(parser as any, raw);
      out[key as string] = (parsed ?? (hasDefault(parser as any) ? (parser as any).defaultValue : null)) as unknown;
    }
    return out as ParsedSchema<Schema>;
  };

  const $value = signal<ParsedSchema<Schema>>(readSchema());

  const syncFromAdapter = (): void => {
    const next = readSchema();
    const equals = resolveOptions().equals === false ? null : (resolveOptions().equals ?? defaultEquals);
    if (!equals || !equals(next, $value.peek())) $value.set(next);
  };

  const unsubscribe = adapter.subscribe(syncFromAdapter);

  const emit = (next: ParsedSchema<Schema>, prev: ParsedSchema<Schema>, listener: (v: any, p: any) => void): void => {
    if (Object.is(next, prev)) return;
    listener(next, prev);
  };

  const subscribe: QueryParamsState<Schema>["subscribe"] = (listener) => {
    let prev = $value.peek() as any;
    return $value.subscribe(() => {
      const next = $value.peek() as any;
      const p = prev;
      prev = next;
      emit(next, p, listener as any);
    });
  };

  const writeOps = (
    ops: { key: string; value: SearchParamValue }[],
    nextValue: ParsedSchema<Schema>,
    setOptions?: QueryStateSetOptions,
  ): void => {
    const resolved = resolveOptions(setOptions);
    const equals = resolved.equals === false ? null : (resolved.equals ?? defaultEquals);
    if (!equals || !equals(nextValue, $value.peek())) $value.set(nextValue);
    queueUrlUpdate(adapter, ops, resolved);
  };

  const resetValue = (): ParsedSchema<Schema> => {
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(schema) as (keyof Schema)[]) {
      const parser = schema[key] as any;
      out[key as string] = hasDefault(parser) ? parser.defaultValue : null;
    }
    return out as ParsedSchema<Schema>;
  };

  const set: QueryParamsState<Schema>["set"] = (partialOrNull, setOptions) => {
    const resolved = resolveOptions(setOptions);

    if (partialOrNull === null) {
      const ops: { key: string; value: SearchParamValue }[] = [];
      for (const key of Object.keys(schema) as (keyof Schema)[]) {
        ops.push({ key: getUrlKey(key, options), value: null });
      }
      writeOps(ops, resetValue(), resolved);
      return;
    }

    const prev = $value.peek();
    const next: Record<string, unknown> = { ...(prev as any) };
    const ops: { key: string; value: SearchParamValue }[] = [];

    for (const key of Object.keys(partialOrNull) as (keyof typeof partialOrNull)[]) {
      const schemaKey = key as keyof Schema;
      const parser = schema[schemaKey] as any;
      const urlKey = getUrlKey(schemaKey, options);
      const value = (partialOrNull as any)[schemaKey] as unknown;

      if (value === undefined) continue;

      if (value === null) {
        next[schemaKey as string] = hasDefault(parser) ? parser.defaultValue : null;
        ops.push({ key: urlKey, value: null });
        continue;
      }

      next[schemaKey as string] = value;

      if (shouldClearOnDefault(value, parser, resolved)) {
        ops.push({ key: urlKey, value: null });
      } else {
        ops.push({ key: urlKey, value: parser.serialize(value) });
      }
    }

    writeOps(ops, next as ParsedSchema<Schema>, resolved);
  };

  const update: QueryParamsState<Schema>["update"] = (updater, setOptions) => {
    const current = $value.peek();
    set(updater(current), setOptions);
  };

  const reset: QueryParamsState<Schema>["reset"] = (setOptions) => {
    const resolved = resolveOptions(setOptions);
    const ops: { key: string; value: SearchParamValue }[] = [];
    const next = resetValue();

    for (const key of Object.keys(schema) as (keyof Schema)[]) {
      const parser = schema[key]!;
      const urlKey = getUrlKey(key, options);
      const value = next[key];

      if (value === null) {
        ops.push({ key: urlKey, value: null });
        continue;
      }

      if (shouldClearOnDefault(value, parser, resolved)) ops.push({ key: urlKey, value: null });
      else ops.push({ key: urlKey, value: parser.serialize(value) });
    }

    writeOps(ops, next, resolved);
  };

  const clear: QueryParamsState<Schema>["clear"] = (setOptions) => set(null, setOptions);

  return {
    kind: "query-params",
    value: () => $value.value(),
    set,
    update,
    reset,
    clear,
    $value,
    subscribe,
  };
};

