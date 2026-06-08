import { type Child, span } from '@echojs-ecosystem/framework/hyperdom'

import type { MockSponsor } from '@widgets/sponsors/constants/sponsors.data'
import { sponsorLogoStyles } from '@widgets/sponsors/sponsor-logo.styles'
import { cn } from '@core/styles/cn'

type SponsorLogoProps = {
  sponsor: Pick<MockSponsor, 'initials' | 'name' | 'logoGradient'>
  size?: 'gold' | 'silver' | 'bronze'
}

export const SponsorLogo = ({
  sponsor,
  size = 'silver',
}: SponsorLogoProps): Child => {
  const logo = sponsorLogoStyles({ size })
  return span(
    { class: cn(logo.root(), `bg-gradient-to-br ${sponsor.logoGradient}`) },
    [span({ class: logo.label() }, sponsor.name), sponsor.initials]
  )
}
