import { createRouteView } from "@echojs-ecosystem/router";
import { div, h4, p } from "@echojs-ecosystem/hyperdom";
import { i18n } from "@app/providers/i18n.js";

const delay = (ms: number): Promise<{ loadedAt: string }> =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ loadedAt: new Date().toLocaleTimeString() }), ms);
  });

export const slowPage = createRouteView({
  name: "slow",
  beforeLoad: (): Promise<{ loadedAt: string }> => delay(1400),
  loadingView: () =>
    div({ class: "router-state router-state--loading" }, () => i18n.t("workspace.slow.loading")),
  view: ({ data }) =>
    div({ class: "router-page" }, [
      h4(null, () => i18n.t("workspace.slow.title")),
      p(null, () => i18n.t("workspace.slow.hint")),
      p(null, () => `loadedAt: ${(data as { loadedAt: string } | null)?.loadedAt ?? "—"}`),
    ]),
});
