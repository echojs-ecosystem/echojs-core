import type { UrlStateAdapter } from "../core/types";
import { createRouterUrlStateAdapter, type RouterLike } from "./router-adapter";

let activeRouter: RouterLike | null = null;

const onRouterReady: Array<() => void> = [];

type PendingSubscription = {
  listener: () => void;
  dispose?: () => void;
};

const pendingSubscriptions: PendingSubscription[] = [];

export const registerUrlStateRouter = (router: RouterLike): void => {
  activeRouter = router;

  const adapter = createRouterUrlStateAdapter(router)!;

  for (const pending of pendingSubscriptions) {
    pending.dispose = adapter.subscribe(pending.listener);
    pending.listener();
  }

  for (const sync of onRouterReady) sync();
  onRouterReady.length = 0;
};

export const getUrlStateRouter = (): RouterLike | null => activeRouter;

export const onUrlStateRouterReady = (listener: () => void): (() => void) => {
  if (activeRouter) {
    listener();
    return () => {};
  }
  onRouterReady.push(listener);
  return () => {
    const index = onRouterReady.indexOf(listener);
    if (index >= 0) onRouterReady.splice(index, 1);
  };
};
