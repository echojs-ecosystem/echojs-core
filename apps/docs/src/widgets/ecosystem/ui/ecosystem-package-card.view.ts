import {
  type Child,
  createView,
  div,
  p,
  span,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { docPageByContentId } from '@app/router'
import { ecosystemPackageDescriptionKey } from '@widgets/ecosystem/constants/ecosystem-package-i18n'
import { ecosystemPackageIcon } from '@widgets/ecosystem/constants/ecosystem-packages'
import type { EcosystemPackageCardViewProps } from '@widgets/ecosystem/types/ecosystem-package-card.types'
import { ecosystemPackageStyles } from '@widgets/ecosystem/ui/ecosystem-package-card.view.styles'
import { NavIcon } from '@widgets/icons'
import { i18n } from '@core/providers'

const card = ecosystemPackageStyles()

export const EcosystemPackageCardView = createView(
  (props: EcosystemPackageCardViewProps): Child => {
    const { pkg } = props

    return div({ class: card.root() }, [
      div({ class: card.topLine() }),
      div({ class: card.hoverWash() }),
      div({ class: card.content() }, [
        span(
          { class: card.icon() },
          NavIcon(ecosystemPackageIcon(pkg), card.iconGlyph())
        ),
        p({ class: card.name() }, pkg.name),
        p({ class: card.description() }, () =>
          i18n.t(ecosystemPackageDescriptionKey(pkg))
        ),
        NavLink({
          to: docPageByContentId[pkg.contentId]!,
          class: card.link(),
          children: [
            () => i18n.t('ecosystem.featured.readDocs'),
            span({ class: card.linkArrow() }, '→'),
          ],
        }),
      ]),
    ])
  },
  'EcosystemPackageCardView'
)
