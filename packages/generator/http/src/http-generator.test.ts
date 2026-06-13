import { mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { defineHttpGeneratorConfig } from "./config/define-http-generator-config";
import { runHttpGenerator } from "./run";

const fixturesDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./fixtures");
const fixturePath = path.join(fixturesDir, "petstore.openapi.yaml");
const httpClientFixturePath = path.join(fixturesDir, "http-client.ts");

describe("http generator", () => {
  it("generates models, grouped endpoints, and imports a client variable", async () => {
    const outputDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.tmp/generated-api");
    await rm(outputDir, { recursive: true, force: true });
    await mkdir(outputDir, { recursive: true });

    const config = defineHttpGeneratorConfig({
      input: fixturePath,
      output: outputDir,
      client: {
        importPath: httpClientFixturePath,
        exportName: "http",
        access: "variable",
      },
      grouping: "tag",
      naming: {
        operation: "camelCase",
        models: "pascalCase",
      },
    });

    const result = await runHttpGenerator({ config, cwd: fixturesDir });

    expect(result.failed, result.error?.message).toBe(false);

    const getUserEndpoint = await readFile(path.join(outputDir, "endpoints", "users", "get-user.ts"), "utf8");
    expect(getUserEndpoint).toContain('import { http } from "../../../../src/fixtures/http-client"');
    expect(getUserEndpoint).toContain("http.get(");
    expect(getUserEndpoint).not.toContain("getHttpClient");
    expect(getUserEndpoint).not.toContain("client: HttpClient");
  }, 60_000);

  it("supports function-based client access", async () => {
    const outputDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.tmp/generated-api-fn");
    await rm(outputDir, { recursive: true, force: true });
    await mkdir(outputDir, { recursive: true });

    const config = defineHttpGeneratorConfig({
      input: fixturePath,
      output: outputDir,
      client: {
        importPath: httpClientFixturePath,
        exportName: "getHttpClient",
        access: "function",
      },
      grouping: "none",
    });

    const result = await runHttpGenerator({ config, cwd: fixturesDir });
    expect(result.failed, result.error?.message).toBe(false);

    const createUserEndpoint = await readFile(path.join(outputDir, "endpoints", "create-user.ts"), "utf8");
    expect(createUserEndpoint).toContain("getHttpClient().post(");
  }, 60_000);
});
