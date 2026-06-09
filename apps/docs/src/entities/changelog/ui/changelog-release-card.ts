import {
  article,
  type Child,
  div,
  h2,
  p,
  span,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink, type AnyPage } from '@echojs-ecosystem/framework/router'

import type { ChangelogRelease } from '@entities/changelog/types/changelog.types'
import { changelogCardStyles } from '@entities/changelog/ui/changelog.view.styles'

export type ChangelogReleaseCardProps = {
  release: ChangelogRelease
  releasePage: AnyPage
}

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

export const ChangelogReleaseCard = ({
  release,
  releasePage,
}: ChangelogReleaseCardProps): Child => {
  const card = changelogCardStyles({
    tone: release.version === '0.1.0' ? 'initial' : 'release',
  })

  return NavLink({
    to: releasePage,
    params: { version: release.slug },
    class: card.card(),
    children: article({ class: 'flex h-full flex-col' }, [
      div({ class: card.meta() }, [
        span({ class: card.version() }, `v${release.version}`),
        span({ class: card.date() }, formatDate(release.date)),
      ]),
      h2({ class: card.title() }, release.title),
      p({ class: card.excerpt() }, release.summary),
      div({ class: card.footer() }, [
        span(null, `${release.packages.length} packages`),
        div(
          { class: card.tags() },
          release.tags
            .slice(0, 2)
            .map((tag) => span({ class: card.tag() }, tag))
        ),
      ]),
    ]),
  })
}
