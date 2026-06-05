import type { Child } from "@echojs/hyperdom";
import { code, h, strong } from "@echojs/hyperdom";
import { NavLink } from "@echojs/router/hyperdom";
import { docPageByContentId } from "@app/router/doc-pages.js";

export type InlinePart =
  | { type: "text"; value: string }
  | { type: "strong"; value: string }
  | { type: "code"; value: string }
  | { type: "link"; label: string; href: string };

const LINK_RE = /^\[([^\]]+)\]\(([^)]+)\)/;
const STRONG_RE = /^\*\*([^*]+)\*\*/;
const CODE_RE = /^`([^`]+)`/;

export const parseInlineMarkdown = (text: string): InlinePart[] => {
  const parts: InlinePart[] = [];
  let i = 0;

  const pushText = (value: string): void => {
    if (value) parts.push({ type: "text", value });
  };

  while (i < text.length) {
    const rest = text.slice(i);
    const link = LINK_RE.exec(rest);
    if (link) {
      parts.push({ type: "link", label: link[1]!, href: link[2]! });
      i += link[0].length;
      continue;
    }
    const bold = STRONG_RE.exec(rest);
    if (bold) {
      parts.push({ type: "strong", value: bold[1]! });
      i += bold[0].length;
      continue;
    }
    const inlineCode = CODE_RE.exec(rest);
    if (inlineCode) {
      parts.push({ type: "code", value: inlineCode[1]! });
      i += inlineCode[0].length;
      continue;
    }

    const next = rest.search(/\[|`|\*\*/);
    if (next === -1) {
      pushText(rest);
      break;
    }
    if (next > 0) {
      pushText(rest.slice(0, next));
      i += next;
      continue;
    }
    pushText(rest[0]!);
    i += 1;
  }

  return parts;
};

const docLinkContentId = (href: string): string | null => {
  const trimmed = href.trim();
  if (!trimmed.startsWith("/docs/") && !trimmed.startsWith("docs/")) return null;
  const path = trimmed.replace(/^\/?docs\/?/, "").replace(/\/$/, "");
  return path || null;
};

export type RenderInlineOptions = {
  linkClass?: string;
  codeClass?: string;
};

export const renderInlineMarkdown = (
  text: string,
  options: RenderInlineOptions = {},
): Child[] => {
  const { linkClass, codeClass } = options;
  return parseInlineMarkdown(text).map((part): Child => {
    switch (part.type) {
      case "text":
        return part.value;
      case "strong":
        return strong(null, renderInlineMarkdown(part.value, options));
      case "code":
        return code({ class: codeClass }, part.value);
      case "link": {
        const href = part.href.trim();
        if (href.startsWith("#")) {
          return h("a", { href, class: linkClass }, part.label);
        }
        const contentId = docLinkContentId(href);
        const page = contentId ? docPageByContentId[contentId] : undefined;
        if (page) {
          return NavLink({ to: page, class: linkClass, children: part.label });
        }
        const external = /^https?:\/\//i.test(href);
        return h(
          "a",
          {
            href,
            class: linkClass,
            ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}),
          },
          part.label,
        );
      }
      default:
        return "";
    }
  });
};
