import path from "node:path";

import type { UserConfig } from "@kubb/core";
import { pluginMsw } from "@kubb/plugin-msw";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginZod } from "@kubb/plugin-zod";

import { assertOpenApiInputPath } from "../../../core/src/utils/openapi-input";
import { kebabCase } from "../../../core/src/utils/naming";
import type { ResolvedHttpGeneratorConfig } from "../config/types";
import { pluginEchoHttp } from "./plugin-echo-http";
import { pluginEchoAsync } from "./plugin-echo-async";
import { resolveGeneratedName } from "../utils/resolve-generated-name";

export interface CreateKubbConfigOptions {
  config: ResolvedHttpGeneratorConfig;
  cwd?: string;
}

export function createKubbConfig({ config, cwd = process.cwd() }: CreateKubbConfigOptions): UserConfig {
  assertOpenApiInputPath(config.input);

  const inputPath = path.resolve(cwd, config.input);
  const outputPath = path.resolve(cwd, config.output);

  const tagGroup =
    config.grouping === "tag"
      ? {
          type: "tag" as const,
          name: (ctx: { group: string }) => kebabCase(ctx.group),
        }
      : undefined;

  const plugins: UserConfig["plugins"] = [
    pluginOas({
      validate: true,
      generators: [],
    }),
    pluginTs({
      output: {
        path: "models",
        barrelType: "named",
      },
      group: tagGroup,
      syntaxType: "type",
      enumType: "asConst",
      transformers: {
        name: (name, type) => resolveGeneratedName(name, type, config.naming),
      },
    }),
    pluginEchoHttp({
      output: {
        path: "endpoints",
        barrelType: "named",
      },
      grouping: config.grouping,
      client: config.client,
      naming: config.naming,
      group: tagGroup,
    }),
  ];

  if (config.plugins.zod.enabled) {
    plugins.push(
      pluginZod({
        output: {
          path: config.plugins.zod.path,
          barrelType: "named",
        },
        group: tagGroup,
        transformers: {
          name: (name, type) => resolveGeneratedName(name, type, config.naming),
        },
      }),
    );
  }

  if (config.plugins.msw.enabled) {
    plugins.push(
      pluginMsw({
        output: {
          path: config.plugins.msw.path,
          barrelType: "named",
        },
        group: tagGroup,
        handlers: config.plugins.msw.handlers,
        parser: "data",
        baseURL: config.baseUrl || undefined,
        transformers: {
          name: (name, type) => resolveGeneratedName(name, type, config.naming),
        },
      }),
    );
  }

  if (config.plugins.async.enabled) {
    plugins.push(
      pluginEchoAsync({
        output: {
          path: config.plugins.async.path,
          barrelType: "named",
        },
        grouping: config.grouping,
        naming: config.naming,
        importPath: config.plugins.async.importPath,
        defaults: config.plugins.async.defaults,
        queryKeys: config.plugins.async.queryKeys,
        group: tagGroup,
      }),
    );
  }

  return {
    root: cwd,
    input: {
      path: inputPath,
    },
    output: {
      path: outputPath,
      clean: true,
      extension: {},
      defaultBanner: "simple",
    },
    plugins,
  };
}
