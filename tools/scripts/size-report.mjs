#!/usr/bin/env node
/**
 * Workspace bundle + dist size report.
 * Usage: node tools/scripts/size-report.mjs
 *
 * Writes local reports to tools/bench-results/ (gitignored)
 * and a committed snapshot to tools/bench/baselines/ (for docs / CI diff).
 */
import { spawn } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../..', import.meta.url))
const benchCli = join(root, 'tools/bench/dist/cli.js')
const baselinesDir = join(root, 'tools/bench/baselines')

/** Standalone @echojs-ecosystem/* packages (src/index.ts entry). */
const PACKAGES = [
  'reactivity',
  'core',
  'store',
  'hyperdom',
  'persist',
  'form',
  'ui',
  'router',
  'url-state',
  'i18n',
  'async',
  'permission',
  'utils',
  'devtools',
]

/** Subpath-only packages (no root index). */
const PACKAGE_ENTRIES = ['network/http', 'network/ws', 'network/mock', 'network/graphql']

const FRAMEWORK_ENTRIES = [
  'framework/core',
  'framework/reactivity',
  'framework/router',
  'framework/form',
  'framework/persist',
  'framework/store',
  'framework/ui',
  'framework/hyperdom',
  'framework/url-state',
  'framework/async',
  'framework/i18n',
  'framework/devtools',
  'framework/network/http',
]

const fmt = (n) => {
  if (n < 1024) return `${n} B`
  const kb = n / 1024
  if (kb < 1024) return `${kb.toFixed(2)} kB`
  return `${(kb / 1024).toFixed(2)} MB`
}

const runBench = (args) =>
  new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [benchCli, 'size', ...args], {
      cwd: root,
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    let err = ''
    child.stderr.on('data', (c) => {
      err += c
    })
    child.on('close', (code) => {
      if (code !== 0) reject(new Error(err || `bench exited ${code}`))
      else resolve()
    })
  })

const distJsBytes = (pkg) => {
  const dir = join(root, 'packages', pkg, 'dist')
  if (!existsSync(dir)) return null
  let sum = 0
  for (const file of walk(dir)) {
    if (file.endsWith('.js') && !file.endsWith('.js.map'))
      sum += statSync(file).size
  }
  return sum
}

function* walk(dir) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name)
    if (name.isDirectory()) yield* walk(p)
    else yield p
  }
}

const measureAllFramework = async () => {
  const { measureBundle } = await import(
    join(root, 'tools/bench/dist/index.js')
  )
  const entry = join(root, 'packages/framework/src/__size__/all.ts')
  return measureBundle({ absEntryPath: entry, format: 'esm', minify: true })
}

const readReport = (dir) =>
  JSON.parse(readFileSync(join(dir, 'bundle-size.json'), 'utf8'))

const writeBaseline = (name, jsonPath, mdPath) => {
  mkdirSync(baselinesDir, { recursive: true })
  copyFileSync(jsonPath, join(baselinesDir, `${name}.json`))
  copyFileSync(mdPath, join(baselinesDir, `${name}.md`))
}

