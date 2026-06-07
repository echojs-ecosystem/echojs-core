import { createRoutes } from "@echojs-ecosystem/framework/router";
import { canonicalDocsRouteItems } from "@core/content/nav.js";
import { getDocPage } from "@app/router/doc-pages.js";
import { blogPage, blogPostPage } from "@pages/blog/index.js";
import { roadmapPage } from "@pages/roadmap/index.js";
import { docsShellLayoutPage } from "@pages/doc/docs.layout.js";

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
    children: [
      ...docChildren,
      {
        path: "blog",
        name: "docs-blog",
        routeView: blogPage,
      },
      {
        path: "blog/:slug",
        name: "docs-blog-post",
        routeView: blogPostPage,
      },
      {
        path: "roadmap",
        name: "docs-roadmap",
        routeView: roadmapPage,
      },
    ],
  },
]);
