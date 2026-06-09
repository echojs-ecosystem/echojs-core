import { createModel } from '@echojs-ecosystem/framework/hyperdom'

import type {
  ChangelogIndexProps,
  ChangelogIndexVM,
} from '@entities/changelog/types/changelog.types'

export const createChangelogIndexModel = (props: ChangelogIndexProps) =>
  createModel(
    (): ChangelogIndexVM => ({
      releases: props.releases,
      releasePage: props.releasePage,
    }),
    'ChangelogIndexModel'
  )
