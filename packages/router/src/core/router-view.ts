import type { Child } from "@echojs-ecosystem/hyperdom";
import { effect, signal, untrack } from "@echojs-ecosystem/reactivity";
import { assertPage, getPageState, isLayoutPage, isPage } from "./page";
import { resolveBeforeLoad } from "./page";
import type { RouteTreeEntry } from "./path-types";
import type {
  AnyPage,
  RouteErrorView,
  RouteLoadingView,
  RouteView,
  Router,
} from "./types";

const entryPage = (def: RouteTreeEntry): AnyPage | undefined =>
  "layoutView" in def ? def.layoutView : "routeView" in def ? def.routeView : undefined;

export type RouterViewRuntimeOptions = {
  routes: readonly RouteTreeEntry[];
  notFoundView?: RouteView;
  loadingView?: RouteLoadingView;
  errorView?: RouteErrorView;
};

const pickLoadingView = (
  branch: PageNode[],
  leafIndex: number,
  globalLoading?: RouteLoadingView,
): RouteLoadingView | undefined => {
  const leaf = branch[leafIndex]!.page;
  if (leaf.loadingView) return leaf.loadingView;
  for (let i = leafIndex - 1; i >= 0; i -= 1) {
    const candidate = branch[i]!.page.loadingView;
    if (candidate) return candidate;
  }
  return globalLoading;
};

const pickErrorView = (
  branch: PageNode[],
  leafIndex: number,
  globalError?: RouteErrorView,
): RouteErrorView | undefined => {
  const leaf = branch[leafIndex]!.page;
  if (leaf.errorView) return leaf.errorView;
  for (let i = leafIndex - 1; i >= 0; i -= 1) {
    const candidate = branch[i]!.page.errorView;
    if (candidate) return candidate;
  }
  return globalError;
};

const renderLoading = (
  page: AnyPage,
  branch: PageNode[],
  leafIndex: number,
  globalLoading?: RouteLoadingView,
): unknown => {
  const view = pickLoadingView(branch, leafIndex, globalLoading);
  if (!view) return null;
  const params = page.$params.value() ?? {};
  const query = page.$query.value() ?? {};
  return view({ params, query });
};

const renderError = (
  page: AnyPage,
  error: unknown,
  branch: PageNode[],
  leafIndex: number,
  globalError?: RouteErrorView,
): unknown => {
  const view = pickErrorView(branch, leafIndex, globalError);
  if (!view) return null;
  const params = page.$params.value() ?? {};
  const query = page.$query.value() ?? {};
  return view({ error, params, query });
};

type PageNode = {
  page: AnyPage;
  children?: PageNode[];
};

type ShellBuildContext = {
  router: Router;
  pageRoots: PageNode[];
  globalLoading?: RouteLoadingView;
  globalError?: RouteErrorView;
};

const collectChildPageNodes = (definitions: readonly RouteTreeEntry[]): PageNode[] => {
  const nodes: PageNode[] = [];
  for (const def of definitions) {
    const page = entryPage(def);
    if (page) {
      assertPage(page, "createRouter");
      nodes.push({
        page,
        children:
          "children" in def && def.children ? collectChildPageNodes(def.children) : undefined,
      });
      continue;
    }
    if ("children" in def && def.children?.length) {
      nodes.push(...collectChildPageNodes(def.children));
    }
  }
  return nodes;
};

const collectPageRoots = (definitions: readonly RouteTreeEntry[]): PageNode[] => {
  const roots: PageNode[] = [];
  for (const def of definitions) {
    const page = entryPage(def);
    if (page) {
      assertPage(page, "createRouter");
      roots.push({
        page,
        children:
          "children" in def && def.children ? collectChildPageNodes(def.children) : undefined,
      });
    } else if ("children" in def && def.children?.length) {
      roots.push(...collectPageRoots(def.children));
    }
  }
  return roots;
};

const findBranch = (entries: PageNode[], activePage: AnyPage): PageNode[] | null => {
  for (const entry of entries) {
    if (entry.page === activePage) return [entry];
    if (entry.children?.length) {
      const childBranch = findBranch(entry.children, activePage);
      if (childBranch) return [entry, ...childBranch];
    }
  }
  return null;
};

const layoutBeforeLoadFailed = (branch: PageNode[], leafIndex: number): boolean => {
  for (let i = 0; i < leafIndex; i += 1) {
    const page = branch[i]!.page;
    if (!isLayoutPage(page)) continue;
    const state = getPageState(page);
    if (state.viewLoader && !state.view) {
      if (state.$viewPending.value() || state.$viewError.value()) return true;
    }
    if (resolveBeforeLoad(state) && state.$error.value()) return true;
    if (resolveBeforeLoad(state) && state.$pending.value()) return true;
  }
  return false;
};

const pageShellSnapshot = (page: AnyPage): string => {
  const state = getPageState(page);
  return [
    page.name,
    JSON.stringify(page.$params.value() ?? {}),
    JSON.stringify(page.$query.value() ?? {}),
    state.$pending.value(),
    state.$error.value() ? "err" : "",
    state.$viewPending.value(),
    state.$viewError.value() ? "verr" : "",
  ].join(":");
};

/** Layout identity — excludes the active leaf (like effector layout + outlet split). */
const computeLayoutShellKey = (branch: PageNode[]): string => {
  const leafIndex = branch.length - 1;
  if (leafIndex <= 0) return `solo:${pageShellSnapshot(branch[0]!.page)}`;
  return branch
    .slice(0, leafIndex)
    .map((node) => pageShellSnapshot(node.page))
    .join("|");
};

