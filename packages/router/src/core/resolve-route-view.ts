import { getPageState } from "./page";
import type {
  AnyPage,
  RouteErrorView,
  RouteLoadingView,
  RouteView,
  RouterNotFoundView,
} from "./types";

const emptyOutlet = (): null => null;

export const resolvePageLoadingView = (page: AnyPage): RouteLoadingView => {
  const state = getPageState(page);
  if (state.loadingView) return state.loadingView;
  if (state.view) {
    return ({ params, query }) =>
      state.view!({ params, query, outlet: emptyOutlet, data: null });
  }
  throw new TypeError(
    `Route view "${page.name ?? "anonymous"}": pass loadingView or view for router loadingView.`,
  );
};

export const resolvePageErrorView = (page: AnyPage): RouteErrorView => {
  const state = getPageState(page);
  if (state.errorView) return state.errorView;
  if (state.view) {
    return ({ error, params, query }) =>
      state.view!({ params, query, outlet: emptyOutlet, data: null, error });
  }
  throw new TypeError(
    `Route view "${page.name ?? "anonymous"}": pass errorView or view for router errorView.`,
  );
};

export const resolvePageNotFoundView = (page: AnyPage): RouterNotFoundView => {
  const state = getPageState(page);
  if (!state.view) {
    throw new TypeError(
      `Route view "${page.name ?? "anonymous"}": pass view for router notFoundView.`,
    );
  }
  return (context) => state.view!(context);
};

export const resolveLoadingViewOption = (
  option?: RouteLoadingView | AnyPage,
): RouteLoadingView | undefined => {
  if (!option) return undefined;
  if (typeof option === "function") return option;
  return resolvePageLoadingView(option);
};

export const resolveErrorViewOption = (
  option?: RouteErrorView | AnyPage,
): RouteErrorView | undefined => {
  if (!option) return undefined;
  if (typeof option === "function") return option;
  return resolvePageErrorView(option);
};

export const resolveNotFoundViewOption = (
  option?: RouterNotFoundView | AnyPage,
): RouterNotFoundView | undefined => {
  if (!option) return undefined;
  if (typeof option === "function") return option;
  return resolvePageNotFoundView(option);
};
