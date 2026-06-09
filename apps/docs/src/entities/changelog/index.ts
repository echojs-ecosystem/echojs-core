import {
  type Child,
  createComponent,
} from '@echojs-ecosystem/framework/hyperdom'

import { createChangelogIndexModel } from '@entities/changelog/model/changelog-index.model'
import { createChangelogReleaseModel } from '@entities/changelog/model/changelog-release.model'
import type {
  ChangelogIndexProps,
  ChangelogReleaseProps,
} from '@entities/changelog/types/changelog.types'
import { ChangelogIndexView } from '@entities/changelog/ui/changelog-index.view'
import { ChangelogReleaseView } from '@entities/changelog/ui/changelog-release.view'

export {
  changelogReleases,
  findChangelogReleaseBySlug,
} from '@entities/changelog/constants/changelog.data'
export type { ChangelogRelease } from '@entities/changelog/types/changelog.types'
export { ChangelogIndexView } from '@entities/changelog/ui/changelog-index.view'
export { ChangelogReleaseView } from '@entities/changelog/ui/changelog-release.view'

export const ChangelogIndex = (props: ChangelogIndexProps): Child =>
  createComponent(createChangelogIndexModel(props), ChangelogIndexView, {
    name: 'ChangelogIndex',
  })()

export const ChangelogReleaseArticle = (props: ChangelogReleaseProps): Child =>
  createComponent(createChangelogReleaseModel(props), ChangelogReleaseView, {
    name: 'ChangelogReleaseArticle',
  })()
