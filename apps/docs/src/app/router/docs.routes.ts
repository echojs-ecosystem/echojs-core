import { createRoutes } from '@echojs-ecosystem/framework/router'

import { getDocPage } from '@app/router'
import { blogPage, blogPostPage, blogSection } from '@pages/blog'
import {
  changelogPage,
  changelogReleasePage,
  changelogSection,
} from '@pages/changelog'
import { docsShellLayoutPage } from '@pages/doc/docs.layout'
import { roadmapPage } from '@pages/roadmap'
import { canonicalDocsRouteItems } from '@core/content/nav'

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
        path: 'changelog',
        name: 'docs-changelog-section',
        route: changelogSection,
        children: [
          {
            path: '/',
            name: 'docs-changelog',
            routeView: changelogPage,
          },
          {
            path: ':version',
            name: 'docs-changelog-release',
            routeView: changelogReleasePage,
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
