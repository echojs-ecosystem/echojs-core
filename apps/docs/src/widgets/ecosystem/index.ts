import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import type { EcosystemPackage } from '@widgets/ecosystem/constants/ecosystem-packages'
import { EcosystemPackageCardView } from '@widgets/ecosystem/ui/ecosystem-package-card.view'
import { EcosystemSectionView } from '@widgets/ecosystem/ui/ecosystem-section.view'

export const EcosystemPackageCard = (pkg: EcosystemPackage): Child =>
  EcosystemPackageCardView({ pkg })

export const EcosystemSection = (): Child => EcosystemSectionView()
