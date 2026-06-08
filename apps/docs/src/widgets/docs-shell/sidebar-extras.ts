import type { AnyPage } from '@echojs-ecosystem/framework/router'

import { docPageByContentId } from '@app/router'
import { blogPage, roadmapPage, sponsorsPage } from '@app/router'
import type { NavIconId } from '@core/content/nav-icon-id'

export type SidebarDocLink = {
  kind: 'doc'
  id: string
  label: string
  icon: NavIconId
  page: AnyPage
}

export type SidebarExternalLink = {
  kind: 'external'
  id: string
  label: string
  icon: NavIconId
  href: string
}

export type SidebarPageLink = {
  kind: 'page'
  id: string
  label: string
  icon: NavIconId
  page: AnyPage
  /** `partial` — highlight on child URLs under this page's path (e.g. blog posts). */
  match?: 'exact' | 'partial'
}

export type SidebarLink = SidebarDocLink | SidebarExternalLink | SidebarPageLink

/** Bottom block — community, releases, demos (Hero UI–style). */
export const sidebarResourceLinks: SidebarLink[] = [
  {
    kind: 'doc',
    id: 'playground',
    label: 'Live example',
    icon: 'play',
    page: docPageByContentId['examples/todo-app']!,
  },
  {
    kind: 'page',
    id: 'roadmap',
    label: 'Roadmap',
    icon: 'roadmap',
    page: roadmapPage,
  },
  {
    kind: 'page',
    id: 'blog',
    label: 'Blog',
    icon: 'newspaper',
    page: blogPage,
    match: 'partial',
  },
  {
    kind: 'external',
    id: 'changelog',
    label: 'Changelog',
    icon: 'list',
    href: 'https://github.com/echojs/echojs/releases',
  },
  {
    kind: 'page',
    id: 'sponsors',
    label: 'Sponsors',
    icon: 'heart',
    page: sponsorsPage,
  },
  {
    kind: 'external',
    id: 'github',
    label: 'GitHub',
    icon: 'github',
    href: 'https://github.com/echojs/echojs',
  },
]
