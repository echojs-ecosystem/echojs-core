import {
  type Child,
  createView,
  div,
  h1,
  main,
  p,
  section,
  span,
} from '@echojs-ecosystem/framework/hyperdom'
import { NavLink } from '@echojs-ecosystem/framework/router'

import { docPageByContentId } from '@app/router'
import { EcosystemSection } from '@widgets/ecosystem'
import { HomeFooter } from '@widgets/home-shell'
import { HomeHeader } from '@widgets/home-shell/home-header'
import { SponsorsSection } from '@widgets/sponsors'
import type { HomeVM } from '@entities/home/types/home.types'
import { HomeArchitectureView } from '@entities/home/ui/home-architecture.view'
import { homeButtonStyles } from '@entities/home/ui/home-button.styles'
import { HomeCtaView } from '@entities/home/ui/home-cta.view'
import { HomeSection } from '@entities/home/ui/home-section.view'
import { homeStyles } from '@entities/home/ui/home.view.styles'
import { i18n } from '@core/providers'

const home = homeStyles()
const btn = homeButtonStyles()

export const HomeView = createView((vm: HomeVM): Child => {
  return div({ class: home.page() }, [
    HomeHeader(),
    div({ class: home.shell() }, [
      div({ class: home.mesh() }),
      div({ class: home.glow() }),

      main({ class: home.main() }, [
        section({ class: home.hero() }, [
          div({ class: home.heroContent() }, [
            p({ class: home.heroBadge() }, [
              span({ class: home.heroBadgeDot() }),
              () => i18n.t('home.hero.badge'),
            ]),
            h1({ class: home.heroTitle() }, [
              () => i18n.t('home.hero.titlePrefix'),
              span({ class: home.heroTitleAccent() }, 'EchoJS'),
            ]),
            p({ class: home.heroSubtitle() }, () => i18n.t('home.hero.subtitle')),
            div({ class: home.heroPills() }, [
              span({ class: home.heroPill() }, () => i18n.t('home.hero.pillSignals')),
              span({ class: home.heroPill() }, () =>
                i18n.t('home.hero.pillNoReconciliation')
              ),
              span({ class: home.heroPill() }, () => i18n.t('home.hero.pillTypedRoutes')),
            ]),
            div({ class: home.heroActions() }, [
              NavLink({
                to: docPageByContentId['getting-started/installation']!,
                class: btn.primary(),
                children: () => i18n.t('home.hero.getStarted'),
              }),
              NavLink({
                to: docPageByContentId['introduction/what-is-echojs']!,
                class: btn.secondary(),
                children: () => i18n.t('home.hero.whatIsEcho'),
              }),
            ]),
          ]),
        ]),

        div({ class: home.container() }, [
          HomeSection({
            eyebrow: () => i18n.t('home.ecosystem.eyebrow'),
            title: () => i18n.t('home.ecosystem.title'),
            lead: () => i18n.t('home.ecosystem.lead'),
            children: EcosystemSection(),
          }),

          HomeSection({
            eyebrow: () => i18n.t('home.structure.eyebrow'),
            title: () => i18n.t('home.structure.title'),
            lead: () => i18n.t('home.structure.lead'),
            children: HomeArchitectureView(vm),
          }),

          section({ class: 'relative pt-4' }, [HomeCtaView()]),

          SponsorsSection(),
          HomeFooter(),
        ]),
      ]),
    ]),
  ])
}, 'HomeView')
