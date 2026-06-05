export {
  abstraction,
  getAbstractionInstanceLabel,
  parseAbstractionInstance,
  type Abstraction,
  type AbstractionInstance,
  type AbstractionOptions,
} from "./abstraction";

export { defineConfig, type EvolutionConfig } from "./config/define-config";
export { type ConfigResult, watchConfig } from "./config/load";

export { parseDependenciesMap, type DependenciesMap } from "./dependencies";

export { rule, type Diagnostic, type Rule, type RuleContext } from "./rule";

export {
  getFlattenFiles,
  getNodesRecord,
  watchFs,
  type Path,
  type VfsEvents,
  type VfsFile,
  type VfsFolder,
  type VfsNode,
} from "./vfs";

export {
  dependenciesDirection,
  noUnabstractionFiles,
  off,
  publicAbstraction,
  requiredChildren,
  restrictCrossImports,
  warn,
  type DependenciesDirectionOptions,
} from "./presets";

export { lint } from "./linter";
