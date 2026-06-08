import {
  type Child,
  createView,
  div,
  span,
} from '@echojs-ecosystem/framework/hyperdom'

import { vdomCompare } from '@entities/home/constants/home-landing.data'
import { HomeCompareCardView } from '@entities/home/ui/home-compare-card.view'
import { frameworkStrengthStyles } from '@entities/home/ui/home-framework-strength.view.styles'

const strength = frameworkStrengthStyles()

export const HomeFrameworkStrengthView = createView(
  (_vm: void): Child =>
    div({ class: strength.root() }, [
      div({ class: strength.glow() }),
      div({ class: strength.grid() }, [
        HomeCompareCardView({ tone: 'muted', data: vdomCompare.traditional }),
        div({ class: strength.echoWrap() }, [
          span({ class: strength.echoBadge() }, 'EchoJS'),
          HomeCompareCardView({ tone: 'accent', data: vdomCompare.echojs }),
        ]),
      ]),
    ]),
  'HomeFrameworkStrengthView'
)
