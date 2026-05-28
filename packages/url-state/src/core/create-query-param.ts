import type { Parser, QueryParamState, QueryStateOptions, QueryStateSetOptions } from "./types";
import { shouldHideDefaultInUrl } from "./default-visibility";
import { createSyncedSignals, hasDefault } from "./query-state";
import { getDefaultUrlStateAdapter } from "../adapters/adapter";

export const createQueryParam = <Value>(
  key: string,
  parser: Parser<Value>,
  options: QueryStateOptions = { defaultVisibility: "show" },
): QueryParamState<Value> => {
  const adapter = options.adapter ?? getDefaultUrlStateAdapter();

  const state = createSyncedSignals<Value>({
    adapter,
    key,
    parser,
    options,
  });

  const subscribe: QueryParamState<Value>["subscribe"] = (listener) => {
    let prev = state.$value.peek();
    return state.$value.subscribe(() => {
      const next = state.$value.peek();
      if (Object.is(next, prev)) return;
      const p = prev;
      prev = next;
      listener(next, p);
    });
  };

  const set: QueryParamState<Value>["set"] = (value, setOptions) => {
    const resolved = state.getOptions(setOptions);
    if (value === null) {
      state.write(null, resolved);
      return;
    }

    if (shouldHideDefaultInUrl(value, parser, resolved)) {
      state.write(null, resolved);
      return;
    }

    const raw = parser.serialize(value);
    state.write(raw, resolved);
  };

  const update: QueryParamState<Value>["update"] = (updater, setOptions) => {
    const current = state.$value.peek();
    set(updater(current), setOptions);
  };

  const reset: QueryParamState<Value>["reset"] = (setOptions) => {
    if (hasDefault(parser)) set(parser.defaultValue, setOptions);
    else set(null, setOptions);
  };

  const clear: QueryParamState<Value>["clear"] = (setOptions) => set(null, setOptions);

  return {
    kind: "query-param",
    key,
    value: () => state.$value.value(),
    set,
    update,
    reset,
    clear,
    $value: state.$value,
    $rawValue: state.$rawValue,
    subscribe,
  };
};

