import { defineConfig, type Options } from 'tsup'

/** Workspace packages stay external (no bundling of @echojs/*). */
export const echoPackageExternals = [/^@echojs\//]

export const echoTsupConfig = (overrides: Options = {}) =>
  defineConfig({
    format: ['esm'],
    /** Transpile + tree-shake per entry; do not inline workspace or npm deps. */
    bundle: true,
    dts: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    splitting: false,
    target: 'es2022',
    outDir: 'dist',
    /** Resolve types from dev tsconfig; emit without monorepo path aliases. */
    tsconfig: 'tsconfig.build.json',
    external: [...echoPackageExternals, 'alien-signals'],
    platform: 'browser',
    esbuildOptions(options) {
      options.packages = 'external'
    },
    ...overrides,
  })
