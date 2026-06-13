import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineHttpGeneratorConfig } from "./src/index";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineHttpGeneratorConfig({
  input: path.join(root, "src/fixtures/petstore.openapi.yaml"),
  output: path.join(root, ".tmp/generated-api"),
  client: {
    importPath: path.join(root, "src/fixtures/http-client.ts"),
    exportName: "httpClient",
    access: "variable",
    typesImportPath: "@echojs-ecosystem/network/http",
  },
  grouping: "tag",
  naming: {
    operation: "camelCase",
    models: "pascalCase",
  },
});
