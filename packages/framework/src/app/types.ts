import type { Child } from "@echojs-ecosystem/hyperdom";

export type EchoRootSource = Child | (() => Child) | (() => Promise<Child>);

/** Router instance compatible with hyperdom `createRouter`. */
export type EchoRouterSource = {
  View: () => Child;
  start(): void;
  stop?(): void;
};

/** `class` / `id` applied to `document.body` on {@link EchoApp.mount}. */
export type EchoBodyAttributes = {
  class?: string | string[];
  id?: string;
};

export type EchoAppOptions = {
  /** Static or lazy root view. Omit when using a router via `app.use(router)`. */
  view?: EchoRootSource;
  /**
   * Hyperdom: error when `h()` / lifecycle hooks run outside an active view.
   * @default true (hyperdom default)
   */
  strictContextChecks?: boolean;
  /** Global document body attributes (e.g. scoped CSS: `body.echojs-lab`). */
  body?: EchoBodyAttributes;
  /**
   * When `false`, {@link EchoApp.mount} paints before async provider `setup()` finishes.
   * @default true
   */
  awaitProviders?: boolean;
};

export type EchoProvider = {
  name?: string;
  /** Runs when {@link EchoApp.use} is called (like Vue `install`). */
  setup?: (app: EchoApp) => void | Promise<void>;
  /** Supplies the innermost root (e.g. router outlet). */
  resolveRoot?: () => Child | Promise<Child>;
  /** Wraps the root view outward in registration order. */
  wrapRoot?: (inner: () => Child) => () => Child;
};

/** @deprecated Use {@link EchoProvider} */
export type EchoPlugin = EchoProvider;

export type EchoUseInput = EchoProvider | EchoRouterSource;

export type EchoApp = {
  use(plugin: EchoUseInput): EchoApp;
  provide<T>(key: EchoProvideKey, value: T): EchoApp;
  inject<T>(key: EchoProvideKey): T | undefined;
  has(key: EchoProvideKey): boolean;
  mount(target: string | Element): Promise<() => void>;
};

export type EchoProvideKey = symbol | string;
