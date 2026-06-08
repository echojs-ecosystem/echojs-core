import type { DocBlock, DocDocument, DocFrontmatter } from './types'
import { normalizeCalloutVariant } from './callout-variants'

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

const parseFrontmatter = (
  raw: string
): { meta: DocFrontmatter; body: string } => {
  if (!raw.startsWith('---\n')) {
    return { meta: { title: 'Untitled' }, body: raw }
  }
  const end = raw.indexOf('\n---\n', 4)
  if (end === -1) return { meta: { title: 'Untitled' }, body: raw }
  const header = raw.slice(4, end)
  const body = raw.slice(end + 5)
  const meta: DocFrontmatter = { title: 'Untitled' }
  for (const line of header.split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const value = line
      .slice(idx + 1)
      .trim()
      .replace(/^["']|["']$/g, '')
    if (key === 'title') meta.title = value
    if (key === 'description') meta.description = value
    if (key === 'package') meta.package = value
    if (key === 'keywords')
      meta.keywords = value.split(',').map((k) => k.trim())
  }
  return { meta, body }
}

const parseTableRow = (line: string): string[] =>
  line
    .split('|')
    .map((c) => c.trim())
    .filter(
      (_, i, arr) =>
        !(i === 0 && arr[0] === '') &&
        !(i === arr.length - 1 && arr[arr.length - 1] === '')
    )

const isTableSeparator = (line: string): boolean =>
  /^\|?[\s:-]+\|[\s|:-]+$/.test(line.trim())

const normalizeHeadingTitle = (text: string): string =>
  text.trim().toLowerCase().replace(/\s+/g, ' ')

/** Drop leading `# Title` when frontmatter title is rendered separately in {@link DocRenderer}. */
const dropDuplicatePageTitle = (
  meta: DocFrontmatter,
  blocks: DocBlock[]
): DocBlock[] => {
  const first = blocks[0]
  if (first?.type !== 'heading' || first.level !== 1 || !meta.title)
    return blocks
  if (normalizeHeadingTitle(first.text) === normalizeHeadingTitle(meta.title)) {
    return blocks.slice(1)
  }
  return blocks
}

const parseCalloutLine = (
  line: string
): { variant: ReturnType<typeof normalizeCalloutVariant>; title?: string } => {
  const m = line.match(/^>\s*\[!(\w+)\]\s*(.*)$/i)
  if (!m) return { variant: 'note' }
  return {
    variant: normalizeCalloutVariant(m[1]!),
    title: m[2]?.trim() || undefined,
  }
}

export const parseMarkdown = (raw: string): DocDocument => {
  const { meta, body } = parseFrontmatter(raw)
  const blocks: DocBlock[] = []
  const lines = body.replace(/\r\n/g, '\n').split('\n')
  let i = 0

  const pushParagraph = (buf: string[]): void => {
    const text = buf.join(' ').trim()
    if (text) blocks.push({ type: 'paragraph', text })
  }

  while (i < lines.length) {
    const line = lines[i]!

    if (line.startsWith('```')) {
      const lang = line.slice(3).trim() || 'text'
      const code: string[] = []
      i++
      while (i < lines.length && !lines[i]!.startsWith('```')) {
        code.push(lines[i]!)
        i++
      }
      blocks.push({ type: 'code', language: lang, value: code.join('\n') })
      i++
      continue
    }

    if (line.startsWith(':::tabs')) {
      const items: { label: string; blocks: DocBlock[] }[] = []
      i++
      while (i < lines.length && lines[i] !== ':::') {
        const tabLine = lines[i]!
        const tabMatch = tabLine.match(/^--\s+(.+)$/)
        if (tabMatch) {
          const tabBlocks: DocBlock[] = []
          const chunk: string[] = []
          i++
          while (
            i < lines.length &&
            lines[i] !== ':::' &&
            !lines[i]!.startsWith('-- ')
          ) {
            chunk.push(lines[i]!)
            i++
          }
          const nested = parseMarkdown(
            `---\ntitle: Tab\n---\n${chunk.join('\n')}`
          )
          tabBlocks.push(...nested.blocks)
          items.push({ label: tabMatch[1]!.trim(), blocks: tabBlocks })
          continue
        }
        i++
      }
      if (lines[i] === ':::') i++
      blocks.push({ type: 'tabs', items })
      continue
    }

    if (line.startsWith(':::callout')) {
      const variantMatch = line.match(/type=(\w+)/)
      const variant = normalizeCalloutVariant(variantMatch?.[1] ?? 'note')
      const bodyLines: string[] = []
      i++
      while (i < lines.length && lines[i] !== ':::') {
        bodyLines.push(lines[i]!)
        i++
      }
      if (lines[i] === ':::') i++
      blocks.push({
        type: 'callout',
        variant,
        body: bodyLines.join('\n').trim(),
      })
      continue
    }

    if (line.startsWith(':::install')) {
      const packageName = line.slice(':::install'.length).trim()
      if (packageName) blocks.push({ type: 'package-install', packageName })
      i++
      continue
    }

    if (line.startsWith(':::playground')) {
      const packageId = line.slice(':::playground'.length).trim()
      if (packageId) blocks.push({ type: 'playground', packageId })
      i++
      continue
    }

    if (line.startsWith(':::package-overview')) {
      const packageId = line.slice(':::package-overview'.length).trim()
      if (packageId) blocks.push({ type: 'package-overview', packageId })
      i++
      continue
    }

    if (line.startsWith('@echojs-ecosystem/')) {
      blocks.push({ type: 'package-badge', name: line.trim() })
      i++
      continue
    }

    if (line.startsWith('> [!')) {
      const { variant, title } = parseCalloutLine(line)
      const bodyLines: string[] = []
      i++
      while (i < lines.length && lines[i]!.startsWith('>')) {
        bodyLines.push(lines[i]!.replace(/^>\s?/, ''))
        i++
      }
      blocks.push({
        type: 'callout',
        variant,
        title,
        body: bodyLines.join('\n').trim(),
      })
      continue
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/)
    if (heading) {
      const level = heading[1]!.length as 1 | 2 | 3 | 4
      const text = heading[2]!.trim()
      blocks.push({ type: 'heading', level, text, id: slugify(text) })
      i++
      continue
    }

    if (
      line.trim().startsWith('|') &&
      i + 1 < lines.length &&
      isTableSeparator(lines[i + 1]!)
    ) {
      const headers = parseTableRow(line)
      i += 2
      const rows: string[][] = []
      while (i < lines.length && lines[i]!.trim().startsWith('|')) {
        rows.push(parseTableRow(lines[i]!))
        i++
      }
      blocks.push({ type: 'table', headers, rows })
      continue
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^[-*]\s+/.test(lines[i]!)) {
        items.push(lines[i]!.replace(/^[-*]\s+/, ''))
        i++
      }
      blocks.push({ type: 'list', ordered: false, items })
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i]!)) {
        items.push(lines[i]!.replace(/^\d+\.\s+/, ''))
        i++
      }
      blocks.push({ type: 'list', ordered: true, items })
      continue
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      blocks.push({ type: 'hr' })
      i++
      continue
    }

    if (line.trim() === '') {
      i++
      continue
    }

    const para: string[] = [line.trim()]
    i++
    while (
      i < lines.length &&
      lines[i]!.trim() !== '' &&
      !lines[i]!.startsWith('#')
    ) {
      para.push(lines[i]!.trim())
      i++
    }
    pushParagraph(para)
  }

  if (!meta.title || meta.title === 'Untitled') {
    const h1 = blocks.find((b) => b.type === 'heading' && b.level === 1)
    if (h1 && h1.type === 'heading') meta.title = h1.text
  }

  return { frontmatter: meta, blocks: dropDuplicatePageTitle(meta, blocks) }
}
