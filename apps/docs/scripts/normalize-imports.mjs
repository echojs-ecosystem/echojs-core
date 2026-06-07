#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative } from 'node:path'

const SRC = new URL('../src', import.meta.url).pathname
const LAYERS = ['widgets', 'entities', 'pages', 'core', 'app']

const INDEX_RE = new RegExp(
  `from (["'])@(${LAYERS.join('|')})/([\\w-]+)/index\\.js\\1`,
  'g'
)
const INDEX_REPLACE = 'from $1@$2/$3$1'

const ROUTER_SUBPATH_RE =
  /from (["'])@app\/router\/(?:doc-pages|page-links|header-nav)\.js\1/g
const ROUTER_SUBPATH_REPLACE = 'from $1@app/router$1'

const ICONS_SUBPATH_RE = /from (["'])@widgets\/icons\/[\w-]+\.js\1/g
const ICONS_SUBPATH_REPLACE = 'from $1@widgets/icons$1'

const mergeHyperdomImports = (source) => {
  const lines = source.split('\n')
  const hyperdomImports = []
  const otherLines = []

  for (const line of lines) {
    const match = line.match(
      /^import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+["']@echojs-ecosystem\/framework\/hyperdom["'];?\s*$/
    )
    if (match) {
      hyperdomImports.push({
        type: line.includes('import type'),
        specifiers: match[1].trim(),
      })
      continue
    }
    otherLines.push(line)
  }

  if (hyperdomImports.length <= 1) return source

  const names = new Map()
  for (const entry of hyperdomImports) {
    for (const part of entry.specifiers.split(',')) {
      const trimmed = part.trim()
      if (!trimmed) continue
      const isType = trimmed.startsWith('type ')
      const name = isType ? trimmed.slice(5).trim() : trimmed
      names.set(name, isType || entry.type)
    }
  }

  const merged = [...names.entries()]
    .toSorted(([a], [b]) => a.localeCompare(b))
    .map(([name, isType]) => (isType ? `type ${name}` : name))
    .join(', ')

  const insertAt = otherLines.findIndex((line) => line.startsWith('import '))
  const mergedLine = `import { ${merged} } from "@echojs-ecosystem/framework/hyperdom";`
  if (insertAt === -1) {
    return [mergedLine, ...otherLines].join('\n')
  }
  otherLines.splice(insertAt, 0, mergedLine)
  return otherLines.join('\n')
}

const normalizeFile = async (filePath) => {
  let source = await readFile(filePath, 'utf8')
  const before = source

  source = source.replace(INDEX_RE, INDEX_REPLACE)
  source = source.replace(ROUTER_SUBPATH_RE, ROUTER_SUBPATH_REPLACE)
  source = source.replace(ICONS_SUBPATH_RE, ICONS_SUBPATH_REPLACE)
  source = mergeHyperdomImports(source)

  if (source !== before) {
    await writeFile(filePath, source)
    return true
  }
  return false
}

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true })
  let changed = 0
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      changed += await walk(full)
      continue
    }
    if (!entry.name.endsWith('.ts')) continue
    if (await normalizeFile(full)) {
      changed += 1
      console.log(relative(SRC, full))
    }
  }
  return changed
}

const changed = await walk(SRC)
console.log(`\nUpdated ${changed} file(s).`)
