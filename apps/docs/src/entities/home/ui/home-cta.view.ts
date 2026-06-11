import {
  type Child,
  createView,
  div,
  h2,
  p,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { docPageByContentId } from '@app/router'
import { homeButtonStyles } from '@entities/home/ui/home-button.styles'
import { homeCtaStyles } from '@entities/home/ui/home-cta.view.styles'
import { i18n } from '@core/providers'

const home = homeCtaStyles()
const btn = homeButtonStyles()

export const HomeCtaView = createView(
  (_vm: void): Child =>
    div({ class: home.cta() }, [
      div({ class: home.ctaMesh() }),
      div({ class: home.ctaGlow() }),

      div({ class: home.ctaTop() }, [
        div({ class: home.ctaCopy() }, [
          p({ class: home.ctaEyebrow() }, () => i18n.t('home.cta.eyebrow')),
          h2({ class: home.ctaTitle() }, () => i18n.t('home.cta.title')),
          p({ class: home.ctaBody() }, () => i18n.t('home.cta.body')),
        ]),
        div({ class: home.ctaActions() }, [
          NavLink({
            to: docPageByContentId['getting-started/first-application']!,
            class: btn.primary(),
            children: () => i18n.t('home.cta.startBuilding'),
          }),
          NavLink({
            to: docPageByContentId['introduction/what-is-echojs']!,
            class: btn.secondary(),
            children: () => i18n.t('home.cta.whatIsEcho'),
          }),
        ]),
      ]),
    ]),
  'HomeCtaView'
)
