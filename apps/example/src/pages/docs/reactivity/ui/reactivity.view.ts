import { div, section } from "@echojs-ecosystem/hyperdom";
import type { Child } from "@echojs-ecosystem/hyperdom";
import { getDocsModule } from "@app/config/docs-modules.js";
import { createReactivityLabModel, ReactivityLabView } from "@features/reactivity-lab/index.js";
import { ModuleHeader } from "@widgets/app-shell/module-header.js";

const meta = getDocsModule("reactivity")!;

export const ReactivityView = (): Child =>
  section({ class: "page page--feature" }, [
    ModuleHeader(meta),
    div({ class: "page__body" }, ReactivityLabView(createReactivityLabModel())),
  ]);
