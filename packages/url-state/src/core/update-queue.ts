import type { SearchParamValue } from "./url";
import { setSearchParam } from "./url";
import type { QueryStateSetOptions, UrlStateAdapter } from "./types";

type Pending = {
  ops: { key: string; value: SearchParamValue }[];
  options: QueryStateSetOptions;
};

type QueueState = {
  pending: Pending | null;
  microtaskQueued: boolean;
};

const queues = new WeakMap<UrlStateAdapter, QueueState>();

const getQueue = (adapter: UrlStateAdapter): QueueState => {
  const existing = queues.get(adapter);
  if (existing) return existing;
  const next: QueueState = { pending: null, microtaskQueued: false };
  queues.set(adapter, next);
  return next;
};

const mergePending = (prev: Pending | null, next: Pending): Pending => {
  if (!prev) return next;
  const history =
    prev.options.history === "push" || next.options.history === "push"
      ? "push"
      : next.options.history ?? prev.options.history;
  return {
    ops: [...prev.ops, ...next.ops],
    options: {
      ...prev.options,
      ...next.options,
      history,
    },
  };
};

export const queueUrlUpdate = (
  adapter: UrlStateAdapter,
  ops: Pending["ops"],
  options: QueryStateSetOptions,
): void => {
  const state = getQueue(adapter);
  state.pending = mergePending(state.pending, { ops, options });
  if (state.microtaskQueued) return;

  state.microtaskQueued = true;
  queueMicrotask(() => {
    state.microtaskQueued = false;
    const pending = state.pending;
    state.pending = null;
    if (!pending) return;

    const doSet = (): void => {
      let nextSearch = adapter.getSearch();
      for (const op of pending.ops) {
        nextSearch = setSearchParam(nextSearch, op.key, op.value);
      }

      adapter.setSearch(nextSearch, {
        history: pending.options.history,
        shallow: pending.options.shallow,
        scroll: pending.options.scroll,
      });
    };

    const limiter = pending.options.limitUrlUpdates;
    if (limiter) limiter.schedule(doSet);
    else doSet();
  });
};

