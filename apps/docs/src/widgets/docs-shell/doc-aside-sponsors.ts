import { div, h, p, type Child } from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { sponsorsPage } from '@app/router'
import {
  becomeSponsorUrl,
  goldTier,
  silverTier,
} from '@widgets/sponsors/constants/sponsors.data'
import { SponsorLogo } from '@widgets/sponsors/sponsor-logo'
import { docAsideSponsorsStyles } from '@widgets/docs-shell/doc-aside-sponsors.view.styles'

const s = docAsideSponsorsStyles()

const asideSponsors = [
  ...goldTier.sponsors.slice(0, 3),
  ...silverTier.sponsors.slice(0, 2),
]

export const DocAsideSponsors = (): Child =>
  div({ class: s.root() }, [
    p({ class: s.title() }, 'Sponsors'),
    div(
      { class: s.list() },
      asideSponsors.map((sponsor) =>
        h(
          'a',
          {
            href: sponsor.href,
            class: s.link(),
            target: '_blank',
            rel: 'noopener noreferrer',
            'aria-label': sponsor.name,
          },
          [
            SponsorLogo({ sponsor, size: 'bronze' }),
            p({ class: s.name() }, sponsor.name),
          ]
        )
      )
    ),
    div({ class: s.footer() }, [
      h(
        'a',
        {
          href: becomeSponsorUrl,
          class: s.cta(),
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        'Become a sponsor'
      ),
      NavLink({
        to: sponsorsPage,
        class: s.viewAll(),
        children: 'View all sponsors',
      }),
    ]),
  ])
