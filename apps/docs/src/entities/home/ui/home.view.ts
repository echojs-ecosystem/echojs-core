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
import { FrameworkComparisonSection } from '@widgets/framework-comparison'
import { HomeFooter } from '@widgets/home-shell'
import { HomeHeader } from '@widgets/home-shell/home-header'
import { PackageInstall } from '@widgets/package-install'
import { SponsorsSection } from '@widgets/sponsors'
import {
  heroPills,
  homeStats,
} from '@entities/home/constants/home-landing.data'
import type { HomeVM } from '@entities/home/types/home.types'
import { HomeArchitectureView } from '@entities/home/ui/home-architecture.view'
import { homeButtonStyles } from '@entities/home/ui/home-button.styles'
import { HomeCodeShowcaseView } from '@entities/home/ui/home-code-showcase.view'
import { HomeCtaView } from '@entities/home/ui/home-cta.view'
import { HomeHeroCodeWindowView } from '@entities/home/ui/home-hero-code-window.view'
import {
  HomePhilosophyBridgeView,
  HomePhilosophyPrinciplesView,
} from '@entities/home/ui/home-philosophy-principles.view'
import { HomeSection } from '@entities/home/ui/home-section.view'
import { HomeTestingView } from '@entities/home/ui/home-testing.view'
import { homeStyles } from '@entities/home/ui/home.view.styles'

const home = homeStyles()
const btn = homeButtonStyles()

export const HomeView = createView((vm: HomeVM): Child => {
  return div({ class: home.root() }, [
    div({ class: home.mesh() }),
    div({ class: home.glow() }),

    HomeHeader(),

    main({ class: home.main() }, [
      div({ class: home.container() }, [
        section({ class: home.hero() }, [
          div({ class: home.heroGrid() }, [
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
              div(
                { class: home.heroStats() },
                homeStats.map((stat) =>
                  div({ class: home.heroStat() }, [
                    p({ class: home.heroStatValue() }, stat.value),
                    p({ class: home.heroStatLabel() }, stat.label),
                  ])
                )
              ),
            ]),
            div({ class: home.heroVisual() }, [
              div({ class: home.heroVisualStack() }, [
                HomeHeroCodeWindowView(),
                PackageInstall(),
              ]),
            ]),
          ]),
        ]),

        HomeSection({
          eyebrow: 'Ecosystem',
          title: 'One framework, many packages',
          lead: 'Adopt incrementally — each package solves one problem and plugs in through providers.',
          children: EcosystemSection(),
        }),

        HomeSection({
          eyebrow: 'Architecture',
          title: 'A layered stack you can lint',
          lead: 'EchoJS apps often split code into layers — this site uses one example layout. Declare your own order in architect.config.ts and let Architect catch imports that break the rules you chose.',
          children: HomeArchitectureView(vm),
        }),

        HomeSection({
          eyebrow: 'Testing',
          title: 'Easy to test — models and views stay separate',
          lead: 'Logic lives in createModel, markup in createView. Unit-test behavior without a DOM tree; mount views only when UI wiring needs verification.',
          children: HomeTestingView(vm),
        }),

        HomeSection({
          eyebrow: 'Compare',
          title: 'EchoJS vs the mainstream',
          lead: [
            'React, Vue, Angular, Solid, and Svelte each made different bets. See the matrix below — then read ',
            NavLink({
              to: docPageByContentId['comparisons/react']!,
              class: home.archLink(),
              children: [
                'EchoJS vs React + ecosystem',
                span({ class: home.archLinkArrow() }, '→'),
              ],
            }),
            ' for architecture and state depth.',
          ],
          children: FrameworkComparisonSection(),
        }),

        HomeSection({
          eyebrow: 'Philosophy',
          title: 'Reactive by design, not by accident',
          lead: 'EchoJS updates the DOM surgically — then encodes that mindset in folder structure, providers, and typed routes so teams do not reinvent conventions per repo.',
          children: [
            HomePhilosophyBridgeView(),
            HomePhilosophyPrinciplesView(),
          ],
        }),

        HomeSection({
          eyebrow: 'Developer experience',
          title: 'Code-first DX',
          lead: 'Real snippets from how EchoJS apps are wired — pick a layer on the left, read the idea, inspect TypeScript on the right.',
          children: HomeCodeShowcaseView(vm),
        }),

        section({ class: 'relative pt-4' }, [HomeCtaView()]),

        SponsorsSection(),
        HomeFooter(),
      ]),
    ]),
  ])
}, 'HomeView')
