import { div, section } from "@echojs-ecosystem/hyperdom";
import type { Child } from "@echojs-ecosystem/hyperdom";
import { getDocsModule } from "@app/config/docs-modules.js";
import { createQueryDemoModel, QueryDemoView } from "@features/query-demo/index.js";
import { ModuleHeader } from "@widgets/app-shell/module-header.js";

const meta = getDocsModule("query")!;

export const QueryView = (): Child =>
  section({ class: "page page--feature" }, [
    ModuleHeader(meta),
    div({ class: "page__body" }, QueryDemoView(createQueryDemoModel())),
  ]);
