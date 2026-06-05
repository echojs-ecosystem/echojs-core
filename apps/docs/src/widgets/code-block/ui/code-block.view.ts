import { createView, type Child } from "@echojs/hyperdom";
import { div, button } from "@echojs/hyperdom";
import type { CodeBlockVM } from "@widgets/code-block/model/code-block.model.js";
import { codeBlockStyles } from "@widgets/code-block/ui/code-block.view.styles.js";

const code = codeBlockStyles();

export const CodeBlockView = createView((vm: CodeBlockVM): Child => {
  const { props } = vm;

  const highlighted = div({
    class: props.bare ? code.bareBody() : code.body(),
    ".innerHTML": () => vm.$html.value(),
  });

  if (props.bare) return highlighted;

  return div({ class: code.root() }, [
    div({ class: code.header() }, [
      div({ class: code.lang() }, props.language || "text"),
      button(
        {
          type: "button",
          class: code.copyBtn(),
          onClick: () => void vm.copy(),
        },
        vm.copyLabel,
      ),
    ]),
    highlighted,
  ]);
}, "CodeBlockView");
