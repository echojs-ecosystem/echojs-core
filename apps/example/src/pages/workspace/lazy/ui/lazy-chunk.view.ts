import { div, h4, p } from "@echojs/hyperdom";
import type { RouteView } from "@echojs/router";
import { i18n } from "@app/providers/i18n.js";

const lazyChunkView: RouteView = () =>
  div({ class: "router-page" }, [
    h4(null, () => i18n.t("workspace.lazy.title")),
    p(null, () => i18n.t("workspace.lazy.hint")),
    p(null, () => i18n.t("workspace.lazy.cacheHint")),
  ]);

export default lazyChunkView;
