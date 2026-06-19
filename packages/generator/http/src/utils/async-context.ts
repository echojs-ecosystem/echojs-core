import path from "node:path";

import type { HttpMethod, Operation } from "@kubb/oas";
import type { OperationSchemas } from "@kubb/plugin-oas";
import { kebabCase } from "../../../core/src/utils/naming";
import type { EchoAsyncOperationExtension } from "../config/async-types";
import type { ResolvedPluginEchoAsyncOptions } from "../types/plugin-async";
import { resolveEndpointFileName, resolveModelsImportPath } from "./endpoint-context";

export type AsyncOperationKind = "query" | "mutation" | "infiniteQuery";

export interface AsyncTemplateContext {
  asyncImportPath: string;
  endpointImportPath: string;
  modelsImportPath: string;
  defaultsImportPath?: string;
  queryKeysImportPath?: string;
  queryKeysExportName?: string;
  endpointFunctionName: string;
  exportName: string;
  asyncName: string;
  definitionName: "createQuery" | "createMutation" | "createInfiniteQuery";
  kind: AsyncOperationKind;
  responseType?: string;
  paramsType: string;
  variablesType?: string;
  endpointArgsExpression: string;
  infiniteEndpointArgsExpression?: string;
  hasEndpointArgs: boolean;
  queryKeyExpression: string;
  defaultsSpread?: string;
  pageParamType?: string;
  initialPageParam?: string;
  getNextPageParam?: string;
  getPreviousPageParam?: string;
  typeImports: string;
  summary?: string;
  description?: string;
}

export function readEchoAsyncExtension(operation: Operation): EchoAsyncOperationExtension | undefined {
  const schema = (operation as { schema?: Record<string, unknown> }).schema;
  const extension = schema?.["x-echo-async"];

  if (!extension || typeof extension !== "object") {
    return undefined;
  }

  return extension as EchoAsyncOperationExtension;
}

export function resolveAsyncOperationKind(
  method: HttpMethod,
  extension?: EchoAsyncOperationExtension,
): AsyncOperationKind | null {
  if (extension?.kind === "skip") {
    return null;
  }

  if (extension?.kind === "infiniteQuery") {
    return "infiniteQuery";
  }

  if (extension?.kind === "query") {
    return "query";
  }

  if (extension?.kind === "mutation") {
    return "mutation";
  }

  const normalizedMethod = method.toLowerCase();
  if (normalizedMethod === "get") {
    return "query";
  }

  if (["post", "put", "patch", "delete"].includes(normalizedMethod)) {
    return "mutation";
  }

  return null;
}

function buildParamsShape(
  schemas: OperationSchemas,
  mode: "query" | "mutation" | "infiniteQuery",
): {
  paramsType: string;
  endpointArgsExpression: string;
  variablesType?: string;
} {
  const hasPathParams = Boolean(schemas.pathParams?.name);
  const hasQueryParams = Boolean(schemas.queryParams?.name);
  const hasBody = Boolean(schemas.request?.name);
  const hasHeaders = Boolean(schemas.headerParams?.name);
  const valuePrefix = mode === "mutation" ? "variables" : "params";

  const argParts: string[] = [];
  const typeParts: string[] = [];

  if (hasPathParams) {
    argParts.push(
      `params: ${hasQueryParams || hasBody || hasHeaders ? `${valuePrefix}.params` : valuePrefix}`,
    );
    typeParts.push(`params: ${schemas.pathParams!.name}`);
  }

  if (hasQueryParams) {
    argParts.push(
      `query: ${hasPathParams || hasBody || hasHeaders ? `${valuePrefix}.query` : valuePrefix}`,
    );
    typeParts.push(`query: ${schemas.queryParams!.name}`);
  }

  if (hasBody) {
    argParts.push(`body: ${hasPathParams || hasQueryParams || hasHeaders ? `${valuePrefix}.body` : valuePrefix}`);
    typeParts.push(`body: ${schemas.request!.name}`);
  }

  if (hasHeaders) {
    argParts.push(`headers: ${valuePrefix}.headers`);
    typeParts.push(`headers: ${schemas.headerParams!.name}`);
  }

  if (argParts.length === 0) {
    return {
      paramsType: "void",
      endpointArgsExpression: "",
    };
  }

  const endpointArgsExpression = `{ ${argParts.join(", ")} }`;

  if (mode === "mutation") {
    if (argParts.length === 1 && hasBody && !hasPathParams && !hasQueryParams && !hasHeaders) {
      return {
        paramsType: schemas.request!.name,
        endpointArgsExpression: `{ body: variables }`,
        variablesType: schemas.request!.name,
      };
    }

    const objectType = `{ ${typeParts.join("; ")} }`;
    return {
      paramsType: objectType,
      endpointArgsExpression,
      variablesType: objectType,
    };
  }

  if (argParts.length === 1 && hasPathParams && !hasQueryParams && !hasBody && !hasHeaders) {
    return {
      paramsType: schemas.pathParams!.name,
      endpointArgsExpression,
    };
  }

  if (argParts.length === 1 && hasQueryParams && !hasPathParams && !hasBody && !hasHeaders) {
    return {
      paramsType: schemas.queryParams!.name,
      endpointArgsExpression,
    };
  }

  const objectType = `{ ${typeParts.join("; ")} }`;
  return {
    paramsType: objectType,
    endpointArgsExpression,
  };
}

