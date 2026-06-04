import { basename } from "node:path";

export type EchoPackageAliasMap = Record<string, string>;

type EchoPackageAliasFactory = (packageDir: string) => EchoPackageAliasMap;

/** Per-package `src/` path aliases (tsup, vitest). Key = package folder name. */
const echoPackageSrcAliasFactories: Record<string, EchoPackageAliasFactory> = {};

export const echoPackageSrcAliases = (packageDir: string): EchoPackageAliasMap => {
  const factory = echoPackageSrcAliasFactories[basename(packageDir)];
  return factory ? factory(packageDir) : {};
};
