import { div, section } from "@echojs/hyperdom";
import type { Child } from "@echojs/hyperdom";
import { getDocsModule } from "@app/config/docs-modules.js";
import { $nestedCatalogModel, NestedCatalogView } from "@features/forms-nested-catalog/index.js";
import { ModuleHeader } from "@widgets/app-shell/module-header.js";

const meta = getDocsModule("forms-nested")!;

export const FormsNestedView = (): Child =>
  section({ class: "page page--feature page--wide" }, [
    ModuleHeader(meta),
    div({ class: "page__body page__body--wide" }, NestedCatalogView($nestedCatalogModel())),
  ]);
