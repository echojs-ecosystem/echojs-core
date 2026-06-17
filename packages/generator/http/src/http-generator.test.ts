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
  it("generates models, grouped endpoints, URL helpers, and imports a client variable", async () => {
    const outputDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.tmp/generated-api");
    await rm(outputDir, { recursive: true, force: true });
    await mkdir(outputDir, { recursive: true });

    const config = defineHttpGeneratorConfig({
      input: fixturePath,
      output: outputDir,
      baseUrl: "https://api.example.com",
      client: {
        importPath: httpClientFixturePath,
        exportName: "http",
        access: "variable",
      },
      grouping: "tag",
      naming: {
        operation: "camelCase",
        models: "pascalCase",
        modelFiles: "kebabCase",
      },
    });

    const result = await runHttpGenerator({ config, cwd: fixturesDir });

    expect(result.failed, result.error?.message).toBe(false);

    const getUserEndpoint = await readFile(path.join(outputDir, "endpoints", "users", "get-user.ts"), "utf8");
    expect(getUserEndpoint).toContain('import { http } from "../../../../src/fixtures/http-client"');
    expect(getUserEndpoint).toContain("function getGetUserUrl(");
    expect(getUserEndpoint).toContain("http.get(");
    expect(getUserEndpoint).toContain("getGetUserUrl(args.params)");
    expect(getUserEndpoint).not.toContain("withBaseUrl");
    expect(getUserEndpoint).not.toContain("buildPath");

    const createUserModel = await readFile(path.join(outputDir, "models", "users", "create-user.ts"), "utf8");
    expect(createUserModel).toContain("export type CreateUser201 = User");
    expect(createUserModel).toContain("import type { User }");
    expect(createUserModel).not.toContain("export type createUser201");
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
    expect(createUserEndpoint).toContain("getCreateUserUrl()");
    expect(createUserEndpoint).not.toContain("withBaseUrl");
  }, 60_000);

  it("can enable zod and msw plugins", async () => {
    const outputDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.tmp/generated-api-plugins");
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
      plugins: {
        zod: true,
        msw: { handlers: true },
      },
    });

    const result = await runHttpGenerator({ config, cwd: fixturesDir });
    expect(result.failed, result.error?.message).toBe(false);

    const zodDir = path.join(outputDir, "schemas");
    const mocksDir = path.join(outputDir, "mocks");
    const zodFiles = await readFile(path.join(zodDir, "users", "get-user-schema.ts"), "utf8");
    const mockFiles = await readFile(path.join(mocksDir, "users", "get-user-handler.ts"), "utf8");

    expect(zodFiles).toContain("z");
    expect(mockFiles.length).toBeGreaterThan(0);
  }, 60_000);

  it("can enable async plugin with configurable defaults", async () => {
    const outputDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.tmp/generated-api-async");
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
      plugins: {
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
    });

    const result = await runHttpGenerator({ config, cwd: fixturesDir });
    expect(result.failed, result.error?.message).toBe(false);

    const defaults = await readFile(path.join(outputDir, "async", "defaults.ts"), "utf8");
    expect(defaults).toContain("keepPreviousData: true");
    expect(defaults).toContain("staleTime: 60000");
    expect(defaults).toContain("retry: false");

    const getUsersQuery = await readFile(path.join(outputDir, "async", "users", "get-users.query.ts"), "utf8");
    expect(getUsersQuery).toContain('import { createQuery } from "@echojs-ecosystem/async"');
    expect(getUsersQuery).toContain("...queryDefaults");
    expect(getUsersQuery).toContain('import { getUsers } from "../../endpoints/users/get-users"');
    expect(getUsersQuery).not.toContain("import type { void");
    expect(getUsersQuery).toContain("export const getUsersQuery = createQuery");

    const createUserMutation = await readFile(
      path.join(outputDir, "async", "users", "create-user.mutation.ts"),
      "utf8",
    );
    expect(createUserMutation).toContain('import { createMutation } from "@echojs-ecosystem/async"');
    expect(createUserMutation).toContain("...mutationDefaults");
    expect(createUserMutation).toContain("mutationFn: ({ variables, signal }) => createUser({ body: variables }");
  }, 60_000);
});
