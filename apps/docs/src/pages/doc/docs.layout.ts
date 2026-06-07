import { createLayoutView } from "@echojs-ecosystem/framework/router";
import { div, main } from "@echojs-ecosystem/framework/hyperdom";
import { docsLayoutStyles } from "@pages/doc/docs.layout.styles.js";
import { DocsSidebar } from "@widgets/docs-shell/docs-sidebar.js";
import { SiteHeader } from "@widgets/site-header/index.js";

const layout = docsLayoutStyles();

export const docsShellLayoutPage = createLayoutView({
  name: "docs-shell-layout",
  view: ({ outlet }) =>
    div({ class: layout.shell() }, [
      DocsSidebar(),
      div({ class: layout.shellMain() }, [
        SiteHeader({ mode: "docs" }),
        main({ class: layout.shellContent() }, () => outlet()),
      ]),
    ]),
});
