import { createRoute, createRouteView } from '@echojs-ecosystem/framework/router'
import type { AnyPage } from '@echojs-ecosystem/framework/router'

import {
  changelogReleases,
  findChangelogReleaseBySlug,
  ChangelogIndex,
  ChangelogReleaseArticle,
} from '@entities/changelog'
import { applySeo } from '@core/seo/apply-seo'

export const changelogSection = createRoute('docs-changelog-section')

let changelogPageRef!: AnyPage
let changelogReleasePageRef!: AnyPage

changelogReleasePageRef = createRouteView<{ version: string }>({
  name: 'docs-changelog-release',
  view: ({ params }) => {
    const release = findChangelogReleaseBySlug(params.version)
    applySeo({
      title: release ? `${release.title} · Changelog` : 'Release not found',
      description: release?.summary ?? 'EchoJS ecosystem release notes.',
      path: `/docs/changelog/${params.version}`,
      noindex: !release,
    })
    return ChangelogReleaseArticle({
      slug: params.version,
      indexPage: changelogPageRef,
    })
  },
})

changelogPageRef = createRouteView({
  name: 'docs-changelog',
  view: () => {
    applySeo({
      title: 'Changelog · EchoJS',
      description:
        'Release history for the EchoJS ecosystem — version notes and updated packages.',
      path: '/docs/changelog',
    })
    return ChangelogIndex({
      releases: changelogReleases,
      releasePage: changelogReleasePageRef,
    })
  },
})

export const changelogPage = changelogPageRef
export const changelogReleasePage = changelogReleasePageRef
