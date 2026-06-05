import { effect, signal } from "@echojs/reactivity";
import type { Signal } from "@echojs/reactivity";
import { createModel } from "@echojs/hyperdom";
import { $themeMode } from "@app/providers/theme-store.js";
import { highlightCode } from "@widgets/code-block/helpers/shiki/highlighter.js";
import { resolveShikiTheme } from "@widgets/code-block/helpers/shiki/resolve-theme.js";

export type CodeBlockProps = {
  language: string;
  code: string;
  bare?: boolean;
};

export type CodeBlockVM = {
  props: CodeBlockProps;
  $html: Signal<string>;
  $copied: Signal<boolean>;
  copy: () => Promise<void>;
  copyLabel: () => string;
};

export const createCodeBlockModel = (props: CodeBlockProps) =>
  createModel((): CodeBlockVM => {
    const $html = signal("");
    const $copied = signal(false);

    const renderHighlight = async (): Promise<void> => {
      $html.set(await highlightCode(props.code, props.language, resolveShikiTheme()));
    };

    effect(() => {
      $themeMode.value();
      void renderHighlight();
    });

    return {
      props,
      $html,
      $copied,
      copy: async () => {
        await navigator.clipboard.writeText(props.code);
        $copied.set(true);
        setTimeout(() => $copied.set(false), 2000);
      },
      copyLabel: () => ($copied.value() ? "Copied" : "Copy"),
    };
  }, "CodeBlockModel");
