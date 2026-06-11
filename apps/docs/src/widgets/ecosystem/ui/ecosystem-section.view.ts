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
import { ecosystemSectionStyles } from '@widgets/ecosystem/ui/ecosystem-section.view.styles'
import { i18n } from '@core/providers'

const section = ecosystemSectionStyles()

export const EcosystemSectionView = createView(
  (vm: EcosystemVM): Child =>
    div({ class: section.root() }, [
      EcosystemFeaturedPackageCardView(ecosystemFrameworkPackage),
      p({ class: section.divider() }, () => i18n.t('ecosystem.modulesDivider')),
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
                  () => i18n.t('ecosystem.showLess'),
                  span({ class: section.expandChevron() }, '⌃'),
                ]
              : [
                  () =>
                    i18n.t('ecosystem.showMore', {
                      count: ecosystemMorePackages.length,
                    }),
                  span({ class: section.expandChevron() }, '⌄'),
                ]
        ),
        NavLink({
          to: docPageByContentId['packages/framework']!,
          class: section.browseLink(),
          children: [
            () => i18n.t('ecosystem.browseAll'),
            span(null, '→'),
          ],
        }),
      ]),
      div(
        { class: section.desktopGrid() },
        ecosystemModulePackages.map((pkg) =>
          EcosystemPackageCompactCardView({ pkg })
        )
      ),
    ]),
  'EcosystemSectionView'
)
