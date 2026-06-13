import path from "node:path";

import type { HttpMethod, Operation } from "@kubb/oas";
import type { OperationSchemas } from "@kubb/plugin-oas";
import { camelCase, kebabCase } from "../../../core/src/utils/naming";
import type { HttpClientAccess, ResolvedHttpClientGeneratorConfig } from "../config/types";

export interface EndpointTemplateContext {
  functionName: string;
  method: Lowercase<HttpMethod>;
  path: string;
  typesImportPath: string;
  clientImportPath: string;
  clientExportName: string;
  clientExpression: string;
  modelsImportPath: string;
  buildPathImportPath: string;
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

export function resolveBuildPathImportPath(endpointFilePath: string, outputRoot: string): string {
  const runtimeFile = path.join(outputRoot, "runtime", "build-path.ts");
  const relative = path.relative(path.dirname(endpointFilePath), runtimeFile).replace(/\\/g, "/").replace(/\.ts$/, "");
  return relative.startsWith(".") ? relative : `./${relative}`;
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
    method: toClientMethod(operation.method),
    path: operation.path,
    typesImportPath: client.typesImportPath,
    clientImportPath: resolveModuleImportPath(endpointFilePath, projectRoot, client.importPath),
    clientExportName: client.exportName,
    clientExpression: buildClientExpression(client.access, client.exportName),
    modelsImportPath: resolveModelsImportPath(endpointFilePath, outputRoot),
    buildPathImportPath: resolveBuildPathImportPath(endpointFilePath, outputRoot),
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
