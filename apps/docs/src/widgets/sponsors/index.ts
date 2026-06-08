export { SponsorsBoard } from '@widgets/sponsors/sponsors-board'
export { SponsorsSectionView } from '@widgets/sponsors/ui/sponsors-section.view'

import type { Child } from '@echojs-ecosystem/framework/hyperdom'

import { SponsorsSectionView } from '@widgets/sponsors/ui/sponsors-section.view'

export const SponsorsSection = (): Child => SponsorsSectionView()
