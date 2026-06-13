import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineHttpGeneratorConfig } from "@echojs-ecosystem/generator/http";

const root = path.dirname(fileURLToPath(import.meta.url));

/**
 * Echo HTTP generator config for this example app.
 *
 * 1. Replace `openapi.yaml` in this folder with your spec.
 * 2. Run: `bun run generate`
 * 3. Output lands in `src/core/generated/`
 */
export default defineHttpGeneratorConfig({
  input: path.join(root, "openapi.yaml"),
  output: path.join(root, "src/core/generated"),
  client: {
    importPath: path.join(root, "src/core/http-client.ts"),
    exportName: "http",
    access: "variable",
    typesImportPath: "@echojs-ecosystem/network/http",
  },
  grouping: "tag",
  naming: {
    operation: "camelCase",
    models: "pascalCase",
  },
});
