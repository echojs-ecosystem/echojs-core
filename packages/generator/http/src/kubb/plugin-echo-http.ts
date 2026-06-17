import path from "node:path";

import { definePlugin, getBarrelFiles, getMode, type Group } from "@kubb/core";
import { OperationGenerator, pluginOasName, type ResolvePathOptions } from "@kubb/plugin-oas";

import { camelCase, kebabCase } from "../../../core/src/utils/naming";
import { createRootBarrelSource, resolveRootBarrelPath } from "../generators/barrel";
import { endpointGenerator } from "../generators/endpoint";
import type { PluginEchoHttp } from "../types/plugin";

export const pluginEchoHttpName = "plugin-echo-http" satisfies PluginEchoHttp["name"];

export const pluginEchoHttp = definePlugin<PluginEchoHttp>((options) => {
  const {
    output = { path: "endpoints", barrelType: "named" },
    grouping = "tag",
    client,
    naming = { operation: "camelCase", models: "pascalCase", files: "kebabCase", modelFiles: "kebabCase" },
    group,
  } = options;

  if (!client) {
    throw new Error("[plugin-echo-http] `client` config is required.");
  }

  const resolvedGroup: Group | false =
    group ??
    (grouping === "tag"
      ? {
          type: "tag",
          name: (ctx) => kebabCase(ctx.group),
        }
      : false);

  return {
    name: pluginEchoHttpName,
    options: {
      output,
      grouping,
      client,
      naming,
      group: resolvedGroup,
    },
    pre: [pluginOasName],
    resolvePath(baseName, pathMode, resolveOptions?: ResolvePathOptions) {
      const root = path.resolve(this.config.root, this.config.output.path);
      const mode = pathMode ?? getMode(path.resolve(root, output.path));

      if (mode === "single") {
        return path.resolve(root, output.path);
      }

      if (
        resolvedGroup &&
        (resolveOptions?.group?.path || resolveOptions?.group?.tag)
      ) {
        const activeGroup = resolvedGroup;
        const groupName: Group["name"] =
          activeGroup.name ??
          ((ctx) => {
            if (activeGroup.type === "path") {
              return `${ctx.group.split("/")[1]}`;
            }

            return kebabCase(ctx.group);
          });

        return path.resolve(
          root,
          output.path,
          groupName({
            group: activeGroup.type === "path" ? resolveOptions.group.path! : resolveOptions.group.tag!,
          }),
          baseName,
        );
      }

      return path.resolve(root, output.path, baseName);
    },
    resolveName(name, type) {
      if (type === "file") {
        return naming.files === "kebabCase" ? kebabCase(name) : camelCase(name);
      }

      return camelCase(name);
    },
    async install() {
      const root = path.resolve(this.config.root, this.config.output.path);
      const mode = getMode(path.resolve(root, output.path));
      const oas = await this.getOas();

      const operationGenerator = new OperationGenerator(this.plugin.options, {
        fabric: this.fabric,
        oas,
        pluginManager: this.pluginManager,
        events: this.events,
        plugin: this.plugin,
        contentType: undefined,
        exclude: undefined,
        include: undefined,
        override: undefined,
        mode,
      });

      const operationFiles = await operationGenerator.build(endpointGenerator);
      await this.upsertFile(...operationFiles);

      const barrelFiles = await getBarrelFiles(this.fabric.files, {
        type: output.barrelType ?? "named",
        root,
        output,
        meta: {
          pluginKey: this.plugin.key,
        },
      });

      await this.upsertFile(...barrelFiles);

      await this.addFile({
        baseName: "index.ts",
        path: resolveRootBarrelPath(root),
        sources: [
          {
            name: "index",
            value: createRootBarrelSource(),
            isExportable: false,
            isIndexable: false,
          },
        ],
        imports: [],
        exports: [],
      });
    },
  };
});
