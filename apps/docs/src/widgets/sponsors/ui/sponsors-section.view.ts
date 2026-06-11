import {
  type Child,
  createView,
  div,
  h,
  h2,
  p,
  section,
  span,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { sponsorsPage } from '@app/router'
import { becomeSponsorUrl } from '@widgets/sponsors/constants/sponsors.data'
import { SponsorsBoard } from '@widgets/sponsors/sponsors-board'
import { sponsorsSectionStyles } from '@widgets/sponsors/ui/sponsors-section.view.styles'
import { i18n } from '@core/providers'

const s = sponsorsSectionStyles()

export const SponsorsSectionView = createView(
  (_vm: void): Child =>
    section({ class: s.root(), 'aria-labelledby': 'sponsors-heading' }, [
      div({ class: s.inner() }, [
        div({ class: s.headerRow() }, [
          div({ class: s.header() }, [
            p({ class: s.eyebrow() }, () => i18n.t('sponsors.eyebrow')),
            h2({ id: 'sponsors-heading', class: s.title() }, () => i18n.t('sponsors.title')),
            p({ class: s.lead() }, () => i18n.t('sponsors.lead')),
          ]),
          NavLink({
            to: sponsorsPage,
            class: s.viewAll(),
            children: [() => i18n.t('sponsors.viewAll'), span(null, '→')],
          }),
        ]),
        SponsorsBoard({ variant: 'preview' }),
        div({ class: s.actions() }, [
          h(
            'a',
            {
              href: becomeSponsorUrl,
              target: '_blank',
              rel: 'noopener noreferrer',
              class: s.becomeBtn(),
            },
            [span({ class: s.becomeIcon() }, '♥'), () => i18n.t('sponsors.become')]
          ),
        ]),
      ]),
    ]),
  'SponsorsSectionView'
)
