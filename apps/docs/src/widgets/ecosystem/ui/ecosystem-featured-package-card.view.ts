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
import {
  ecosystemPackageIcon,
  type EcosystemPackage,
} from '@widgets/ecosystem/constants/ecosystem-packages'
import { ecosystemFeaturedPackageStyles } from '@widgets/ecosystem/ui/ecosystem-section.view.styles'
import { NavIcon } from '@widgets/icons'
import { i18n } from '@core/providers'

const featured = ecosystemFeaturedPackageStyles()

export const EcosystemFeaturedPackageCardView = createView(
  (pkg: EcosystemPackage): Child =>
    div({ class: featured.root() }, [
      div({ class: featured.glow() }),
      div({ class: featured.inner() }, [
        span(
          { class: featured.iconWrap() },
          NavIcon(ecosystemPackageIcon(pkg), featured.iconGlyph())
        ),
        div({ class: featured.copy() }, [
          div({ class: featured.eyebrow() }, [
            span({ class: featured.badge() }, () => i18n.t('ecosystem.featured.core')),
            span({ class: featured.label() }, () =>
              i18n.t('ecosystem.featured.compositionRoot')
            ),
          ]),
          p({ class: featured.name() }, pkg.name),
          p({ class: featured.description() }, () =>
            i18n.t(ecosystemPackageDescriptionKey(pkg))
          ),
        ]),
        div({ class: featured.actions() }, [
          NavLink({
            to: docPageByContentId[pkg.contentId]!,
            class: featured.link(),
            children: [
              () => i18n.t('ecosystem.featured.readDocs'),
              span({ class: featured.linkArrow() }, '→'),
            ],
          }),
        ]),
      ]),
    ]),
  'EcosystemFeaturedPackageCardView'
)
