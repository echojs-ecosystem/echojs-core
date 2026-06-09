import type { DocsNavSection } from '../../types'

import { apiNavSection } from './api'
import { architectureNavSection } from './architecture'
import { comparisonsNavSection } from './comparisons'
import { examplesNavSection } from './examples'
import { gettingStartedNavSection } from './getting-started'
import { guidesNavSection } from './guides'
import { packagesNavSection } from './packages'

export {
  apiNavSection,
  architectureNavSection,
  comparisonsNavSection,
  examplesNavSection,
  gettingStartedNavSection,
  guidesNavSection,
  packagesNavSection,
}

/** Sidebar section order — one file per section under `sections/`. */
export const docsNavSections: DocsNavSection[] = [
  gettingStartedNavSection,
  architectureNavSection,
  guidesNavSection,
  packagesNavSection,
  comparisonsNavSection,
  examplesNavSection,
  apiNavSection,
]
