import type { PackagePlaygroundDef } from './types'
import { hyperdomPlayground } from './playgrounds/hyperdom.playground'
import { i18nPlayground } from './playgrounds/i18n.playground'
import { persistPlayground } from './playgrounds/persist.playground'
import { asyncPlayground } from './playgrounds/async.playground'
import { reactivityPlayground } from './playgrounds/reactivity.playground'
import { routerPlayground } from './playgrounds/router.playground'
import { storePlayground } from './playgrounds/store.playground'
import { createStubPlayground } from './playgrounds/stub.playground'
import { urlStatePlayground } from './playgrounds/url-state.playground'
import { utilsPlayground } from './playgrounds/utils.playground'

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
  createStubPlayground(
    'network-http',
    'Network / HTTP',
    'Interactive HTTP playground ships in a follow-up — use Examples for copy-paste patterns.'
  ),
]

const all: PackagePlaygroundDef[] = [
  reactivityPlayground,
  hyperdomPlayground,
  routerPlayground,
  storePlayground,
  asyncPlayground,
  urlStatePlayground,
  persistPlayground,
  i18nPlayground,
  utilsPlayground,
  ...stubs,
]

const byId = new Map(all.map((p) => [p.id, p]))

export const getPackagePlayground = (
  id: string
): PackagePlaygroundDef | undefined => byId.get(id)

export const packagePlaygroundIds = all.map((p) => p.id)
