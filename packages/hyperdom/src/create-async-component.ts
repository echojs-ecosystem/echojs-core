import { signal } from "@echojs-ecosystem/reactivity";

import { createComponent, type ViewFn } from "./component";
import type { ModelFactoryFn } from "./create-model.types";
import type { Child } from "./types";

export type AsyncComponentChunk<VM> = {
  model: ModelFactoryFn<VM>;
  view: ViewFn<VM>;
};

export type AsyncComponentLoader<VM> = () => Promise<AsyncComponentChunk<VM>>;

export type AsyncLoadingComponent = () => Child;

export type AsyncErrorComponent = (ctx: { error: unknown }) => Child;

export type CreateAsyncComponentOptions<VM> = {
  /** Debug label (e.g. "OrdersList" → displayName). */
  name?: string;
  /** Dynamic import — must resolve to a model factory and view. */
  loader: AsyncComponentLoader<VM>;
  /** Shown while the chunk is loading (after {@link delay}). */
  loadingComponent?: AsyncLoadingComponent;
  /** Delay before showing `loadingComponent`. Default: `200` ms. */
  delay?: number;
  /** Shown when loading fails or {@link timeout} is exceeded. */
  errorComponent?: AsyncErrorComponent;
  /** Max load time before `errorComponent` is shown. Default: `Infinity`. */
  timeout?: number;
};

export type AsyncComponent = (() => Child) & {
  displayName?: string;
  /** Prefetch the chunk before first render (e.g. on hover or route prefetch). */
  preload: () => Promise<void>;
  /** Drop cached bindings and cancel in-flight loads. */
  reset: () => void;
};

const DEFAULT_DELAY_MS = 200;

const createTimeoutError = (name: string | undefined, timeout: number): Error =>
  new Error(
    name
      ? `Async component "${name}" timed out after ${timeout}ms.`
      : `Async component timed out after ${timeout}ms.`,
  );

const assertChunk = <VM>(chunk: AsyncComponentChunk<VM> | undefined, name?: string): AsyncComponentChunk<VM> => {
  const model = chunk?.model;
  const view = chunk?.view;

  if (typeof model !== "function" || typeof view !== "function") {
    throw new TypeError(
      name
        ? `Async component "${name}": loader must resolve { model, view } factories.`
        : "Async component: loader must resolve { model, view } factories.",
    );
  }

  return { model, view };
};

/**
 * Lazy component factory — loads model + view, then binds them like {@link createComponent}.
 *
 * ```ts
 * export const OrdersList = createAsyncComponent({
 *   name: "OrdersList",
 *   loader: async () => {
 *     const { ordersListModel, OrdersListView } = await import("./orders-list");
 *     return { model: ordersListModel, view: OrdersListView };
 *   },
 *   loadingComponent: () => "Loading…",
 * });
 *
 * // route: view: () => OrdersList()
 * ```
 *
 * With props — resolve model in the loader closure:
 * ```ts
 * export const OrderEdit = (props: { orderId: string }) =>
 *   createAsyncComponent({
 *     loader: async () => {
 *       const { orderEditModel, OrderEditView } = await import("./order-edit");
 *       return {
 *         model: () => orderEditModel({ orderId: props.orderId }),
 *         view: OrderEditView,
 *       };
 *     },
 *   })();
 * ```
 */
export const createAsyncComponent = <VM>(
  options: CreateAsyncComponentOptions<VM>,
): AsyncComponent => {
  const {
    name,
    loader,
    loadingComponent,
    errorComponent,
    delay = DEFAULT_DELAY_MS,
    timeout = Infinity,
  } = options;

  let render: (() => Child) | null = null;
  let loadRunId = 0;
  let loadPromise: Promise<boolean> | null = null;
  let delayTimer: ReturnType<typeof setTimeout> | null = null;
  let timeoutTimer: ReturnType<typeof setTimeout> | null = null;

  const $pending = signal(false);
  const $error = signal<unknown>(null);
  const $showLoading = signal(false);

  const clearTimers = (): void => {
    if (delayTimer !== null) {
      clearTimeout(delayTimer);
      delayTimer = null;
    }
    if (timeoutTimer !== null) {
      clearTimeout(timeoutTimer);
      timeoutTimer = null;
    }
  };

  const startTimers = (runId: number): void => {
    clearTimers();
    $showLoading.set(false);

    if (loadingComponent) {
      if (delay <= 0) {
        $showLoading.set(true);
      } else {
        delayTimer = setTimeout(() => {
          if (runId !== loadRunId) return;
          if ($pending.peek() && !render) {
            $showLoading.set(true);
          }
        }, delay);
      }
    }

    if (Number.isFinite(timeout) && timeout > 0) {
      timeoutTimer = setTimeout(() => {
        if (runId !== loadRunId) return;
        if (render) return;

        loadRunId += 1;
        loadPromise = null;
        $error.set(createTimeoutError(name, timeout));
        $pending.set(false);
        $showLoading.set(false);
        clearTimers();
      }, timeout);
    }
  };

  const finishLoad = (runId: number, ok: boolean): void => {
    if (runId !== loadRunId) return;
    clearTimers();
    $showLoading.set(false);
    $pending.set(false);
    if (!ok) return;
  };

  const ensureLoaded = async (): Promise<boolean> => {
    if (render) return true;
    if (loadPromise) return loadPromise;

    const runId = ++loadRunId;
    $pending.set(true);
    $error.set(null);
    startTimers(runId);

    loadPromise = (async () => {
      try {
        const chunk = assertChunk(await loader(), name);
        if (runId !== loadRunId) return false;

        render = createComponent(chunk.model, chunk.view, { name });
        finishLoad(runId, true);
        return true;
      } catch (err) {
        if (runId !== loadRunId) return false;
        $error.set(err);
        finishLoad(runId, false);
        return false;
      } finally {
        loadPromise = null;
      }
    })();

    return loadPromise;
  };

  const reset = (): void => {
    loadRunId += 1;
    render = null;
    loadPromise = null;
    clearTimers();
    $pending.set(false);
    $error.set(null);
    $showLoading.set(false);
  };

  const preload = async (): Promise<void> => {
    await ensureLoaded();
  };

  const AsyncComponent = (): Child => {
    void ensureLoaded();

    return () => {
      const err = $error.value();
      if (err !== null && err !== undefined) {
        return errorComponent?.({ error: err }) ?? null;
      }
      if (($pending.value() || !render) && $showLoading.value() && loadingComponent) {
        return loadingComponent();
      }
      if ($pending.value() || !render) {
        return null;
      }
      return render();
    };
  };

  AsyncComponent.displayName = name;
  AsyncComponent.preload = preload;
  AsyncComponent.reset = reset;

  return AsyncComponent;
};
