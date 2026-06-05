import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { abstraction } from "../abstraction";
import { rule } from "../rule/rule";
import { runRules } from "./run-rules";
import {
  buildVfs,
  emptyDependenciesMap,
  parseInstance,
  projectRoot,
} from "../testing/vfs-fixture";

describe("runRules", () => {
  it("runs enabled rules and skips off rules", async () => {
    const root = projectRoot();
    const file = join(root, "index.ts");
    const vfs = buildVfs(root, [file]);

    const enabled = rule({
      name: "enabled",
      severity: "error",
      check: () => ({
        diagnostics: [{ message: "found", location: { path: file } }],
      }),
    });

    const disabled = rule({
      name: "disabled",
      severity: "off",
      check: () => ({
        diagnostics: [{ message: "hidden", location: { path: file } }],
      }),
    });

    const app = abstraction({
      name: "app",
      rules: [enabled, disabled],
    });

    const instance = parseInstance(app, vfs);
    const diagnostics = await runRules({
      root: vfs,
      instance,
      dependenciesMap: emptyDependenciesMap(),
    });

    expect(diagnostics).toHaveLength(1);
    expect(diagnostics[0]?.message).toBe("found");
    expect(diagnostics[0]?.rule.name).toBe("enabled");
  });

  it("runs rules defined on nested abstractions", async () => {
    const root = projectRoot();
    const src = join(root, "src");
    const sharedFile = join(src, "shared", "index.ts");
    const vfs = buildVfs(src, [sharedFile]);

    const childRule = rule({
      name: "child-rule",
      check: () => ({
        diagnostics: [
          { message: "child", location: { path: sharedFile } },
        ],
      }),
    });

    const app = abstraction({
      name: "src",
      children: {
        shared: abstraction({ name: "shared", rules: [childRule] }),
      },
    });

    const instance = parseInstance(app, vfs);
    const diagnostics = await runRules({
      root: vfs,
      instance,
      dependenciesMap: emptyDependenciesMap(),
    });

    expect(diagnostics.some((d) => d.rule.name === "child-rule")).toBe(true);
  });
});