const renderPageView = (
  page: AnyPage,
  outlet: () => Child,
  branch: PageNode[],
  leafIndex: number,
  globalLoading?: RouteLoadingView,
  globalError?: RouteErrorView,
): unknown => {
  const state = getPageState(page);
  const params = page.$params.value() ?? {};
  const query = page.$query.value() ?? {};
  const data = (page.$data?.value() ?? null) as unknown;

  if (state.viewLoader && !state.view) {
    if (state.$viewPending.value()) {
      return renderLoading(page, branch, leafIndex, globalLoading) ?? null;
    }
    if (state.$viewError.value()) {
      return (
        renderError(page, state.$viewError.value(), branch, leafIndex, globalError) ?? null
      );
    }
    return renderLoading(page, branch, leafIndex, globalLoading) ?? null;
  }

  if (resolveBeforeLoad(state) && state.$pending.value()) {
    return renderLoading(page, branch, leafIndex, globalLoading) ?? null;
  }
  if (state.$error.value()) {
    return renderError(page, state.$error.value(), branch, leafIndex, globalError) ?? null;
  }

  if (!state.view) return null;
  return state.view({ params, query, outlet, data });
};

/** Reactive outlet — renders only the active leaf (effector `Outlet` equivalent). */
const createReactiveLeafOutlet = (ctx: ShellBuildContext): (() => Child) => {
  return (): Child => {
    const activePage = ctx.router.$activePage.value();
    if (!activePage || !isPage(activePage)) return null;

    const branch = findBranch(ctx.pageRoots, activePage);
    if (!branch?.length) return null;

    const leafIndex = branch.length - 1;
    if (leafIndex <= 0) return null;
    if (layoutBeforeLoadFailed(branch, leafIndex)) return null;

    return renderPageView(
      branch[leafIndex]!.page,
      () => null,
      branch,
      leafIndex,
      ctx.globalLoading,
      ctx.globalError,
    ) as Child;
  };
};

/** Reactive nested outlet — renders deeper layout levels for multi-layout trees. */
const createReactiveNestedOutlet = (
  ctx: ShellBuildContext,
  fromIndex: number,
): (() => Child) => {
  return (): Child => {
    const activePage = ctx.router.$activePage.value();
    if (!activePage || !isPage(activePage)) return null;

    const branch = findBranch(ctx.pageRoots, activePage);
    if (!branch?.length || branch.length <= fromIndex) return null;

    return buildLayoutShell(branch, fromIndex, ctx);
  };
};

const buildLayoutShell = (
  branch: PageNode[],
  index: number,
  ctx: ShellBuildContext,
): Child => {
  const leafIndex = branch.length - 1;
  const node = branch[index]!;
  const outlet =
    index === leafIndex - 1
      ? createReactiveLeafOutlet(ctx)
      : createReactiveNestedOutlet(ctx, index + 1);

  return renderPageView(
    node.page,
    outlet,
    branch,
    leafIndex,
    ctx.globalLoading,
    ctx.globalError,
  ) as Child;
};

const renderSoloPage = (
  branch: PageNode[],
  ctx: ShellBuildContext,
): Child =>
  renderPageView(
    branch[0]!.page,
    () => null,
    branch,
    0,
    ctx.globalLoading,
    ctx.globalError,
  ) as Child;

export const createRouterViewComponent = (
  router: Router,
  options: RouterViewRuntimeOptions,
): (() => unknown) => {
  const pageRoots = collectPageRoots(options.routes);
  const globalLoading = options.loadingView;
  const globalError = options.errorView;
  const notFoundView = options.notFoundView;
  const layoutShellFactories = new Map<string, () => Child>();

  const ctx: ShellBuildContext = {
    router,
    pageRoots,
    globalLoading,
    globalError,
  };

  const renderNotFound = (): Child =>
    (notFoundView?.({ params: {}, query: {}, outlet: () => null, data: null }) ?? null) as Child;

  const $layoutShellKey = signal<string | null>(null);

  effect(() => {
    const activeRoutes = router.$activeRoutes.value();
    const activePage = router.$activePage.value();

    let nextKey: string | null;
    if (!activePage || !isPage(activePage)) {
      nextKey = activeRoutes.length ? "__not_found__" : null;
    } else {
      const branch = findBranch(pageRoots, activePage);
      if (!branch?.length) {
        nextKey = "__not_found__";
      } else {
        nextKey = computeLayoutShellKey(branch);
      }
    }

    if ($layoutShellKey.peek() !== nextKey) {
      $layoutShellKey.set(nextKey);
    }
  });

  const getLayoutShellFactory = (key: string): (() => Child) => {
    const cached = layoutShellFactories.get(key);
    if (cached) return cached;

    const factory = (): Child => {
      const activePage = router.$activePage.peek();
      if (!activePage || !isPage(activePage)) return renderNotFound();

      const branch = findBranch(pageRoots, activePage);
      if (!branch?.length || branch.length <= 1) return renderNotFound();

      return buildLayoutShell(branch, 0, ctx);
    };

    layoutShellFactories.set(key, factory);
    return factory;
  };

  const resolveSoloTree = (key: string): Child => {
    const activePage = router.$activePage.peek();
    if (!activePage || !isPage(activePage)) return renderNotFound();

    const branch = findBranch(pageRoots, activePage);
    if (!branch?.length) return renderNotFound();
    if (computeLayoutShellKey(branch) !== key) return renderNotFound();

    return renderSoloPage(branch, ctx);
  };

  // Top-level view tracks only layout shell identity. Leaf updates flow through outlet().
  return () => {
    const key = $layoutShellKey.value();
    if (key === null) return null;
    if (key === "__not_found__") return renderNotFound();
    if (key.startsWith("solo:")) return untrack(() => resolveSoloTree(key));
    return untrack(() => getLayoutShellFactory(key)());
  };
};
