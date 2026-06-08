import { createModel } from '@echojs-ecosystem/framework/hyperdom'

import type { SponsorsVM } from '@entities/sponsors/types/sponsors.types'

export const createSponsorsModel = createModel(
  (): SponsorsVM => ({}),
  'SponsorsModel'
)
