import path from "node:path";

import { renderTemplate } from "../utils/render-template";

export function createRootBarrelSource(): string {
  return renderTemplate("index.hbs", {});
}

export function resolveRootBarrelPath(outputRoot: string): string {
  return path.resolve(outputRoot, "index.ts");
}
