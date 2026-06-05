import { createRoutes } from "@echojs/router";
import { canonicalDocsRouteItems } from "@shared/content/nav.js";
import { getDocPage } from "@entities/__routes__/doc-pages.js";
import { docsShellLayoutPage } from "@pages/docs/layout/docs-shell-layout.page.js";

const docChildren = canonicalDocsRouteItems().map((item) => ({
  path: item.contentId,
  name: item.routeName,
  routeView: getDocPage(item.contentId),
}));

export const docsRoutes = createRoutes([
  {
    path: "/docs",
    name: "docs",
    layoutView: docsShellLayoutPage,
    children: docChildren,
  },
]);
