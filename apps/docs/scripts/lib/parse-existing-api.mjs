/** Extract usage/types from legacy API markdown pages. */

const FRONTMATTER_RE = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/

const parseFrontmatter = (raw) => {
  const match = raw.match(FRONTMATTER_RE)
  if (!match) return { meta: {}, body: raw }
  const meta = {}
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w+):\s*(.+)$/)
    if (m) meta[m[1]] = m[2].trim()
  }
  return { meta, body: match[2] }
}

const codeBlocks = (body) => [...body.matchAll(/```ts\n([\s\S]*?)```/g)].map((m) => m[1].trim())

export const parseExistingApiPage = (raw, fallbackName) => {
  const { meta, body } = parseFrontmatter(raw)

  const modernUsage = body.match(/## Usage\s*\n+```ts\n([\s\S]*?)```/)?.[1]?.trim()
  const modernTypes = body.match(/## Type Declarations\s*\n+```ts\n([\s\S]*?)```/)?.[1]?.trim()
  if (modernUsage && modernTypes) {
    const firstParagraph =
      body.match(/^#[^\n]*\n+\n?([^#\n`][^\n]+)/)?.[1]?.trim() ??
      body.match(/^#[^\n]*\n+([^\n#`]+)/)?.[1]?.trim()
    return {
      name: meta.title ?? fallbackName,
      description: (meta.description ?? firstParagraph ?? '').replace(/^["']|["']$/g, '').trim(),
      types: modernTypes,
      usage: modernUsage,
    }
  }

  const blocks = codeBlocks(body)
  const exampleIdx = body.search(/## Example/i)
  const exampleBody = exampleIdx >= 0 ? body.slice(exampleIdx) : body
  const exampleBlocks = codeBlocks(exampleBody)

  const types = blocks[0] ?? `export const ${fallbackName}: unknown`
  const usage =
    exampleBlocks[0] ??
    blocks[blocks.length - 1] ??
    `import { ${fallbackName} } from '@echojs-ecosystem/PACKAGE'\n\n// See guides for patterns.`

  const firstParagraph =
    body.match(/^#[^\n]*\n+\n?([^#\n`][^\n]+)/)?.[1]?.trim() ??
    body.match(/^#[^\n]*\n+([^\n#`]+)/)?.[1]?.trim()

  const description = (meta.description ?? firstParagraph ?? '').replace(/^["']|["']$/g, '').trim()

  return {
    name: meta.title ?? fallbackName,
    description,
    types,
    usage,
  }
}
