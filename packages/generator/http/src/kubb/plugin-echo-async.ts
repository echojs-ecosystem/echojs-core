import path from "node:path";

import { definePlugin, getBarrelFiles, getMode, type Group } from "@kubb/core";
import { OperationGenerator, pluginOasName, type ResolvePathOptions } from "@kubb/plugin-oas";

import { camelCase, kebabCase } from "../../../core/src/utils/naming";
import { asyncOperationGenerator } from "../generators/async-operation";
import type { PluginEchoAsync } from "../types/plugin-async";
import { pluginEchoHttpName } from "./plugin-echo-http";
import { hasSerializedDefaults, serializeTsObjectLiteral } from "../utils/serialize-ts-literal";
import { renderTemplate } from "../utils/render-template";

export const pluginEchoAsyncName = "plugin-echo-async" satisfies PluginEchoAsync["name"];

export const pluginEchoAsync = definePlugin<PluginEchoAsync>((options) => {
  const {
    output = { path: "async", barrelType: "named" },
    grouping = "tag",
    naming = { operation: "camelCase", models: "pascalCase", files: "kebabCase", modelFiles: "kebabCase" },
    importPath = "@echojs-ecosystem/async",
    defaults = { query: {}, infiniteQuery: {}, mutation: {} },
    queryKeys,
    group,
  } = options;

  const resolvedGroup: Group | false =
    group ??
    (grouping === "tag"
      ? {
          type: "tag",
          name: (ctx) => kebabCase(ctx.group),
        }
      : false);

  const resolvedQueryKeys =
    queryKeys?.importPath && queryKeys.exportName
      ? { importPath: queryKeys.importPath, exportName: queryKeys.exportName }
      : undefined;

  return {
    name: pluginEchoAsyncName,
    options: {
      output,
      grouping,
      naming,
      importPath,
      defaults,
      queryKeys: resolvedQueryKeys,
      group: resolvedGroup,
    },
    pre: [pluginOasName, pluginEchoHttpName],
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
      const asyncRoot = path.resolve(root, output.path);

      const hasAnyDefaults =
        hasSerializedDefaults(defaults.query) ||
        hasSerializedDefaults(defaults.infiniteQuery) ||
        hasSerializedDefaults(defaults.mutation);

      if (hasAnyDefaults) {
        await this.addFile({
          baseName: "defaults.ts",
          path: path.resolve(asyncRoot, "defaults.ts"),
          sources: [
            {
              name: "defaults",
              value: renderTemplate("async-defaults.hbs", {
                queryDefaults: hasSerializedDefaults(defaults.query)
                  ? serializeTsObjectLiteral(defaults.query)
                  : undefined,
                infiniteQueryDefaults: hasSerializedDefaults(defaults.infiniteQuery)
                  ? serializeTsObjectLiteral(defaults.infiniteQuery)
                  : undefined,
                mutationDefaults: hasSerializedDefaults(defaults.mutation)
                  ? serializeTsObjectLiteral(defaults.mutation)
                  : undefined,
              }),
              isExportable: true,
              isIndexable: true,
            },
          ],
          imports: [],
          exports: [],
        });
      }

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

      const operationFiles = await operationGenerator.build(asyncOperationGenerator);
      await this.upsertFile(...operationFiles);

      const barrelFiles = await getBarrelFiles(this.fabric.files, {
        type: output.barrelType ?? "named",
        root: asyncRoot,
        output,
        meta: {
          pluginKey: this.plugin.key,
        },
      });

      await this.upsertFile(...barrelFiles);

      await this.addFile({
        baseName: "index.ts",
        path: path.resolve(root, "index.ts"),
        sources: [
          {
            name: "index",
            value: ['export * from "./models";', 'export * from "./endpoints";', 'export * from "./async";'].join(
              "\n",
            ),
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
