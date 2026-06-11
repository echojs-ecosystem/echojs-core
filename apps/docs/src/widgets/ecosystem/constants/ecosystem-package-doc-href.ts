import { docHref } from '@core/content/nav'
import type { ContentId } from '@core/content/types'

export const ecosystemPackageDocHref = (contentId: ContentId): string =>
  docHref(contentId)
