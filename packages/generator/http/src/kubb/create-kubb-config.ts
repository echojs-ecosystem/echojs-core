import path from "node:path";

import type { UserConfig } from "@kubb/core";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginTs } from "@kubb/plugin-ts";

import { assertOpenApiInputPath } from "../../../core/src/utils/openapi-input";
import { kebabCase } from "../../../core/src/utils/naming";
import type { ResolvedHttpGeneratorConfig } from "../config/types";
import { pluginEchoHttp } from "./plugin-echo-http";

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
    plugins: [
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
    ],
  };
}
