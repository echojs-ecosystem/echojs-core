import { createComponent } from '@echojs-ecosystem/framework/hyperdom'

import { createSponsorsModel } from '@entities/sponsors/model/sponsors.model'
import { SponsorsView } from '@entities/sponsors/ui/sponsors.view'

export { createSponsorsModel } from '@entities/sponsors/model/sponsors.model'
export type { SponsorsVM } from '@entities/sponsors/types/sponsors.types'
export { SponsorsView } from '@entities/sponsors/ui/sponsors.view'

export const Sponsors = createComponent(createSponsorsModel, SponsorsView, {
  name: 'Sponsors',
})
