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
import { heroPills } from '@entities/home/constants/home-landing.data'
import type { HomeVM } from '@entities/home/types/home.types'
import { HomeArchitectureView } from '@entities/home/ui/home-architecture.view'
import { homeButtonStyles } from '@entities/home/ui/home-button.styles'
import { HomeCtaView } from '@entities/home/ui/home-cta.view'
import { HomeSection } from '@entities/home/ui/home-section.view'
import { homeStyles } from '@entities/home/ui/home.view.styles'

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
            'Signal-first · Official docs',
          ]),
          h1({ class: home.heroTitle() }, [
            'Build faster with ',
            span({ class: home.heroTitleAccent() }, 'EchoJS'),
          ]),
          p({ class: home.heroSubtitle() }, [
            'A modern framework for scalable web apps — fine-grained signals, zero virtual DOM, and a composable ecosystem.',
          ]),
          div(
            { class: home.heroPills() },
            heroPills.map((pill) => span({ class: home.heroPill() }, pill))
          ),
          div({ class: home.heroActions() }, [
            NavLink({
              to: docPageByContentId['getting-started/installation']!,
              class: btn.primary(),
              children: 'Get Started',
            }),
            NavLink({
              to: docPageByContentId['introduction/what-is-echojs']!,
              class: btn.secondary(),
              children: 'What is EchoJS?',
            }),
          ]),
        ]),
      ]),

      div({ class: home.container() }, [
        HomeSection({
          eyebrow: 'Ecosystem',
          title: 'One framework, many packages',
          lead: 'Adopt incrementally — each package solves one problem and plugs in through providers.',
          children: EcosystemSection(),
        }),

        HomeSection({
          eyebrow: 'Structure',
          title: 'A full app in one tree',
          lead: 'Landing, nested workspace routes, async queries, URL state, forms, store, i18n, and UI primitives — every EchoJS package wired through providers and feature slices. Open any file.',
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
