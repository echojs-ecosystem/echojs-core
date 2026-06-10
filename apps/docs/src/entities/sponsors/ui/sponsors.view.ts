import {
  type Child,
  createView,
  div,
  h,
  h1,
  main,
  p,
} from '@echojs-ecosystem/framework/hyperdom'

import { HomeFooter } from '@widgets/home-shell'
import { HomeHeader } from '@widgets/home-shell/home-header'
import { becomeSponsorUrl } from '@widgets/sponsors/constants/sponsors.data'
import { SponsorsBoard } from '@widgets/sponsors/sponsors-board'
import { homeButtonStyles } from '@entities/home/ui/home-button.styles'
import type { SponsorsVM } from '@entities/sponsors/types/sponsors.types'
import { sponsorsPageStyles } from '@entities/sponsors/ui/sponsors.view.styles'

const page = sponsorsPageStyles()
const btn = homeButtonStyles()

export const SponsorsView = createView(
  (_vm: SponsorsVM): Child =>
    div({ class: page.page() }, [
      HomeHeader(),
      div({ class: page.root() }, [
        div({ class: page.mesh() }),
        main({ class: page.main() }, [
        div({ class: page.container() }, [
          div({ class: page.header() }, [
            h1({ class: page.title() }, 'Sponsors'),
            p({ class: page.lead() }, [
              'EchoJS is free and open source thanks to sponsors who fund documentation, CI, and core package maintenance. Join them and get your brand in front of thousands of developers.',
            ]),
          ]),
          div({ class: page.tiers() }, [SponsorsBoard({ variant: 'full' })]),
          div({ class: page.ctaBlock() }, [
            p({ class: page.ctaTitle() }, 'Support the ecosystem'),
            p({ class: page.ctaBody() }, [
              'Gold, Silver, and Bronze tiers include logo placement on the docs site, README mentions, and community recognition.',
            ]),
            div({ class: page.ctaActions() }, [
              h(
                'a',
                {
                  href: becomeSponsorUrl,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  class: btn.primary(),
                },
                'Become a sponsor'
              ),
              h(
                'a',
                {
                  href: 'mailto:sponsors@echojs.dev',
                  class: btn.secondary(),
                },
                'Contact us'
              ),
            ]),
          ]),
          HomeFooter(),
        ]),
        ]),
      ]),
    ]),
  'SponsorsView'
)
