import type { DocsNavSection } from '../../types'

import { architectureNavSection } from './architecture'
import { bestPracticesNavSection } from './best-practices'
import { comparisonsNavSection } from './comparisons'
import { examplesNavSection } from './examples'
import { gettingStartedNavSection } from './getting-started'
import { guidesNavSection } from './guides'
import { packagesNavSection } from './packages'

export {
  architectureNavSection,
  bestPracticesNavSection,
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
  bestPracticesNavSection,
  comparisonsNavSection,
  examplesNavSection,
]
