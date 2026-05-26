import { div, h4, p } from "@echojs/hyperdom";
import type { RouteView } from "@echojs/router";

const lazyChunkView: RouteView = () =>
  div({ class: "router-page" }, [
    h4(null, "Lazy route (code split)"),
    p(null, "Этот view загружается через createLazyRouteView + dynamic import."),
    p(null, "Повторный заход не перезагружает чанк — модуль кэшируется."),
  ]);

export default lazyChunkView;
