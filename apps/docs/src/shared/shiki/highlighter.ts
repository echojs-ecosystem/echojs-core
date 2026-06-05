import { createHighlighter, type Highlighter } from "shiki";
import type { ShikiThemeName } from "@shared/shiki/resolve-theme.js";

let highlighterPromise: Promise<Highlighter> | undefined;

export const getHighlighter = (): Promise<Highlighter> => {
  highlighterPromise ??= createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: ["typescript", "tsx", "javascript", "json", "bash", "html", "css", "markdown"],
  });
  return highlighterPromise;
};

export const highlightCode = async (
  code: string,
  lang: string,
  theme: ShikiThemeName,
): Promise<string> => {
  const highlighter = await getHighlighter();
  const normalized = lang === "ts" ? "typescript" : lang === "js" ? "javascript" : lang;
  try {
    return highlighter.codeToHtml(code, { lang: normalized, theme });
  } catch {
    return highlighter.codeToHtml(code, { lang: "text", theme });
  }
};