function buildQueryKeyExpression(
  functionName: string,
  queryKeys?: ResolvedPluginEchoAsyncOptions["queryKeys"],
): string {
  if (queryKeys) {
    return `(params) => ${queryKeys.exportName}.${functionName}(params)`;
  }

  return `(params) => ["${functionName}", params]`;
}

function buildInfiniteEndpointArgs(
  endpointArgsExpression: string,
  pageParamQueryName: string,
  paramsType: string,
): string {
  if (endpointArgsExpression.includes("query:")) {
    if (endpointArgsExpression.includes("params.query")) {
      return endpointArgsExpression.replace(
        "params.query",
        `{ ...params.query, ${pageParamQueryName}: pageParam }`,
      );
    }

    return endpointArgsExpression.replace(
      "query: params",
      `query: { ...params, ${pageParamQueryName}: pageParam }`,
    );
  }

  if (endpointArgsExpression.includes("params:")) {
    return `{ params: params.params, query: { ${pageParamQueryName}: pageParam } }`;
  }

  if (paramsType === "void") {
    return `{ query: { ${pageParamQueryName}: pageParam } }`;
  }

  return `{ query: { ...params, ${pageParamQueryName}: pageParam } }`;
}

export function resolveAsyncFileName(functionName: string, kind: AsyncOperationKind, filesStyle: "kebabCase" | "camelCase"): string {
  const base = resolveEndpointFileName(functionName, filesStyle).replace(/\.ts$/, "");
  const suffix =
    kind === "query" ? "query" : kind === "mutation" ? "mutation" : "infinite-query";

  return `${base}.${suffix}.ts`;
}

export function resolveAsyncExportName(functionName: string, kind: AsyncOperationKind): string {
  if (kind === "query") {
    return `${functionName}Query`;
  }

  if (kind === "mutation") {
    return `${functionName}Mutation`;
  }

  return `${functionName}InfiniteQuery`;
}

export function resolveEndpointImportPath(asyncFilePath: string, endpointFilePath: string, outputRoot: string): string {
  const normalizedEndpointPath = endpointFilePath.includes(`${path.sep}endpoints${path.sep}`)
    ? endpointFilePath
    : path.join(outputRoot, "endpoints", path.basename(endpointFilePath));

  const relative = path
    .relative(path.dirname(asyncFilePath), normalizedEndpointPath)
    .replace(/\\/g, "/")
    .replace(/\.ts$/, "");

  return relative.startsWith(".") ? relative : `./${relative}`;
}

export function resolveEndpointImportPathFromParts(options: {
  asyncFilePath: string;
  outputRoot: string;
  grouping: "tag" | "none";
  groupTag?: string;
  functionName: string;
  filesStyle: "kebabCase" | "camelCase";
}): string {
  const endpointFileName = resolveEndpointFileName(options.functionName, options.filesStyle).replace(/\.ts$/, "");
  const endpointPath =
    options.grouping === "tag" && options.groupTag
      ? path.join(options.outputRoot, "endpoints", kebabCase(options.groupTag), endpointFileName)
      : path.join(options.outputRoot, "endpoints", endpointFileName);

  const relative = path.relative(path.dirname(options.asyncFilePath), endpointPath).replace(/\\/g, "/");
  return relative.startsWith(".") ? relative : `./${relative}`;
}

