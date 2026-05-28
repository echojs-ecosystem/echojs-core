import { signal, type Signal } from "@echojs/reactivity";
import { defaultEquals } from "../utils/equality";
import type { Parser, QueryStateOptions, QueryStateSetOptions, UrlStateAdapter } from "./types";
import { resolveSetOptions } from "./options";
import { hasDefault } from "./parser-meta";
import { getSearchParam, type SearchParamValue } from "./url";
import { queueUrlUpdate } from "./update-queue";

export { hasDefault } from "./parser-meta";

export const parseRaw = <Value>(parser: Parser<Value>, raw: SearchParamValue): Value | null => {
  const parsed = parser.parse(raw);
  if (parsed === null && hasDefault(parser)) return parser.defaultValue;
  return parsed;
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

export const readRawValue = (adapter: UrlStateAdapter, key: string): SearchParamValue => {
  return getSearchParam(adapter.getSearch(), key);
};

export { shouldClearOnDefault, shouldHideDefaultInUrl } from "./default-visibility";

export const createSyncedSignals = <Value>(args: {
  adapter: UrlStateAdapter;
  key: string;
  parser: Parser<Value>;
  options?: QueryStateOptions | undefined;
}): {
  $rawValue: Signal<SearchParamValue>;
  $value: Signal<Value>;
  getOptions(setOptions?: QueryStateSetOptions | undefined): QueryStateSetOptions;
  write(next: SearchParamValue, setOptions?: QueryStateSetOptions | undefined): void;
  dispose(): void;
} => {
  const getOptions = (setOptions?: QueryStateSetOptions): QueryStateSetOptions =>
    resolveSetOptions({ createOptions: args.options, parserOptions: args.parser.options, setOptions });

  const initialRaw = readRawValue(args.adapter, args.key);
  const initialParsed = parseRaw(args.parser, initialRaw);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const $value = signal((initialParsed ?? (hasDefault(args.parser) ? args.parser.defaultValue : null)) as Value);
  const $rawValue = signal<SearchParamValue>(initialRaw);

  const syncFromAdapter = (): void => {
    const adapterRaw = readRawValue(args.adapter, args.key);
    if (!rawEquals(adapterRaw, $rawValue.peek())) $rawValue.set(adapterRaw);

    const parsed = parseRaw(args.parser, adapterRaw);
    const next = (parsed ?? (hasDefault(args.parser) ? args.parser.defaultValue : null)) as Value;
    const equals = getOptions().equals === false ? null : (getOptions().equals ?? defaultEquals);
    if (!equals || !equals(next, $value.peek())) $value.set(next);
  };

  const unsubscribe = args.adapter.subscribe(syncFromAdapter);

  const write = (next: SearchParamValue, setOptions?: QueryStateSetOptions): void => {
    const options = getOptions(setOptions);
    const parsed = parseRaw(args.parser, next);
    const nextValue = (parsed ?? (hasDefault(args.parser) ? args.parser.defaultValue : null)) as Value;

    const equals = options.equals === false ? null : (options.equals ?? defaultEquals);
    if (!rawEquals(next, $rawValue.peek())) $rawValue.set(next);
    if (!equals || !equals(nextValue, $value.peek())) $value.set(nextValue);

    queueUrlUpdate(args.adapter, [{ key: args.key, value: next }], options);
  };

  return {
    $rawValue,
    $value,
    getOptions,
    write,
    dispose: unsubscribe,
  };
};

