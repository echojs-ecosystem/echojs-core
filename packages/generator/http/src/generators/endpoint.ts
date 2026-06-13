import path from "node:path";

import { createGenerator } from "@kubb/plugin-oas/generators";
import { getBanner, getFooter } from "@kubb/plugin-oas/utils";
import { pluginTsName } from "@kubb/plugin-ts";

import { resolveOperationName } from "../../../core/src/utils/naming";
import type { PluginEchoHttp } from "../types/plugin";
import { buildEndpointTemplateContext, resolveEndpointFileName } from "../utils/endpoint-context";
import { renderTemplate } from "../utils/render-template";

export const endpointGenerator = createGenerator<PluginEchoHttp>({
  name: "echo-http-endpoint",
  async operation({ operation, generator, plugin, config }) {
    const { pluginManager } = generator.context;
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

    const fileName = resolveEndpointFileName(functionName, plugin.options.naming.files);
    const group =
      plugin.options.grouping === "tag"
        ? {
            tag: operation.getTags().at(0)?.name,
            path: operation.path,
          }
        : undefined;

    const file = pluginManager.getFile({
      name: fileName.replace(/\.ts$/, ""),
      extname: ".ts",
      pluginKey: plugin.key,
      options: {
        type: "file",
        pluginKey: plugin.key,
        group,
      },
    });

    const context = buildEndpointTemplateContext({
      operation,
      schemas,
      functionName,
      endpointFilePath: file.path,
      outputRoot,
      projectRoot: config.root,
      client: plugin.options.client,
    });

    return [
      {
        ...file,
        sources: [
          {
            name: functionName,
            value: renderTemplate("endpoint.hbs", context),
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
