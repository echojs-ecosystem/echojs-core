import {
  type Child,
  createView,
  p,
  span,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { docPageByContentId } from '@app/router'
import type { EcosystemPackageCardViewProps } from '@widgets/ecosystem/types/ecosystem-package-card.types'
import { ecosystemPackageCompactStyles } from '@widgets/ecosystem/ui/ecosystem-package-compact-card.view.styles'

const card = ecosystemPackageCompactStyles()

export const EcosystemPackageCompactCardView = createView(
  (props: EcosystemPackageCardViewProps): Child => {
    const { pkg } = props

    return NavLink({
      to: docPageByContentId[pkg.contentId]!,
      class: card.root(),
      children: [
        span({ class: card.head() }, [
          span({ class: card.icon() }, pkg.icon),
          span({ class: card.name() }, pkg.shortName),
          span({ class: card.arrow() }, '→'),
        ]),
        p({ class: card.description() }, pkg.description),
      ],
    })
  },
  'EcosystemPackageCompactCardView'
)
