import {
  type Child,
  createView,
  div,
  p,
  span,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { docPageByContentId } from '@app/router'
import type { EcosystemPackage } from '@widgets/ecosystem/constants/ecosystem-packages.js'
import { ecosystemFeaturedPackageStyles } from '@widgets/ecosystem/ui/ecosystem-section.view.styles.js'

const featured = ecosystemFeaturedPackageStyles()

export const EcosystemFeaturedPackageCardView = createView(
  (pkg: EcosystemPackage): Child =>
    div({ class: featured.root() }, [
      div({ class: featured.glow() }),
      div({ class: featured.inner() }, [
        span({ class: featured.iconWrap() }, pkg.icon),
        div({ class: featured.copy() }, [
          div({ class: featured.eyebrow() }, [
            span({ class: featured.badge() }, 'Core'),
            span({ class: featured.label() }, 'Composition root'),
          ]),
          p({ class: featured.name() }, pkg.name),
          p({ class: featured.description() }, pkg.description),
        ]),
        div({ class: featured.actions() }, [
          NavLink({
            to: docPageByContentId[pkg.contentId]!,
            class: featured.link(),
            children: ['Read docs', span({ class: featured.linkArrow() }, '→')],
          }),
        ]),
      ]),
    ]),
  'EcosystemFeaturedPackageCardView'
)
