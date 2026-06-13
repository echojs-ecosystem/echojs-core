const OPENAPI_INPUT_EXTENSIONS = [".json", ".yaml", ".yml"] as const;

const OPENAPI_BASENAMES = ["openapi", "swagger"] as const;

export type OpenApiInputBasename = (typeof OPENAPI_BASENAMES)[number];

export function isOpenApiInputPath(input: string): boolean {
  const normalized = input.toLowerCase();
  const extension = OPENAPI_INPUT_EXTENSIONS.find((value) => normalized.endsWith(value));

  if (!extension) {
    return false;
  }

  const basename = normalized.slice(0, -extension.length).split(/[\\/]/).pop() ?? "";

  if (OPENAPI_BASENAMES.some((name) => basename === name || basename.startsWith(`${name}.`))) {
    return true;
  }

  return basename.includes("openapi") || basename.includes("swagger");
}

export function assertOpenApiInputPath(input: string): void {
  if (!isOpenApiInputPath(input)) {
    throw new Error(
      `Unsupported OpenAPI input "${input}". Expected swagger.json, swagger.yaml, openapi.json, or openapi.yaml.`,
    );
  }
}
