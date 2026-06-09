#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { renderApiPage } from './lib/render-api-page.mjs'
import { parseExistingApiPage } from './lib/parse-existing-api.mjs'
import { packageApiManifests } from './package-api-manifests.mjs'

const ROOT = join(import.meta.dirname, '..')
const CONTENT = join(ROOT, 'src/content/packages')

const generatePackage = (packageId, manifest) => {
  const apiDir = join(CONTENT, packageId, 'api')
  mkdirSync(apiDir, { recursive: true })

  let count = 0
  for (const category of manifest.categories) {
    for (const page of category.pages) {
      const srcPath = join(apiDir, `${page.slug}.md`)
      const parsed = existsSync(srcPath)
        ? parseExistingApiPage(readFileSync(srcPath, 'utf8'), page.name)
        : {
            name: page.name,
            description: page.description ?? `${page.name} API.`,
            types: `export const ${page.name.replace(/[^a-zA-Z0-9]/g, '')}: unknown`,
            usage: `import { /* ${page.name} */ } from '${manifest.importBadge}'`,
          }

      const doc = {
        slug: page.slug,
        name: page.name,
        description:
          page.description ??
          (parsed.description || `${page.name} — ${category.title} API.`),
        usage: page.usage ?? parsed.usage.replace(/@echojs-ecosystem\/PACKAGE/g, manifest.importBadge),
        types: page.types ?? parsed.types,
        importBadge: page.importBadge ?? manifest.importBadge,
        isModule: page.isModule,
        params: page.params,
        returns: page.returns,
        related: page.related,
        keywords: page.keywords ?? [page.name, packageId],
      }

      writeFileSync(join(apiDir, `${page.slug}.md`), renderApiPage(doc, packageId, manifest.npmPackage))
      count++
      console.log(`  ${page.slug}`)
    }
  }

  writeFunctionsIndex(packageId, manifest)
  return count
}

const writeFunctionsIndex = (packageId, manifest) => {
  const lines = [
    '---',
    'title: Functions',
    `description: Index of all ${manifest.npmPackage} exports by category.`,
    `package: '${manifest.npmPackage}'`,
    '---',
    '',
    '# Functions',
    '',
    `:::install ${manifest.npmPackage}`,
    '',
  ]

  for (const category of manifest.categories) {
    lines.push(`## ${category.title}`, '', '| Export | Page |', '| ------ | ---- |')
    for (const page of category.pages) {
      lines.push(`| ${page.name} | [${page.name}](/docs/packages/${packageId}/api/${page.slug}) |`)
    }
    lines.push('')
  }

  writeFileSync(join(CONTENT, packageId, 'functions.md'), lines.join('\n').trimEnd() + '\n')
}

const target = process.argv[2]
const ids = target ? [target] : Object.keys(packageApiManifests)

let total = 0
for (const id of ids) {
  const manifest = packageApiManifests[id]
  if (!manifest) {
    console.error('Unknown package:', id)
    process.exit(1)
  }
  console.log(id)
  total += generatePackage(id, manifest)
}

console.log(`Done — ${total} pages across ${ids.length} package(s).`)
