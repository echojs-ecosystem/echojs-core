import {
  button,
  type Child,
  createView,
  div,
  p,
  Show,
  span,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { docPageByContentId } from '@app/router'
import {
  ecosystemFrameworkPackage,
  ecosystemModulePackages,
  ecosystemMorePackages,
  ecosystemSpotlightPackages,
} from '@widgets/ecosystem/constants/ecosystem-packages'
import type { EcosystemVM } from '@widgets/ecosystem/model/ecosystem.model'
import { EcosystemFeaturedPackageCardView } from '@widgets/ecosystem/ui/ecosystem-featured-package-card.view'
import { EcosystemPackageCompactCardView } from '@widgets/ecosystem/ui/ecosystem-package-compact-card.view'
import { EcosystemPackageCardView } from '@widgets/ecosystem/ui/ecosystem-package-card.view'
import { ecosystemSectionStyles } from '@widgets/ecosystem/ui/ecosystem-section.view.styles'

const section = ecosystemSectionStyles()

export const EcosystemSectionView = createView(
  (vm: EcosystemVM): Child =>
    div({ class: section.root() }, [
      EcosystemFeaturedPackageCardView(ecosystemFrameworkPackage),
      p({ class: section.divider() }, 'Ecosystem modules'),
      div({ class: section.mobileGrid() }, [
        ...ecosystemSpotlightPackages.map((pkg) =>
          EcosystemPackageCompactCardView({ pkg })
        ),
        Show(
          () => vm.showAllModules(),
          () =>
            ecosystemMorePackages.map((pkg) =>
              EcosystemPackageCompactCardView({ pkg })
            )
        ),
      ]),
      div({ class: section.mobileFooter() }, [
        button(
          {
            type: 'button',
            class: section.expandButton(),
            onClick: vm.toggleAllModules,
          },
          () =>
            vm.showAllModules()
              ? [
                  'Show less',
                  span({ class: section.expandChevron() }, '⌃'),
                ]
              : [
                  `Show ${ecosystemMorePackages.length} more packages`,
                  span({ class: section.expandChevron() }, '⌄'),
                ]
        ),
        NavLink({
          to: docPageByContentId['packages/framework']!,
          class: section.browseLink(),
          children: ['Browse all packages', span(null, '→')],
        }),
      ]),
      div(
        { class: section.grid() },
        ecosystemModulePackages.map((pkg) => EcosystemPackageCardView({ pkg }))
      ),
    ]),
  'EcosystemSectionView'
)
