import type { Child } from "@echojs/hyperdom";
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

const collectChildPageNodes = (definitions: readonly RouteTreeEntry[]): PageNode[] => {
  const nodes: PageNode[] = [];
  for (const def of definitions) {
    const page = entryPage(def);
    if (!page) continue;
    assertPage(page, "createRouter");
    nodes.push({
      page,
      children:
        "children" in def && def.children ? collectChildPageNodes(def.children) : undefined,
    });
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

const renderBranch = (
  branch: PageNode[],
  index: number,
  globalLoading?: RouteLoadingView,
  globalError?: RouteErrorView,
): unknown => {
  const node = branch[index];
  if (!node) return null;

  const leafIndex = branch.length - 1;
  if (index > 0 && layoutBeforeLoadFailed(branch, index)) {
    return null;
  }

  const outlet = (): Child =>
    (index + 1 < branch.length
      ? renderBranch(branch, index + 1, globalLoading, globalError)
      : null) as Child;

  return renderPageView(
    node.page,
    outlet,
    branch,
    leafIndex,
    globalLoading,
    globalError,
  );
};

export const createRouterViewComponent = (
  router: Router,
  options: RouterViewRuntimeOptions,
): (() => unknown) => {
  const pageRoots = collectPageRoots(options.routes);
  const globalLoading = options.loadingView;
  const globalError = options.errorView;
  const notFoundView = options.notFoundView;

  return () => {
    const activeRoutes = router.$activeRoutes.value();
    const activePage = activeRoutes.at(-1);

    if (!activePage || !isPage(activePage)) {
      return notFoundView?.({ params: {}, query: {}, outlet: () => null, data: null }) ?? null;
    }

    const branch = findBranch(pageRoots, activePage);
    if (!branch?.length) {
      return notFoundView?.({ params: {}, query: {}, outlet: () => null, data: null }) ?? null;
    }

    return renderBranch(branch, 0, globalLoading, globalError);
  };
};
