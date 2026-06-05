import type { Path, VfsFolder } from "./types";

export const createVfsRoot = (path: Path): VfsFolder => ({
  type: "folder",
  path,
  children: [],
});
