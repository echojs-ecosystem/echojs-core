import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { abstraction } from "../abstraction";
import { rule } from "../rule/rule";
import {
  dependenciesDirection,
  noUnabstractionFiles,
  off,
  requiredChildren,
  restrictCrossImports,
  warn,
} from "./index";
import {
  buildVfs,
  emptyDependenciesMap,
  fsdAbstractions,
  initDependenciesForFiles,
  linkDependency,
  parseInstance,
  projectRoot,
} from "../testing/vfs-fixture";
import { getFlattenFiles } from "../vfs/get-flatten-files";

describe("presets helpers", () => {
  it("off disables single rule and array of rules", () => {
    const single = rule("a");
    const many = [rule("a"), rule("b")];

    expect(off(single).severity).toBe("off");
    expect(off(many).every((item) => item.severity === "off")).toBe(true);
  });

  it("warn downgrades severity", () => {
    const single = rule({ name: "a", severity: "error" });
    expect(warn(single).severity).toBe("warn");
  });
});

describe("requiredChildren", () => {
  it("reports missing required child abstraction", async () => {
    const root = projectRoot();
    const src = join(root, "src");
    const entities = join(src, "entities");
    const vfs = buildVfs(root, [join(entities, "user", "index.ts")]);

    const app = abstraction({
      name: "src",
      children: {
        entities: abstraction("entities"),
        shared: abstraction("shared"),
      },
    });

    const instance = parseInstance(app, vfs);
    const preset = requiredChildren();
    const { diagnostics } = await preset.check({
      root: vfs,
      instance,
      dependenciesMap: emptyDependenciesMap(),
    });

    expect(diagnostics.some((d) => d.location.path.endsWith("shared"))).toBe(
      true,
    );
  });
});

describe("dependenciesDirection", () => {
  it("forbids upward layer imports", async () => {
    const root = projectRoot();
    const src = join(root, "src");
    const entitiesFile = join(src, "entities", "user", "model.ts");
    const featuresFile = join(src, "features", "profile", "ui.ts");
    const vfs = buildVfs(src, [entitiesFile, featuresFile]);

    const { src: srcAbstraction } = fsdAbstractions();
    const instance = parseInstance(srcAbstraction, vfs);

    const dependenciesMap = emptyDependenciesMap();
    initDependenciesForFiles(dependenciesMap, [entitiesFile, featuresFile]);
    linkDependency(dependenciesMap, entitiesFile, featuresFile);

    const preset = dependenciesDirection([
      "widgets",
      "features",
      "entities",
      "shared",
    ]);

    const { diagnostics } = await preset.check({
      root: vfs,
      instance,
      dependenciesMap,
    });

    expect(diagnostics).toHaveLength(1);
    expect(diagnostics[0]?.message).toContain("entities");
    expect(diagnostics[0]?.message).toContain("features");
  });

  it("allows downward layer imports", async () => {
    const root = projectRoot();
    const src = join(root, "src");
    const entitiesFile = join(src, "entities", "user", "model.ts");
    const sharedFile = join(src, "shared", "lib.ts");
    const vfs = buildVfs(src, [entitiesFile, sharedFile]);

    const { src: srcAbstraction } = fsdAbstractions();
    const instance = parseInstance(srcAbstraction, vfs);

    const dependenciesMap = emptyDependenciesMap();
    initDependenciesForFiles(dependenciesMap, [entitiesFile, sharedFile]);
    linkDependency(dependenciesMap, entitiesFile, sharedFile);

    const preset = dependenciesDirection([
      "widgets",
      "features",
      "entities",
      "shared",
    ]);

    const { diagnostics } = await preset.check({
      root: vfs,
      instance,
      dependenciesMap,
    });

    expect(diagnostics).toHaveLength(0);
  });
});

describe("noUnabstractionFiles", () => {
  it("reports loose files inside abstraction instance", async () => {
    const root = projectRoot();
    const src = join(root, "src");
    const looseFile = join(src, "entities", "rogue.ts");
    const vfs = buildVfs(src, [looseFile]);

    const app = abstraction({
      name: "src",
      children: {
        entities: abstraction("entities"),
      },
    });

    const instance = parseInstance(app, vfs);
    const entitiesInstance = instance.children.find((child) =>
      child.path.endsWith("entities"),
    )!;
    const preset = noUnabstractionFiles();
    const { diagnostics } = await preset.check({
      root: vfs,
      instance: entitiesInstance,
      dependenciesMap: emptyDependenciesMap(),
    });

    expect(diagnostics).toHaveLength(1);
    expect(diagnostics[0]?.location.path).toBe(looseFile);
  });
});

describe("restrictCrossImports", () => {
  it("forbids imports between sibling slices", async () => {
    const root = projectRoot();
    const src = join(root, "src");
    const userModel = join(src, "entities", "user", "model.ts");
    const postModel = join(src, "entities", "post", "model.ts");
    const vfs = buildVfs(src, [userModel, postModel]);

    const entities = abstraction({
      name: "entities",
      children: {
        user: abstraction("user"),
        post: abstraction("post"),
      },
    });

    const app = abstraction({
      name: "src",
      children: { entities },
    });

    const instance = parseInstance(app, vfs);
    const entitiesInstance = instance.children.find((child) =>
      child.path.endsWith("entities"),
    )!;
    const files = getFlattenFiles(vfs).map((file) => file.path);
    const dependenciesMap = emptyDependenciesMap();
    initDependenciesForFiles(dependenciesMap, files);
    linkDependency(dependenciesMap, userModel, postModel);

    const preset = restrictCrossImports();
    const { diagnostics } = await preset.check({
      root: vfs,
      instance: entitiesInstance,
      dependenciesMap,
    });

    expect(diagnostics).toHaveLength(1);
    expect(diagnostics[0]?.location.path).toBe(userModel);
  });
});
