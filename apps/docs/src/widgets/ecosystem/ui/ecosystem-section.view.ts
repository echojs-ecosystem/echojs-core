import {
  type Child,
  createView,
  div,
  p,
} from '@echojs-ecosystem/framework/hyperdom'

import {
  ecosystemFrameworkPackage,
  ecosystemModulePackages,
} from '@widgets/ecosystem/constants/ecosystem-packages'
import { EcosystemFeaturedPackageCardView } from '@widgets/ecosystem/ui/ecosystem-featured-package-card.view'
import { EcosystemPackageCardView } from '@widgets/ecosystem/ui/ecosystem-package-card.view'
import { ecosystemSectionStyles } from '@widgets/ecosystem/ui/ecosystem-section.view.styles'

const section = ecosystemSectionStyles()

export const EcosystemSectionView = createView(
  (_vm: void): Child =>
    div({ class: section.root() }, [
      EcosystemFeaturedPackageCardView(ecosystemFrameworkPackage),
      p({ class: section.divider() }, 'Ecosystem modules'),
      div(
        { class: section.grid() },
        ecosystemModulePackages.map((pkg) => EcosystemPackageCardView({ pkg }))
      ),
    ]),
  'EcosystemSectionView'
)
