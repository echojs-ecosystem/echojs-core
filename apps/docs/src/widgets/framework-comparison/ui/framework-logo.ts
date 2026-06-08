import { type Child, img } from '@echojs-ecosystem/framework/hyperdom'

import type { FrameworkId } from '@widgets/framework-comparison/constants/framework-comparison.data'
import {
  frameworkLogoAlt,
  frameworkLogoSrc,
} from '@widgets/framework-comparison/constants/framework-logos'
import { cn } from '@core/styles/cn'

export type FrameworkLogoProps = {
  id: FrameworkId
  className?: string
}

export const FrameworkLogo = ({ id, className }: FrameworkLogoProps): Child =>
  img({
    src: frameworkLogoSrc[id],
    alt: frameworkLogoAlt[id],
    width: 24,
    height: 24,
    loading: 'lazy',
    decoding: 'async',
    class: cn('h-6 w-6 shrink-0 object-contain', className),
  })
