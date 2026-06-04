import { createLayoutView } from "@echojs/router";
import type { Child } from "@echojs/hyperdom";
import { div } from "@echojs/hyperdom";
import { DocsSidebar } from "@widgets/docs-shell/docs-sidebar.js";

export const docsShellLayoutPage = createLayoutView({
  name: "docs-shell-layout",
  view: ({ outlet }) =>
    div({ class: "app-shell" }, [DocsSidebar(), div({ class: "app-shell__main" }, outlet())]) as Child,
});
