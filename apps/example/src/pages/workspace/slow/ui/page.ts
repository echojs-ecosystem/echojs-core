import { createRouteView } from "@echojs/router";
import { div, h4, p } from "@echojs/hyperdom";

const delay = (ms: number): Promise<{ loadedAt: string }> =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ loadedAt: new Date().toLocaleTimeString() }), ms);
  });

export const slowPage = createRouteView({
  name: "slow",
  beforeLoad: (): Promise<{ loadedAt: string }> => delay(1400),
  loadingView: () =>
    div({ class: "router-state router-state--loading" }, "beforeLoad + loadingView на маршруте…"),
  view: ({ data }) =>
    div({ class: "router-page" }, [
      h4(null, "Медленная страница"),
      p(null, "Данные пришли из beforeLoad после задержки ~1.4 с."),
      p(null, () => `loadedAt: ${(data as { loadedAt: string } | null)?.loadedAt ?? "—"}`),
    ]),
});
