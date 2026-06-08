import {
  type Child,
  createComponent,
} from '@echojs-ecosystem/framework/hyperdom'

import {
  createSiteHeaderModel,
  type SiteHeaderOptions,
} from './model/site-header.model'
import { SiteHeaderView } from './ui/site-header.view'

export type {
  SiteHeaderMode,
  SiteHeaderOptions,
} from './model/site-header.model'

export const SiteHeader = (options: SiteHeaderOptions = {}): Child =>
  createComponent(createSiteHeaderModel(options), SiteHeaderView, {
    name: 'SiteHeader',
  })()

export const HomeHeader = (): Child => SiteHeader({ mode: 'home' })
