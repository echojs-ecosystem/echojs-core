import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../..', import.meta.url))
const packagesDir = join(root, 'packages')

const rows = []

for (const entry of readdirSync(packagesDir, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name.startsWith('.')) continue

  const pkgDir = join(packagesDir, entry.name)
  const summaryPath = join(pkgDir, 'coverage', 'coverage-summary.json')
  if (!existsSync(summaryPath)) continue

  let name = entry.name
  try {
    const pkg = JSON.parse(readFileSync(join(pkgDir, 'package.json'), 'utf8'))
    name = pkg.name ?? name
  } catch {
    // keep folder name
  }

  const summary = JSON.parse(readFileSync(summaryPath, 'utf8'))
  const total = summary.total
  if (!total) continue

  rows.push({
    package: name,
    lines: total.lines?.pct ?? 0,
    statements: total.statements?.pct ?? 0,
    functions: total.functions?.pct ?? 0,
    branches: total.branches?.pct ?? 0,
  })
}

if (rows.length === 0) {
  console.log('No coverage reports found. Run: bun run test:coverage')
  process.exit(1)
}

rows.sort((a, b) => a.package.localeCompare(b.package))

const fmt = (n) => `${n.toFixed(1).padStart(5)}%`
const pad = (s, n) => s.padEnd(n)

console.log('\nCoverage summary (packages with reports)\n')
console.log(
  `${pad('Package', 28)} ${pad('Lines', 7)} ${pad('Stmt', 7)} ${pad('Funcs', 7)} ${pad('Branch', 7)}`
)
console.log('-'.repeat(60))

for (const row of rows) {
  console.log(
    `${pad(row.package, 28)} ${fmt(row.lines)} ${fmt(row.statements)} ${fmt(row.functions)} ${fmt(row.branches)}`
  )
}

console.log(
  `\n${rows.length} package(s). HTML: packages/<name>/coverage/index.html\n`
)
