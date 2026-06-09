import { createModel } from '@echojs-ecosystem/framework/hyperdom'

import { findChangelogReleaseBySlug } from '@entities/changelog/constants/changelog.data'
import type {
  ChangelogReleaseProps,
  ChangelogReleaseVM,
} from '@entities/changelog/types/changelog.types'

export const createChangelogReleaseModel = (props: ChangelogReleaseProps) =>
  createModel(
    (): ChangelogReleaseVM => ({
      slug: props.slug,
      release: findChangelogReleaseBySlug(props.slug) ?? null,
      indexPage: props.indexPage,
    }),
    'ChangelogReleaseModel'
  )
