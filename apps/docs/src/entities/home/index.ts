import { createComponent } from '@echojs-ecosystem/framework/hyperdom'

import { createHomeModel } from '@entities/home/model/home.model.js'
import { HomeView } from '@entities/home/ui/home.view.js'

export { createHomeModel } from '@entities/home/model/home.model.js'
export type {
  CodeTab,
  CompareCardData,
  CompareCardViewProps,
  CompareTone,
  HomeVM,
} from '@entities/home/types/home.types.js'
export { HomeView } from '@entities/home/ui/home.view.js'
export { HomeCompareCardView } from '@entities/home/ui/home-compare-card.view.js'
export { HomeCodeShowcaseView } from '@entities/home/ui/home-code-showcase.view.js'
export { HomeCtaView } from '@entities/home/ui/home-cta.view.js'
export { HomeHeroCodeWindowView } from '@entities/home/ui/home-hero-code-window.view.js'
export { HomeArchitectureView } from '@entities/home/ui/home-architecture.view.js'
export { HomeSection } from '@entities/home/ui/home-section.view.js'
export {
  HomePhilosophyBridgeView,
  HomePhilosophyPrinciplesView,
} from '@entities/home/ui/home-philosophy-principles.view.js'

export const Home = createComponent(createHomeModel, HomeView, { name: 'Home' })
