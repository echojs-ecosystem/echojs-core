import { createRouteView } from "@echojs/router";
import { div, section } from "@echojs/hyperdom";
import { getModule } from "@app/config/lab-modules.js";
import { $nestedCatalogModel, NestedCatalogView } from "@features/forms-nested-catalog/index.js";
import { ModuleHeader } from "@widgets/app-shell/module-header.js";

const meta = getModule("forms-nested")!;

export const formsNestedPage = createRouteView({
  name: "forms-nested",
  view: () =>
    section({ class: "page page--feature page--wide" }, [
      ModuleHeader(meta),
      div({ class: "page__body page__body--wide" }, NestedCatalogView($nestedCatalogModel())),
    ]),
});
