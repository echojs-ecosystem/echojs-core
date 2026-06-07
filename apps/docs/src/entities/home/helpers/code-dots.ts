import { span } from '@echojs-ecosystem/framework/hyperdom'

import { homeHeroCodeWindowStyles } from '@entities/home/ui/home-hero-code-window.view.styles.js'

export const codeDots = () => {
  const home = homeHeroCodeWindowStyles()

  return [
    span({ class: [home.codeDot(), home.codeDotRed()].join(' ') }),
    span({ class: [home.codeDot(), home.codeDotYellow()].join(' ') }),
    span({ class: [home.codeDot(), home.codeDotGreen()].join(' ') }),
  ]
}
