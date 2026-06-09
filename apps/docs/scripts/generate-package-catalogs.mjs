#!/usr/bin/env node
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { packageApiManifests } from './package-api-manifests.mjs'

const OUT = join(import.meta.dirname, '..', 'src/core/content/package-api-catalogs.generated.ts')

const lines = [
  '/** Auto-generated from package-api-manifests.mjs — do not edit by hand. */',
  '',
]

for (const [packageId, manifest] of Object.entries(packageApiManifests)) {
  const varName = `${packageId.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}DocCategories`
  lines.push(`export const ${varName} = [`)
  for (const cat of manifest.categories) {
    lines.push('  {')
    lines.push(`    id: '${cat.id}',`)
    lines.push(`    title: '${cat.title.replace(/'/g, "\\'")}',`)
    lines.push('    entries: [')
    for (const page of cat.pages) {
      const desc = (page.description ?? `${page.name} — see API page.`).replace(/'/g, "\\'")
      lines.push(
        `      { slug: '${page.slug}', name: '${page.name.replace(/'/g, "\\'")}', description: '${desc}' },`,
      )
    }
    lines.push('    ],')
    lines.push('  },')
  }
  lines.push('] as const', '')
}

lines.push(
  'export type PackageApiDocCategory = {',
  '  id: string',
  '  title: string',
  '  entries: readonly { slug: string; name: string; description: string }[]',
  '}',
  '',
  'export const packageApiDocCategoriesById = {',
)

for (const packageId of Object.keys(packageApiManifests)) {
  const varName = `${packageId.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}DocCategories`
  lines.push(`  '${packageId}': ${varName},`)
}

lines.push('} as const satisfies Record<string, readonly PackageApiDocCategory[]>', '')

writeFileSync(OUT, lines.join('\n'))
console.log('wrote', OUT)
