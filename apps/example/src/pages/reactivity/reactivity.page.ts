import { createRouteView } from "@echojs/router";
import { div, section } from "@echojs/hyperdom";
import { getModule } from "@app/config/lab-modules.js";
import { createReactivityLabModel, ReactivityLabView } from "@features/reactivity-lab/index.js";
import { ModuleHeader } from "@widgets/app-shell/module-header.js";

const meta = getModule("reactivity")!;

export const reactivityPage = createRouteView({
  name: "reactivity",
  view: () =>
    section({ class: "page page--feature" }, [
      ModuleHeader(meta),
      div({ class: "page__body" }, ReactivityLabView(createReactivityLabModel())),
    ]),
});

