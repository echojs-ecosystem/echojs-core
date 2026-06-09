import {
  type Child,
  createView,
  div,
  h1,
  p,
} from '@echojs-ecosystem/framework/hyperdom'

import { DocContentLayout } from '@widgets/docs-shell/doc-content-layout'
import { docContentPageStyles } from '@widgets/docs-shell/doc-content-layout.styles'
import type { ChangelogIndexVM } from '@entities/changelog/types/changelog.types'
import { ChangelogReleaseCard } from '@entities/changelog/ui/changelog-release-card'
import { changelogPageStyles } from '@entities/changelog/ui/changelog.view.styles'

const page = docContentPageStyles()
const changelog = changelogPageStyles()

export const ChangelogIndexView = createView(
  (vm: ChangelogIndexVM): Child =>
    div({ class: page.page() }, [
      DocContentLayout({
        width: 'wide',
        children: [
          div({ class: changelog.header() }, [
            h1({ class: changelog.title() }, 'Changelog'),
            p({ class: changelog.lead() }, [
              'Release history for the EchoJS ecosystem. Every public package shares the same semver — pick a version for notes, highlights, and updated packages.',
            ]),
          ]),
          div(
            { class: changelog.grid() },
            vm.releases.map((release) =>
              ChangelogReleaseCard({
                release,
                releasePage: vm.releasePage,
              })
            )
          ),
        ],
      }),
    ]),
  'ChangelogIndexView'
)
