#!/usr/bin/env node
/**
 * Workspace bundle + dist size report.
 * Usage: node scripts/size-report.mjs
 */
import { spawn } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const benchCli = join(root, 'packages/bench/dist/cli.js')

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
]

const FRAMEWORK_ENTRIES = [
  'framework/core',
  'framework/reactivity',
  'framework/router',
  'framework/router/hyperdom',
  'framework/form',
  'framework/persist',
  'framework/store',
  'framework/ui',
  'framework/hyperdom',
  'framework/url-state',
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
    join(root, 'packages/bench/dist/size/measureBundle.js')
  )
  const entry = join(root, 'packages/framework/src/__size__/all.ts')
  return measureBundle({ absEntryPath: entry, format: 'esm', minify: true })
}

const readReport = (dir) =>
  JSON.parse(readFileSync(join(dir, 'bundle-size.json'), 'utf8'))

async function main() {
  if (!existsSync(benchCli)) {
    console.error(
      'Build @echojs/bench first: bun run --filter @echojs/bench build'
    )
    process.exit(1)
  }

  const outPackages = join(root, 'bench-results', 'size-packages')
  const outFramework = join(root, 'bench-results', 'size-framework')

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
    FRAMEWORK_ENTRIES.join(','),
    '--outDir',
    outFramework,
  ])

  const pkgReport = readReport(outPackages)
  const fwReport = readReport(outFramework)
  const frameworkAll = await measureAllFramework()

  const urlStateRow = pkgReport.rows.find((r) => r.package === 'url-state')
  const urlStateFw = fwReport.rows.find(
    (r) => r.package === 'framework/url-state'
  )

  console.log('\n=== EchoJS bundle size (esbuild, browser, minified) ===\n')
  console.log('Packages (entry: src/index.ts):\n')
  console.log(
    `${'Package'.padEnd(14)} ${'Minified'.padStart(10)} ${'Gzip'.padStart(10)} ${'Brotli'.padStart(10)} ${'dist .js'.padStart(10)}`
  )
  console.log('-'.repeat(58))

  let sumGzip = 0
  for (const row of pkgReport.rows) {
    const dist = distJsBytes(row.package)
    if (row.package !== 'framework') sumGzip += row.gzipBytes
    console.log(
      `${row.package.padEnd(14)} ${fmt(row.bytes).padStart(10)} ${fmt(row.gzipBytes).padStart(10)} ${fmt(row.brotliBytes).padStart(10)} ${dist === null ? 'n/a'.padStart(10) : fmt(dist).padStart(10)}`
    )
  }

  console.log('\nFramework subpaths (@echojs/framework/…):\n')
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
    console.log('\n@echojs/url-state:\n')
    console.log(
      `  Пакет @echojs/url-state:          gzip ${fmt(urlStateRow.gzipBytes)} (min ${fmt(urlStateRow.bytes)})`
    )
    console.log(
      `  Subpath @echojs/framework/url-state: gzip ${fmt(urlStateFw.gzipBytes)} (min ${fmt(urlStateFw.bytes)})`
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
    '\nReports: bench-results/size-packages/, bench-results/size-framework/\n'
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
