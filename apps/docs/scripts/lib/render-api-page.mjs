const esc = (s) => s.replace(/\|/g, '\\|')

export const renderTable = (rows, headers = ['Member', 'Type', 'Description']) => {
  const head = `| ${headers.join(' | ')} |\n| ${headers.map(() => '---').join(' | ')} |`
  const body = rows.map((r) => `| ${r.map(esc).join(' | ')} |`).join('\n')
  return `${head}\n${body}`
}

export const renderApiPage = (doc, packageId, npmPackage) => {
  const keywords = doc.keywords ?? [doc.name, packageId]
  const badge = doc.importBadge ?? npmPackage
  const lines = [
    '---',
    `title: ${doc.name}`,
    `description: ${doc.description}`,
    `package: '${npmPackage}'`,
    `keywords: [${keywords.join(', ')}]`,
    '---',
    '',
    badge,
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
    else if (doc.isModule) lines.push('### Exports', '')
    lines.push(renderTable(doc.returns), '')
  }

  if (doc.related?.length) {
    lines.push(
      '### Related',
      '',
      ...doc.related.map((slug) => {
        const label = doc.relatedLabels?.[slug] ?? slug
        return `- [${label}](/docs/packages/${packageId}/api/${slug})`
      }),
      '',
    )
  }

  return lines.join('\n').trimEnd() + '\n'
}