async function main() {
  if (!existsSync(benchCli)) {
    console.error(
      'Build @echojs-ecosystem/bench first: bun run --filter @echojs-ecosystem/bench build'
    )
    process.exit(1)
  }

  const outPackages = join(root, 'tools/bench-results', 'size-packages')
  const outPackageEntries = join(root, 'tools/bench-results', 'size-package-entries')
  const outFramework = join(root, 'tools/bench-results', 'size-framework')

  await runBench([
    '--from',
    'src',
    '--packages',
    PACKAGES.join(','),
    '--outDir',
    outPackages,
  ])

  await runBench([
    '--from',
    'src',
    '--entries',
    PACKAGE_ENTRIES.join(','),
    '--outDir',
    outPackageEntries,
  ])

  await runBench([
    '--from',
    'src',
    '--entries',
    FRAMEWORK_ENTRIES.join(','),
    '--outDir',
    outFramework,
  ])

  const pkgReport = readReport(outPackages)
  const entryReport = readReport(outPackageEntries)
  const fwReport = readReport(outFramework)
  const frameworkAll = await measureAllFramework()

  const allPackageRows = [...pkgReport.rows, ...entryReport.rows].sort(
    (a, b) => a.gzipBytes - b.gzipBytes,
  )

  writeBaseline('bundle-size-packages', join(outPackages, 'bundle-size.json'), join(outPackages, 'bundle-size.md'))
  writeBaseline('bundle-size-package-entries', join(outPackageEntries, 'bundle-size.json'), join(outPackageEntries, 'bundle-size.md'))
  writeBaseline('bundle-size-framework', join(outFramework, 'bundle-size.json'), join(outFramework, 'bundle-size.md'))

  const frameworkAllReport = {
    kind: 'bundle-size-all',
    generatedAt: new Date().toISOString(),
    node: process.version,
    entry: 'packages/framework/src/__size__/all.ts',
    ...frameworkAll,
  }
  writeFileSync(
    join(baselinesDir, 'bundle-size-framework-all.json'),
    JSON.stringify(frameworkAllReport, null, 2) + '\n',
  )

  const urlStateRow = allPackageRows.find((r) => r.package === 'url-state')
  const urlStateFw = fwReport.rows.find((r) => r.package === 'framework/url-state')

  console.log('\n=== EchoJS bundle size (esbuild, browser, minified) ===\n')
  console.log('Packages (entry: src/index.ts or subpath):\n')
  console.log(
    `${'Package'.padEnd(22)} ${'Minified'.padStart(10)} ${'Gzip'.padStart(10)} ${'Brotli'.padStart(10)} ${'dist .js'.padStart(10)}`
  )
  console.log('-'.repeat(66))

  for (const row of allPackageRows) {
    const pkgName = row.package.split('/')[0]
    const dist = distJsBytes(pkgName)
    console.log(
      `${row.package.padEnd(22)} ${fmt(row.bytes).padStart(10)} ${fmt(row.gzipBytes).padStart(10)} ${fmt(row.brotliBytes).padStart(10)} ${dist === null ? 'n/a'.padStart(10) : fmt(dist).padStart(10)}`
    )
  }

  console.log('\nFramework subpaths (@echojs-ecosystem/framework/…):\n')
  console.log(
    `${'Subpath'.padEnd(22)} ${'Minified'.padStart(10)} ${'Gzip'.padStart(10)} ${'Brotli'.padStart(10)}`
  )
  console.log('-'.repeat(56))
  for (const row of fwReport.rows) {
    console.log(
      `${row.package.padEnd(22)} ${fmt(row.bytes).padStart(10)} ${fmt(row.gzipBytes).padStart(10)} ${fmt(row.brotliBytes).padStart(10)}`
    )
  }

  console.log(
    '\n@import everything via framework (all public subpaths, one bundle):\n'
  )
  console.log(
    `  Minified: ${fmt(frameworkAll.bytes)}  |  Gzip: ${fmt(frameworkAll.gzipBytes)}  |  Brotli: ${fmt(frameworkAll.brotliBytes)}`
  )

  const naiveGzip = fwReport.rows.reduce((a, r) => a + r.gzipBytes, 0)
  console.log(
    `\n  (Сумма gzip по отдельным subpath ≈ ${fmt(naiveGzip)} — завышена из‑за дублирования shared-кода.)`
  )

  if (urlStateRow && urlStateFw) {
    console.log('\n@echojs-ecosystem/url-state:\n')
    console.log(
      `  Пакет @echojs-ecosystem/url-state:          gzip ${fmt(urlStateRow.gzipBytes)} (min ${fmt(urlStateRow.bytes)})`
    )
    console.log(
      `  Subpath @echojs-ecosystem/framework/url-state: gzip ${fmt(urlStateFw.gzipBytes)} (min ${fmt(urlStateFw.bytes)})`
    )
    console.log(
      '  В router/hyperdom url-state уже включён; отдельный subpath — для прямого import без router.'
    )
  }

  const fwDist = distJsBytes('framework')
  if (fwDist !== null) {
    console.log(
      `\n  framework/dist/*.js на диске (tsc, без .d.ts/.map): ${fmt(fwDist)}`
    )
  }

  console.log(
    '\nReports: tools/bench-results/ (local)  |  Snapshot: tools/bench/baselines/\n'
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
