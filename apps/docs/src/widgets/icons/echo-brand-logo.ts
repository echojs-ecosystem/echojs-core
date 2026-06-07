import { type Child, img } from '@echojs-ecosystem/framework/hyperdom'

import { cn } from '@core/styles/cn.js'

export const echoBrandLogoSrc = '/framework-logos/echojs.svg'

export type EchoBrandLogoProps = {
  className?: string
  size?: number
}

export const EchoBrandLogo = ({
  className,
  size = 24,
}: EchoBrandLogoProps): Child =>
  img({
    src: echoBrandLogoSrc,
    alt: 'EchoJS',
    width: size,
    height: size,
    decoding: 'async',
    class: cn('shrink-0 object-contain', className),
  })
