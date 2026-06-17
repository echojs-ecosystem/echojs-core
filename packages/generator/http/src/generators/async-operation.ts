import path from "node:path";

import { createGenerator } from "@kubb/plugin-oas/generators";
import { getBanner, getFooter } from "@kubb/plugin-oas/utils";
import { pluginTsName } from "@kubb/plugin-ts";

import { resolveOperationName } from "../../../core/src/utils/naming";
import type { PluginEchoAsync } from "../types/plugin-async";
import {
  buildAsyncTemplateContext,
  readEchoAsyncExtension,
  resolveAsyncBaseName,
  resolveAsyncOperationKind,
  resolveEndpointImportPathFromParts,
} from "../utils/async-context";
import { resolveEndpointFileName } from "../utils/endpoint-context";
import { renderTemplate } from "../utils/render-template";

export const asyncOperationGenerator = createGenerator<PluginEchoAsync>({
  name: "echo-async-operation",
  async operation({ operation, generator, plugin, config }) {
    const { pluginManager } = generator.context;
    const extension = readEchoAsyncExtension(operation);
    const kind = resolveAsyncOperationKind(operation.method, extension);

    if (!kind) {
      return null;
    }

    if (kind === "infiniteQuery") {
      const pagination = extension?.pagination;
      if (!pagination?.initialPageParam || !pagination.getNextPageParam || !pagination.pageParamQueryName) {
        generator.context.events?.emit("warn", {
          message: `[plugin-echo-async] Skipping infinite query for ${operation.path}: x-echo-async.pagination requires initialPageParam, getNextPageParam, and pageParamQueryName.`,
        });
        return null;
      }
    }

    const outputRoot = path.resolve(config.root, config.output.path);
    const operationId = operation.getOperationId({ friendlyCase: true });
    const functionName = resolveOperationName(operationId, operation.method, operation.path);

    const schemas = generator.getSchemas(operation, {
      resolveName: (name) =>
        pluginManager.resolveName({
          name,
          pluginKey: [pluginTsName],
          type: "type",
        }),
    });

    const group =
      plugin.options.grouping === "tag"
        ? {
            tag: operation.getTags().at(0)?.name,
            path: operation.path,
          }
        : undefined;

    const asyncFile = pluginManager.getFile({
      name: resolveAsyncBaseName(functionName, kind, plugin.options.naming.files),
      extname: ".ts",
      pluginKey: plugin.key,
      options: {
        type: "file",
        pluginKey: plugin.key,
        group,
      },
    });

    const endpointImportPath = resolveEndpointImportPathFromParts({
      asyncFilePath: asyncFile.path,
      outputRoot,
      grouping: plugin.options.grouping,
      groupTag: group?.tag,
      functionName,
      filesStyle: plugin.options.naming.files,
    });

    const context = buildAsyncTemplateContext({
      operation,
      schemas,
      functionName,
      asyncFilePath: asyncFile.path,
      endpointImportPath,
      outputRoot,
      plugin: plugin.options,
      kind,
      extension,
    });

    const templateName =
      kind === "query"
        ? "async-query.hbs"
        : kind === "mutation"
          ? "async-mutation.hbs"
          : "async-infinite-query.hbs";

    return [
      {
        ...asyncFile,
        sources: [
          {
            name: context.exportName,
            value: renderTemplate(templateName, context),
            isExportable: true,
            isIndexable: true,
          },
        ],
        banner: getBanner({ oas: generator.context.oas, output: plugin.options.output, config: pluginManager.config }),
        footer: getFooter({ oas: generator.context.oas, output: plugin.options.output }),
      },
    ];
  },
});
