import { createComponent } from '@echojs-ecosystem/framework/hyperdom'

import { createSponsorsModel } from '@entities/sponsors/model/sponsors.model.js'
import { SponsorsView } from '@entities/sponsors/ui/sponsors.view.js'

export { createSponsorsModel } from '@entities/sponsors/model/sponsors.model.js'
export type { SponsorsVM } from '@entities/sponsors/types/sponsors.types.js'
export { SponsorsView } from '@entities/sponsors/ui/sponsors.view.js'

export const Sponsors = createComponent(createSponsorsModel, SponsorsView, {
  name: 'Sponsors',
})
