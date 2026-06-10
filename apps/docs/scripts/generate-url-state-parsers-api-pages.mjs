#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { renderTable } from './lib/render-api-page.mjs'
import { urlStateParsersApiDocs } from './url-state-parsers-api-docs.data.mjs'

const OUT = join(import.meta.dirname, '..', 'src/content/packages/url-state/api')
const PACKAGE_ID = 'url-state'
const NPM = '@echojs-ecosystem/url-state'

const esc = (s) => s.replace(/\|/g, '\\|')

const renderPage = (doc) => {
  const keywords = doc.keywords ?? [doc.name, 'parsers', PACKAGE_ID]
  const lines = [
    '---',
    `title: ${doc.name}`,
    `description: ${doc.description}`,
    `package: '${NPM}'`,
    `keywords: [${keywords.join(', ')}]`,
    '---',
    '',
    NPM,
    '',
    '## Usage',
    '',
    '```ts',
    doc.usage.trim(),
    '```',
    '',
    '## Type Declarations',
    '',
    '```ts',
    doc.types.trim(),
    '```',
    '',
    '## API',
    '',
  ]

  if (doc.params?.length) {
    lines.push('### Parameters', '', renderTable(doc.params, ['Name', 'Type', 'Default', 'Description']), '')
  }

  if (doc.behavior?.length) {
    lines.push('### Behavior', '', renderTable(doc.behavior, ['', '']), '')
  }

  if (doc.returns?.length) {
    lines.push('### Parser methods', '', renderTable(doc.returns), '')
  }

  if (doc.related?.length) {
    lines.push('### Related', '')
    for (const slug of doc.related) {
      if (slug === 'parsers-guide') {
        lines.push(`- [Parsers guide](/docs/packages/${PACKAGE_ID}/guides/parsers)`)
        continue
      }
      const ref = urlStateParsersApiDocs.find((d) => d.slug === slug)
      const label = doc.relatedLabels?.[slug] ?? ref?.name ?? slug
      lines.push(`- [${label}](/docs/packages/${PACKAGE_ID}/api/${slug})`)
    }
    lines.push('')
  }

  return lines.join('\n').trimEnd() + '\n'
}

mkdirSync(OUT, { recursive: true })

for (const doc of urlStateParsersApiDocs) {
  writeFileSync(join(OUT, `${doc.slug}.md`), renderPage(doc))
  console.log('wrote', doc.slug)
}

console.log(`Done — ${urlStateParsersApiDocs.length} parser pages.`)
