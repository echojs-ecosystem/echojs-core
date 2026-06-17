/** Build a template literal expression for an OpenAPI path with `{param}` placeholders. */
export function buildUrlPathExpression(openApiPath: string, paramNames: string[]): string {
  if (paramNames.length === 0) {
    return `"${openApiPath}"`;
  }

  const chunks: string[] = [];
  const pattern = /\{([^}]+)\}/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(openApiPath)) !== null) {
    if (match.index > lastIndex) {
      chunks.push(openApiPath.slice(lastIndex, match.index));
    }

    const paramName = match[1];
    chunks.push(`\${encodeURIComponent(String(params.${paramName}))}`);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < openApiPath.length) {
    chunks.push(openApiPath.slice(lastIndex));
  }

  return `\`${chunks.join("")}\``;
}

export function extractPathParamNames(openApiPath: string): string[] {
  const names: string[] = [];
  const pattern = /\{([^}]+)\}/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(openApiPath)) !== null) {
    if (match[1]) names.push(match[1]);
  }

  return names;
}
