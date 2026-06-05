import type { ReadValue, Signal } from "@echojs-ecosystem/reactivity";
import type { debounce } from "../utils/debounce";
import type { throttle } from "../utils/throttle";
import type { SearchParamValue } from "./url";

export type HistoryMode = "replace" | "push";

/**
 * Whether default values appear in the URL for the whole query-params group.
 *
 * - `"hide"` — defaults omitted (`?page=1` absent when default is `1`)
 * - `"show"` — defaults serialized in the URL
 */
export type DefaultVisibility = "hide" | "show";

/** @deprecated Use {@link DefaultVisibility} */
export type DefaultVisibilityMode = DefaultVisibility;

/** @deprecated Use {@link DefaultVisibility} */
export type DefaultInUrlBehavior = DefaultVisibility;

/** @deprecated Use {@link DefaultVisibility} */
export type DefaultParamsBehavior = DefaultVisibility;

export type UrlStateAdapter = {
  kind: string;
  getSearch(): string;
  setSearch(
    search: string,
    options?: {
      history?: HistoryMode;
      shallow?: boolean;
      scroll?: boolean;
    },
  ): void;
  subscribe(listener: () => void): () => void;
};

export type QueryStateSetOptions = {
  adapter?: UrlStateAdapter;
  history?: HistoryMode;
  shallow?: boolean;
  scroll?: boolean;
  defaultVisibility?: DefaultVisibility;
  /** @deprecated Use {@link defaultVisibility} */
  defaultParamsBehavior?: DefaultVisibility;
  /** @deprecated Use {@link defaultVisibility} */
  clearOnDefault?: boolean;
  limitUrlUpdates?: ReturnType<typeof throttle> | ReturnType<typeof debounce> | false;
  equals?: false | ((a: unknown, b: unknown) => boolean);
};

export type QueryStateOptions = QueryStateSetOptions;

export type CreateQueryParamsOptions<Schema extends Record<string, QueryParamParser<any>>> = QueryStateOptions & {
  urlKeys?: Partial<Record<keyof Schema, string>>;
};

export type ParserMode = "single" | "multi";

export type Parser<Value> = {
  parserMode?: ParserMode;
  parse(value: SearchParamValue): Value | null;
  serialize(value: Value): SearchParamValue;
  /** Custom equality for `defaultVisibility: "hide"` (objects, arrays, …). */
  eq?: (a: Value, b: Value) => boolean;
  defaultValue?: Value | undefined;
  options?: Partial<QueryStateOptions> | undefined;
  withDefault(defaultValue: Value): ParserWithDefault<Value>;
  withOptions(options: Partial<QueryStateOptions>): Parser<Value>;
};

/** Parser for repeated query keys (`?tag=a&tag=b`). */
export type MultiParser<Value> = Parser<Value> & {
  parserMode: "multi";
};

export type QueryParamParser<Value> = Parser<Value> | MultiParser<Value>;

export type ParserWithDefault<Value> = Parser<Value> & {
  defaultValue: Value;
};

export type ParsedValue<P> = P extends ParserWithDefault<infer Value>
  ? Value
  : P extends Parser<infer Value>
    ? Value | null
    : never;

export type ParsedSchema<Schema extends Record<string, QueryParamParser<any>>> = {
  [K in keyof Schema]: ParsedValue<Schema[K]>;
};

export type QueryParamState<Value> = {
  kind: "query-param";
  key: string;

  value(): ReadValue<Value>;
  set(value: Value | null, options?: QueryStateSetOptions): void;
  update(updater: (value: ReadValue<Value>) => Value | null, options?: QueryStateSetOptions): void;
  reset(options?: QueryStateSetOptions): void;
  clear(options?: QueryStateSetOptions): void;

  $value: Signal<Value>;
  $rawValue: Signal<SearchParamValue>;

  subscribe(listener: (value: ReadValue<Value>, prevValue: ReadValue<Value>) => void): () => void;
};

export type QueryParamsState<Schema extends Record<string, QueryParamParser<any>>> = {
  kind: "query-params";

  value(): ReadValue<ParsedSchema<Schema>>;
  set(value: Partial<ParsedSchema<Schema>> | null, options?: QueryStateSetOptions): void;
  update(
    updater: (value: ReadValue<ParsedSchema<Schema>>) => Partial<ParsedSchema<Schema>> | null,
    options?: QueryStateSetOptions,
  ): void;
  reset(options?: QueryStateSetOptions): void;
  clear(options?: QueryStateSetOptions): void;

  $value: Signal<ParsedSchema<Schema>>;

  subscribe(
    listener: (value: ReadValue<ParsedSchema<Schema>>, prevValue: ReadValue<ParsedSchema<Schema>>) => void,
  ): () => void;
};