export function resolveAsyncDefaultsImportPath(asyncFilePath: string, outputRoot: string): string {
  const defaultsFile = path.join(outputRoot, "async", "defaults.ts");
  const relative = path.relative(path.dirname(asyncFilePath), defaultsFile).replace(/\\/g, "/").replace(/\.ts$/, "");
  return relative.startsWith(".") ? relative : `./${relative}`;
}

export function buildAsyncTemplateContext(options: {
  operation: Operation;
  schemas: OperationSchemas;
  functionName: string;
  asyncFilePath: string;
  endpointImportPath: string;
  outputRoot: string;
  plugin: ResolvedPluginEchoAsyncOptions;
  kind: AsyncOperationKind;
  extension?: EchoAsyncOperationExtension;
}): AsyncTemplateContext {
  const { operation, schemas, functionName, asyncFilePath, endpointImportPath, outputRoot, plugin, kind, extension } =
    options;

  const paramsShape = buildParamsShape(schemas, kind);
  const schemaTypeNames = [
    schemas.response?.name,
    schemas.pathParams?.name,
    schemas.queryParams?.name,
    schemas.request?.name,
    schemas.headerParams?.name,
  ].filter((value): value is string => Boolean(value));

  const defaultsExportName =
    kind === "query" ? "queryDefaults" : kind === "mutation" ? "mutationDefaults" : "infiniteQueryDefaults";

  const schema = (operation as { schema?: { summary?: string; description?: string } }).schema;
  const pagination = extension?.pagination;

  return {
    asyncImportPath: plugin.importPath,
    endpointImportPath,
    modelsImportPath: resolveModelsImportPath(asyncFilePath, outputRoot),
    defaultsImportPath: resolveAsyncDefaultsImportPath(asyncFilePath, outputRoot),
    queryKeysImportPath: plugin.queryKeys?.importPath,
    queryKeysExportName: plugin.queryKeys?.exportName,
    endpointFunctionName: functionName,
    exportName: resolveAsyncExportName(functionName, kind),
    asyncName: kebabCase(functionName),
    definitionName:
      kind === "query"
        ? "createQuery"
        : kind === "mutation"
          ? "createMutation"
          : "createInfiniteQuery",
    kind,
    responseType: schemas.response?.name,
    paramsType: paramsShape.paramsType,
    variablesType: paramsShape.variablesType ?? paramsShape.paramsType,
    endpointArgsExpression: paramsShape.endpointArgsExpression,
    hasEndpointArgs: Boolean(paramsShape.endpointArgsExpression),
    infiniteEndpointArgsExpression:
      kind === "infiniteQuery" && pagination?.pageParamQueryName
        ? buildInfiniteEndpointArgs(
            paramsShape.endpointArgsExpression,
            pagination.pageParamQueryName,
            paramsShape.paramsType,
          )
        : paramsShape.endpointArgsExpression,
    queryKeyExpression: buildQueryKeyExpression(functionName, plugin.queryKeys),
    defaultsSpread: `...${defaultsExportName},`,
    pageParamType: pagination?.pageParamType ?? "unknown",
    initialPageParam: pagination?.initialPageParam,
    getNextPageParam: pagination?.getNextPageParam,
    getPreviousPageParam: pagination?.getPreviousPageParam,
    typeImports: [...new Set(schemaTypeNames)].join(", "),
    summary: schema?.summary,
    description: schema?.description,
  };
}

export function resolveAsyncSubfolder(kind: AsyncOperationKind): string {
  switch (kind) {
    case "query":
      return "queries";
    case "mutation":
      return "mutations";
    case "infiniteQuery":
      return "infinite-queries";
  }
}

export function resolveAsyncBaseName(functionName: string, kind: AsyncOperationKind, filesStyle: "kebabCase" | "camelCase"): string {
  const base = filesStyle === "kebabCase" ? kebabCase(functionName) : functionName;
  const suffix =
    kind === "query" ? "query" : kind === "mutation" ? "mutation" : "infinite-query";

  return `${base}.${suffix}`;
}
