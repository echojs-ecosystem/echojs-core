import { createRouteView } from "@echojs/router";
import { div, section } from "@echojs/hyperdom";
import { getModule } from "@app/config/lab-modules.js";
import { createQueryDemoModel, QueryDemoView } from "@features/query-demo/index.js";
import { ModuleHeader } from "@widgets/app-shell/module-header.js";

const meta = getModule("query")!;

export const queryPage = createRouteView({
  name: "query",
  view: () =>
    section({ class: "page page--feature" }, [
      ModuleHeader(meta),
      div({ class: "page__body" }, QueryDemoView(createQueryDemoModel())),
    ]),
});
