#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { reactivityApiDocs } from './reactivity-api-docs.data.mjs'

const OUT = join(import.meta.dirname, '..', 'src/content/packages/reactivity/api')

const esc = (s) => s.replace(/\|/g, '\\|')

const renderTable = (rows, headers = ['Member', 'Type', 'Description']) => {
  const head = `| ${headers.join(' | ')} |\n| ${headers.map(() => '---').join(' | ')} |`
  const body = rows.map((r) => `| ${r.map(esc).join(' | ')} |`).join('\n')
  return `${head}\n${body}`
}

const renderPage = (doc) => {
  const keywords = doc.keywords ?? [doc.name, 'reactivity']
  const lines = [
    '---',
    `title: ${doc.name}`,
    `description: ${doc.description}`,
    "package: '@echojs-ecosystem/reactivity'",
    `keywords: [${keywords.join(', ')}]`,
    '---',
    '',
    '@echojs-ecosystem/reactivity',
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
    lines.push(
      '### Returns',
      '',
      `\`${doc.name}\` — see Type Declarations for the full signature.`,
      '',
    )
  }

  if (doc.returns?.length) {
    if (doc.params?.length) lines.push('### Returns', '')
    else if (doc.isModule) lines.push('### Exports', '')
    lines.push(renderTable(doc.returns), '')
  }

  if (doc.related?.length) {
    lines.push(
      '### Related',
      '',
      ...doc.related.map((slug) => {
        const ref = reactivityApiDocs.find((d) => d.slug === slug)
        const label = ref?.name ?? slug
        return `- [${label}](/docs/packages/reactivity/api/${slug})`
      }),
      '',
    )
  }

  return lines.join('\n').trimEnd() + '\n'
}

mkdirSync(OUT, { recursive: true })

for (const doc of reactivityApiDocs) {
  writeFileSync(join(OUT, `${doc.slug}.md`), renderPage(doc))
  console.log('wrote', doc.slug)
}

console.log(`Done — ${reactivityApiDocs.length} pages.`)
