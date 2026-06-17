import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineHttpGeneratorConfig } from "@echojs-ecosystem/generator/http";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineHttpGeneratorConfig({
  input: path.join(root, "openapi.yaml"),
  output: path.join(root, "src/core/generated"),
  baseUrl: "https://api.example.com",
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
    files: "kebabCase",
    modelFiles: "kebabCase",
  },
  plugins: {
    zod: true,
    msw: { handlers: true },
    async: {
      defaults: {
        query: {
          keepPreviousData: true,
          staleTime: 60_000,
        },
        mutation: {
          retry: false,
        },
      },
    },
  },
  hooks: {
    afterGenerate: ["bun run format:generated"],
  },
});
