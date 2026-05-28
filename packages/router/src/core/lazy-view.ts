import { getPageState } from "./page";
import { getRouteState } from "./route";
import type { RouterInternal } from "./router";
import type { AnyPage, RouteView } from "./types";

export type LazyRouteViewModule<
  Params = Record<string, unknown>,
  Query = Record<string, unknown>,
  Data = void,
> = {
  default: RouteView<Params, Query, Data>;
};

export type LazyRouteViewLoader<
  Params = Record<string, unknown>,
  Query = Record<string, unknown>,
  Data = void,
> = () => Promise<LazyRouteViewModule<Params, Query, Data>>;

export const isLazyRouteView = (page: AnyPage): boolean => {
  const state = getPageState(page);
  return Boolean(state.viewLoader);
};

export const ensureLazyViewLoaded = async (
  page: AnyPage,
  navigationId: number,
): Promise<boolean> => {
  const state = getPageState(page);
  const router = getRouteState(page).router as RouterInternal | null;

  if (!state.viewLoader) return true;
  if (state.view) return true;

  const runId = ++state.viewLoadRunId;
  state.$viewPending.set(true);
  state.$viewError.set(null);

  try {
    const module = await state.viewLoader();
    if (runId !== state.viewLoadRunId) return false;
    if (router && navigationId !== router.navigationId) return false;

    const view = module?.default;
    if (typeof view !== "function") {
      throw new TypeError(
        `Lazy route view "${page.name ?? "anonymous"}": dynamic import must export a default view function.`,
      );
    }

    state.view = view;
    state.$viewPending.set(false);
    return true;
  } catch (error) {
    if (runId !== state.viewLoadRunId) return false;
    if (router && navigationId !== router.navigationId) return false;
    state.$viewError.set(error);
    state.$viewPending.set(false);
    return false;
  }
};

export const cancelLazyViewLoads = (pages: Iterable<AnyPage>): void => {
  for (const page of pages) {
    const state = getPageState(page);
    if (!state.viewLoader) continue;
    state.viewLoadRunId += 1;
    state.$viewPending.set(false);
    state.$viewError.set(null);
  }
};
