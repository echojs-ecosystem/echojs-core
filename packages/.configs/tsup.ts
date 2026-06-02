import { defineConfig, type Options } from 'tsup'

import { echoPackageSrcAliases } from '@echojs/oxc-config/package-aliases'

/** Workspace packages stay external (no bundling of @echojs/*). */
export const echoPackageExternals = [/^@echojs\//]

export const echoTsupConfig = (
  overrides: Options = {},
  packageDir: string = process.cwd(),
) => {
  const { esbuildOptions: userEsbuildOptions, ...rest } = overrides

  return defineConfig({
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
    esbuildOptions(options, context) {
      options.packages = 'external'
      options.alias = {
        ...(options.alias ?? {}),
        ...echoPackageSrcAliases(packageDir),
      }
      userEsbuildOptions?.(options, context)
    },
    ...rest,
  })
}
