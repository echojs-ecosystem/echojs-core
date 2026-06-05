import { tv } from "tailwind-variants";

export const codeBlockStyles = tv({
  slots: {
    root: "group relative my-6 overflow-hidden rounded-xl border border-border bg-code-bg",
    header: "flex items-center justify-between border-b border-white/10 px-4 py-2",
    lang: "font-mono text-xs text-slate-400",
    copyBtn:
      "rounded-md px-2 py-1 text-xs text-slate-300 transition hover:bg-white/10 hover:text-white",
    body: "doc-code overflow-x-auto p-4 text-sm [&_pre]:!m-0 [&_pre]:!bg-transparent",
    bareBody: "doc-code overflow-x-auto p-5 text-[13px] leading-relaxed [&_pre]:!m-0 [&_pre]:!bg-transparent",
  },
});
