import {
  type Child,
  createView,
  div,
  h1,
  h2,
  li,
  p,
  Show,
  span,
  ul,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { DocContentLayout } from '@widgets/docs-shell/doc-content-layout'
import { docContentPageStyles } from '@widgets/docs-shell/doc-content-layout.styles'
import type { ChangelogReleaseVM } from '@entities/changelog/types/changelog.types'
import { changelogPageStyles } from '@entities/changelog/ui/changelog.view.styles'

const page = docContentPageStyles()
const changelog = changelogPageStyles()

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

export const ChangelogReleaseView = createView((vm: ChangelogReleaseVM): Child => {
  const release = vm.release

  return div({ class: page.page() }, [
    DocContentLayout({
      children: [
        NavLink({
          to: vm.indexPage,
          class: changelog.backLink(),
          children: '← Back to changelog',
        }),
        Show(
          () => release === null,
          () =>
            div({ class: changelog.notFound() }, [
              p({ class: changelog.notFoundTitle() }, 'Release not found'),
              p(
                { class: changelog.notFoundBody() },
                'This version may not exist or the link is outdated.'
              ),
            ]),
          () => {
            if (!release) return null
            return div({ class: changelog.article() }, [
              div({ class: changelog.articleHeader() }, [
                h1({ class: changelog.articleTitle() }, release.title),
                p({ class: changelog.articleMeta() }, [
                  span(null, formatDate(release.date)),
                  span(null, '·'),
                  span(null, `v${release.version}`),
                  span(null, '·'),
                  span(null, 'EchoJS team'),
                  span(null, '·'),
                  span(null, `${release.packages.length} packages`),
                ]),
              ]),
              div({ class: changelog.articleBody() }, [
                p(null, release.summary),
                ...release.highlights.map((paragraph) => p(null, paragraph)),
                ...release.sections.map((section) =>
                  div({ class: changelog.section() }, [
                    h2({ class: changelog.sectionTitle() }, section.title),
                    ul(
                      { class: changelog.sectionList() },
                      section.items.map((item) => li(null, item))
                    ),
                  ])
                ),
                div(null, [
                  p({ class: changelog.packagesLabel() }, 'Updated packages'),
                  div(
                    { class: changelog.packagesRow() },
                    release.packages.map((pkg) =>
                      span({ class: changelog.packageTag() }, pkg)
                    )
                  ),
                ]),
              ]),
            ])
          }
        ),
      ],
    }),
  ])
}, 'ChangelogReleaseView')
