import { createComponent, type Child } from '@echojs-ecosystem/framework/hyperdom'

import type { EcosystemPackage } from '@widgets/ecosystem/constants/ecosystem-packages'
import { createEcosystemModel } from '@widgets/ecosystem/model/ecosystem.model'
import { EcosystemPackageCardView } from '@widgets/ecosystem/ui/ecosystem-package-card.view'
import { EcosystemSectionView } from '@widgets/ecosystem/ui/ecosystem-section.view'

export const EcosystemPackageCard = (pkg: EcosystemPackage): Child =>
  EcosystemPackageCardView({ pkg })

export const EcosystemSection = createComponent(
  createEcosystemModel,
  EcosystemSectionView,
  { name: 'EcosystemSection' }
)
