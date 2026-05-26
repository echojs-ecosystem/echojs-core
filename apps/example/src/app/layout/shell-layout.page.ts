import { createLayoutView } from "@echojs/router";
import type { Child } from "@echojs/hyperdom";
import { div } from "@echojs/hyperdom";
import { AppSidebar } from "@widgets/app-shell/app-sidebar.js";

export const shellLayoutPage = createLayoutView({
  name: "shell-layout",
  view: ({ outlet }) =>
    div({ class: "app-shell" }, [AppSidebar(), div({ class: "app-shell__main" }, outlet())]) as Child,
});
