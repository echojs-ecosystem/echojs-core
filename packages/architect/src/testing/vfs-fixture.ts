import { join } from "node:path";
import { abstraction, type Abstraction } from "../abstraction";
import { parseAbstractionInstance } from "../abstraction/instance/parse";
import type { AbstractionInstance } from "../abstraction/instance/types";
import type { DependenciesMap } from "../dependencies/types";
import type { VfsFolder } from "../vfs/types";
import { addFile } from "../vfs/add-file";
import { createVfsRoot } from "../vfs/create-root";

export const projectRoot = (name = "project") => join("/", name);

export const buildVfs = (root: string, files: string[]): VfsFolder => {
  let vfs = createVfsRoot(root);

  for (const file of files) {
    vfs = addFile(vfs, file);
  }

  return vfs;
};

export const fsdAbstractions = () => {
  const shared = abstraction("shared");
  const entities = abstraction("entities");
  const features = abstraction("features");
  const widgets = abstraction("widgets");

  const src = abstraction({
    name: "src",
    children: {
      shared,
      entities,
      features,
      widgets,
    },
  });

  return { shared, entities, features, widgets, src };
};

export const parseInstance = (
  rootAbstraction: Abstraction,
  vfs: VfsFolder,
): AbstractionInstance => parseAbstractionInstance(rootAbstraction)(vfs);

export const emptyDependenciesMap = (): DependenciesMap => ({
  dependencies: {},
  dependencyFor: {},
});

export const initDependenciesForFiles = (
  map: DependenciesMap,
  files: string[],
) => {
  for (const file of files) {
    map.dependencies[file] ??= new Set();
  }
};

export const linkDependency = (
  map: DependenciesMap,
  from: string,
  to: string,
) => {
  map.dependencies[from] ??= new Set();
  map.dependencies[from].add(to);
  map.dependencyFor[to] ??= new Set();
  map.dependencyFor[to].add(from);
};
