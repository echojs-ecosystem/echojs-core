import path from "node:path";

import type { HttpMethod, Operation } from "@kubb/oas";
import type { OperationSchemas } from "@kubb/plugin-oas";
import { camelCase, kebabCase, pascalCase } from "../../../core/src/utils/naming";
import type { HttpClientAccess, ResolvedHttpClientGeneratorConfig } from "../config/types";
import { buildUrlPathExpression, extractPathParamNames } from "./url-expression";

export interface EndpointTemplateContext {
  functionName: string;
  urlFunctionName: string;
  method: Lowercase<HttpMethod>;
  path: string;
  urlPathExpression: string;
  summary?: string;
  description?: string;
  docLink: string;
  typesImportPath: string;
  clientImportPath: string;
  clientExportName: string;
  clientExpression: string;
  modelsImportPath: string;
  typeImports: string;
  hasArgs: boolean;
  hasPathParams: boolean;
  hasQueryParams: boolean;
  hasBody: boolean;
  hasHeaders: boolean;
  pathParamsType?: string;
  queryParamsType?: string;
  bodyType?: string;
  headerParamsType?: string;
  responseType?: string;
}

export function toClientMethod(method: HttpMethod): Lowercase<HttpMethod> {
  return method.toLowerCase() as Lowercase<HttpMethod>;
}

export function buildClientExpression(access: HttpClientAccess, exportName: string): string {
  return access === "function" ? `${exportName}()` : exportName;
}

export function resolveUrlFunctionName(functionName: string): string {
  return `get${pascalCase(functionName)}Url`;
}

export function resolveModuleImportPath(fromFile: string, projectRoot: string, importPath: string): string {
  if (!importPath.startsWith(".") && !path.isAbsolute(importPath)) {
    return importPath;
  }

  const absolute = path.isAbsolute(importPath) ? importPath : path.resolve(projectRoot, importPath);
  const relative = path.relative(path.dirname(fromFile), absolute).replace(/\\/g, "/").replace(/\.ts$/, "");
  return relative.startsWith(".") ? relative : `./${relative}`;
}

export function resolveModelsImportPath(endpointFilePath: string, outputRoot: string): string {
  const modelsDir = path.join(outputRoot, "models");
  const relative = path.relative(path.dirname(endpointFilePath), modelsDir).replace(/\\/g, "/");
  return relative.startsWith(".") ? relative : `./${relative}`;
}

function readOperationMeta(operation: Operation): { summary?: string; description?: string } {
  const raw = (operation as { schema?: { summary?: string; description?: string } }).schema;
  return {
    summary: raw?.summary,
    description: raw?.description,
  };
}

export function buildEndpointTemplateContext(options: {
  operation: Operation;
  schemas: OperationSchemas;
  functionName: string;
  endpointFilePath: string;
  outputRoot: string;
  projectRoot: string;
  client: ResolvedHttpClientGeneratorConfig;
}): EndpointTemplateContext {
  const { operation, schemas, functionName, endpointFilePath, outputRoot, projectRoot, client } = options;
  const meta = readOperationMeta(operation);
  const pathParamNames = extractPathParamNames(operation.path);

  const typeNames = [
    schemas.response?.name,
    schemas.pathParams?.name,
    schemas.queryParams?.name,
    schemas.request?.name,
    schemas.headerParams?.name,
  ].filter((value): value is string => Boolean(value));

  const hasPathParams = Boolean(schemas.pathParams?.name);
  const hasQueryParams = Boolean(schemas.queryParams?.name);
  const hasBody = Boolean(schemas.request?.name);
  const hasHeaders = Boolean(schemas.headerParams?.name);
  const hasArgs = hasPathParams || hasQueryParams || hasBody || hasHeaders;

  return {
    functionName,
    urlFunctionName: resolveUrlFunctionName(functionName),
    method: toClientMethod(operation.method),
    path: operation.path,
    urlPathExpression: buildUrlPathExpression(operation.path, pathParamNames),
    summary: meta.summary,
    description: meta.description,
    docLink: `{@link ${operation.path}}`,
    typesImportPath: client.typesImportPath,
    clientImportPath: resolveModuleImportPath(endpointFilePath, projectRoot, client.importPath),
    clientExportName: client.exportName,
    clientExpression: buildClientExpression(client.access, client.exportName),
    modelsImportPath: resolveModelsImportPath(endpointFilePath, outputRoot),
    typeImports: [...new Set(typeNames)].join(", "),
    hasArgs,
    hasPathParams,
    hasQueryParams,
    hasBody,
    hasHeaders,
    pathParamsType: schemas.pathParams?.name,
    queryParamsType: schemas.queryParams?.name,
    bodyType: schemas.request?.name,
    headerParamsType: schemas.headerParams?.name,
    responseType: schemas.response?.name,
  };
}

export function resolveEndpointFileName(functionName: string, filesStyle: "kebabCase" | "camelCase"): string {
  return filesStyle === "kebabCase" ? `${kebabCase(functionName)}.ts` : `${camelCase(functionName)}.ts`;
}
