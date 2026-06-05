import { createLayoutView } from "@echojs/router";
import { div, main } from "@echojs/hyperdom";
import { pageLayoutStyles } from "@shared/styles/index.js";
import { DocsSidebar } from "@widgets/docs-shell/docs-sidebar.js";
import { SiteHeader } from "@widgets/site-header/index.js";

const layout = pageLayoutStyles();

export const docsShellLayoutPage = createLayoutView({
  name: "docs-shell-layout",
  view: ({ outlet }) =>
    div({ class: layout.shell() }, [
      DocsSidebar(),
      div({ class: layout.shellMain() }, [
        SiteHeader({ mode: "docs" }),
        main({ class: layout.shellContent() }, outlet),
      ]),
    ]),
});
