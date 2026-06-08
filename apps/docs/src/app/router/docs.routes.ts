import { createRoutes } from '@echojs-ecosystem/framework/router'

import { getDocPage } from '@app/router'
import { blogPage, blogPostPage, blogSection } from '@pages/blog'
import { docsShellLayoutPage } from '@pages/doc/docs.layout.js'
import { roadmapPage } from '@pages/roadmap'
import { canonicalDocsRouteItems } from '@core/content/nav.js'

const docChildren = canonicalDocsRouteItems().map((item) => ({
  path: item.contentId,
  name: item.routeName,
  routeView: getDocPage(item.contentId),
}))

export const docsRoutes = createRoutes([
  {
    path: '/docs',
    name: 'docs',
    layoutView: docsShellLayoutPage,
    children: [
      ...docChildren,
      {
        path: 'blog',
        name: 'docs-blog-section',
        route: blogSection,
        children: [
          {
            path: '/',
            name: 'docs-blog',
            routeView: blogPage,
          },
          {
            path: ':slug',
            name: 'docs-blog-post',
            routeView: blogPostPage,
          },
        ],
      },
      {
        path: 'roadmap',
        name: 'docs-roadmap',
        routeView: roadmapPage,
      },
    ],
  },
])
