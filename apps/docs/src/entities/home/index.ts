import { createComponent } from '@echojs-ecosystem/framework/hyperdom'

import { createHomeModel } from '@entities/home/model/home.model'
import { HomeView } from '@entities/home/ui/home.view'

export { createHomeModel } from '@entities/home/model/home.model'
export type {
  CodeTab,
  CompareCardData,
  CompareCardViewProps,
  CompareTone,
  HomeVM,
} from '@entities/home/types/home.types'
export { HomeView } from '@entities/home/ui/home.view'
export { HomeCompareCardView } from '@entities/home/ui/home-compare-card.view'
export { HomeCtaView } from '@entities/home/ui/home-cta.view'
export { HomeHeroCodeWindowView } from '@entities/home/ui/home-hero-code-window.view'
export { HomeArchitectureView } from '@entities/home/ui/home-architecture.view'
export { HomeSection } from '@entities/home/ui/home-section.view'

export const Home = createComponent(createHomeModel, HomeView, { name: 'Home' })
