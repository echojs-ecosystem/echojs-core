import type { PackagePlaygroundDef } from './types.js'
import { hyperdomPlayground } from './playgrounds/hyperdom.playground.js'
import { i18nPlayground } from './playgrounds/i18n.playground.js'
import { persistPlayground } from './playgrounds/persist.playground.js'
import { queryPlayground } from './playgrounds/query.playground.js'
import { reactivityPlayground } from './playgrounds/reactivity.playground.js'
import { routerPlayground } from './playgrounds/router.playground.js'
import { storePlayground } from './playgrounds/store.playground.js'
import { createStubPlayground } from './playgrounds/stub.playground.js'
import { urlStatePlayground } from './playgrounds/url-state.playground.js'

const stubs: PackagePlaygroundDef[] = [
  createStubPlayground(
    'framework',
    'Framework',
    'Full app bootstrap is best explored in the interactive lab (apps/example).'
  ),
  createStubPlayground(
    'ui',
    'UI',
    'Component playground will ship with @echojs-ecosystem/framework/ui Storybook integration.'
  ),
  createStubPlayground(
    'devtools',
    'DevTools',
    'Runtime registry and timeline — enable with setDevtoolsEnabled(import.meta.env.DEV).'
  ),
  createStubPlayground(
    'cli',
    'CLI',
    '@echojs-ecosystem/cli is not released yet.'
  ),
]

const all: PackagePlaygroundDef[] = [
  reactivityPlayground,
  hyperdomPlayground,
  routerPlayground,
  storePlayground,
  queryPlayground,
  urlStatePlayground,
  persistPlayground,
  i18nPlayground,
  ...stubs,
]

const byId = new Map(all.map((p) => [p.id, p]))

export const getPackagePlayground = (
  id: string
): PackagePlaygroundDef | undefined => byId.get(id)

export const packagePlaygroundIds = all.map((p) => p.id)
