import { type Child, div } from '@echojs-ecosystem/framework/hyperdom'

import {
  goldTier,
  sponsorTierGroups,
} from '@widgets/sponsors/constants/sponsors.data'
import { sponsorsBoardStyles } from '@widgets/sponsors/sponsors-board.styles'
import { SponsorsTierPanel } from '@widgets/sponsors/sponsors-tier-panel'

const board = sponsorsBoardStyles()

type SponsorsBoardProps = {
  variant?: 'full' | 'preview'
}

export const SponsorsBoard = ({
  variant = 'full',
}: SponsorsBoardProps): Child => {
  if (variant === 'preview') {
    return div({ class: board.stack() }, [
      SponsorsTierPanel({
        group: goldTier,
        showPlaceholder: true,
        maxSponsors: 3,
      }),
    ])
  }

  return div(
    { class: board.stack() },
    sponsorTierGroups.map((group) => SponsorsTierPanel({ group }))
  )
}
