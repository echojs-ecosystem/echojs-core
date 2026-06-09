import { activeElementDemo } from '@widgets/util-demo/demos/active-element.demo'
import type { UtilDemoDef } from '@widgets/util-demo/types'

const all: UtilDemoDef[] = [activeElementDemo]

const bySlug = new Map(all.map((d) => [d.slug, d]))

export const getUtilDemo = (slug: string): UtilDemoDef | undefined => bySlug.get(slug)
