import { type Child, createView, h, p, span } from '@echojs-ecosystem/framework/hyperdom'

import { ecosystemPackageDocHref } from '@widgets/ecosystem/constants/ecosystem-package-doc-href'
import { ecosystemPackageDescriptionKey } from '@widgets/ecosystem/constants/ecosystem-package-i18n'
import { ecosystemPackageIcon } from '@widgets/ecosystem/constants/ecosystem-packages'
import { ecosystemPackageStatusMeta } from '@widgets/ecosystem/constants/ecosystem-package-status'
import type { EcosystemPackageCardViewProps } from '@widgets/ecosystem/types/ecosystem-package-card.types'
import { ecosystemPackageCompactStyles } from '@widgets/ecosystem/ui/ecosystem-package-compact-card.view.styles'
import { NavIcon } from '@widgets/icons'
import { i18n } from '@core/providers'

const card = ecosystemPackageCompactStyles()

export const EcosystemPackageCompactCardView = createView(
  (props: EcosystemPackageCardViewProps): Child => {
    const { pkg } = props
    const iconId = ecosystemPackageIcon(pkg)
    const { labelKey, tone } = ecosystemPackageStatusMeta(pkg)
    const descriptionKey = ecosystemPackageDescriptionKey(pkg)

    return h(
      'a',
      {
        href: ecosystemPackageDocHref(pkg.contentId),
        target: '_blank',
        rel: 'noopener noreferrer',
        class: card.root(),
      },
      [
        span({ class: card.header() }, [
          span({ class: card.icon() }, NavIcon(iconId, card.iconGlyph())),
          span({ class: card.status({ tone }) }, () => i18n.t(labelKey)),
        ]),
        span({ class: card.copy() }, [
          span({ class: card.name() }, pkg.shortName),
          p({ class: card.description() }, () => i18n.t(descriptionKey)),
        ]),
      ]
    )
  },
  'EcosystemPackageCompactCardView'
)
