import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { copyNode } from "./copy-node";
import { buildVfs, projectRoot } from "../testing/vfs-fixture";

describe("copyNode", () => {
  it("shallow-copies folder without children", () => {
    const root = projectRoot();
    const vfs = buildVfs(root, [join(root, "index.ts")]);
    const copied = copyNode(vfs, false);

    expect(copied).toEqual({
      type: "folder",
      path: root,
      children: [],
    });
    expect(copied).not.toBe(vfs);
  });

  it("deep-copies folder tree", () => {
    const root = projectRoot();
    const file = join(root, "shared", "ui.ts");
    const vfs = buildVfs(root, [file]);
    const copied = copyNode(vfs, true);

    expect(copied.children).toHaveLength(1);
    expect(copied.children[0]).toEqual({
      type: "folder",
      path: join(root, "shared"),
      children: [{ type: "file", path: file }],
    });
    expect(copied).not.toBe(vfs);
  });

  it("copies file node", () => {
    const root = projectRoot();
    const file = join(root, "index.ts");
    const vfs = buildVfs(root, [file]);
    const fileNode = vfs.children[0]!;

    expect(copyNode(fileNode)).toEqual({ type: "file", path: file });
  });
});
