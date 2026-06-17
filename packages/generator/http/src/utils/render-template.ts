import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import Handlebars from "handlebars";

function resolveTemplatesDir(): string {
  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.resolve(moduleDir, "templates"),
    path.resolve(moduleDir, "../templates"),
    path.resolve(moduleDir, "../../templates"),
  ];

  const match = candidates.find((candidate) => existsSync(candidate));
  if (!match) {
    throw new Error("Echo HTTP generator templates directory was not found.");
  }

  return match;
}

const templatesDir = resolveTemplatesDir();

const templateCache = new Map<string, HandlebarsTemplateDelegate>();

export function renderTemplate<TContext>(
  templateName:
    | "endpoint.hbs"
    | "index.hbs"
    | "async-query.hbs"
    | "async-mutation.hbs"
    | "async-infinite-query.hbs"
    | "async-defaults.hbs",
  context: TContext,
): string {
  const cached = templateCache.get(templateName);

  if (cached) {
    return cached(context);
  }

  const source = readFileSync(path.join(templatesDir, templateName), "utf8");
  const template = Handlebars.compile(source, { noEscape: true });
  templateCache.set(templateName, template);

  return template(context);
}
