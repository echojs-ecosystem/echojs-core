#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { routerApiDocs } from './router-api-docs.data.mjs'

const OUT = join(import.meta.dirname, '..', 'src/content/packages/router/api')

const esc = (s) => s.replace(/\|/g, '\\|')

const renderTable = (rows, headers = ['Member', 'Type', 'Description']) => {
  const head = `| ${headers.join(' | ')} |\n| ${headers.map(() => '---').join(' | ')} |`
  const body = rows.map((r) => `| ${r.map(esc).join(' | ')} |`).join('\n')
  return `${head}\n${body}`
}

const renderPage = (doc) => {
  const keywords = doc.keywords ?? [doc.name, 'router']
  const lines = [
    '---',
    `title: ${doc.name}`,
    `description: ${doc.description}`,
    "package: '@echojs-ecosystem/router'",
    `keywords: [${keywords.join(', ')}]`,
    '---',
    '',
    '@echojs-ecosystem/router',
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
    const paramHeaders =
      doc.params[0].length === 4
        ? ['Name', 'Type', 'Default', 'Description']
        : ['Member', 'Type', 'Description']
    lines.push('### Parameters', '', renderTable(doc.params, paramHeaders), '')
  } else if (!doc.isModule) {
    lines.push('### Returns', '', `\`${doc.name}\` — see Type Declarations for the full signature.`, '')
  }

  if (doc.returns?.length) {
    if (doc.params?.length) lines.push('### Returns', '')
    lines.push(renderTable(doc.returns), '')
  }

  if (doc.related?.length) {
    lines.push(
      '### Related',
      '',
      ...doc.related.map((slug) => {
        const ref = routerApiDocs.find((d) => d.slug === slug)
        const label = ref?.name ?? slug
        return `- [${label}](/docs/packages/router/api/${slug})`
      }),
      '',
    )
  }

  return lines.join('\n').trimEnd() + '\n'
}

mkdirSync(OUT, { recursive: true })

for (const doc of routerApiDocs) {
  writeFileSync(join(OUT, `${doc.slug}.md`), renderPage(doc))
  console.log('wrote', doc.slug)
}

console.log(`Done — ${routerApiDocs.length} pages.`)
