import {
  type Child,
  createView,
  div,
  h2,
  p,
  span,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { docPageByContentId } from '@app/router'
import { PackageInstall } from '@widgets/package-install'
import { homeButtonStyles } from '@entities/home/ui/home-button.styles.js'
import { homeCtaStyles } from '@entities/home/ui/home-cta.view.styles.js'

const home = homeCtaStyles()
const btn = homeButtonStyles()

const ctaSteps = [
  { n: '1', label: 'Install' },
  { n: '2', label: 'Bootstrap' },
  { n: '3', label: 'Ship a route' },
] as const

export const HomeCtaView = createView(
  (_vm: void): Child =>
    div({ class: home.cta() }, [
      div({ class: home.ctaMesh() }),
      div({ class: home.ctaGlow() }),

      div({ class: home.ctaTop() }, [
        div({ class: home.ctaCopy() }, [
          p({ class: home.ctaEyebrow() }, 'Next step'),
          h2({ class: home.ctaTitle() }, 'Ready to build with EchoJS?'),
          p({ class: home.ctaBody() }, [
            'Scaffold a project, wire providers once, and open your first typed route — the same flow as ',
            span({ class: home.ctaBodyEm() }, 'apps/docs'),
            ' and ',
            span({ class: home.ctaBodyEm() }, 'apps/example'),
            '.',
          ]),
        ]),
        div({ class: home.ctaActions() }, [
          NavLink({
            to: docPageByContentId['getting-started/first-application']!,
            class: btn.primary(),
            children: 'Start building',
          }),
          NavLink({
            to: docPageByContentId['introduction/what-is-echojs']!,
            class: btn.secondary(),
            children: 'What is EchoJS?',
          }),
        ]),
      ]),
    ]),
  'HomeCtaView'
)
