import { createView, type Child } from "@echojs/hyperdom";
import { button, div, span } from "@echojs/hyperdom";
import type { HeaderDropdownVM } from "@widgets/header-dropdown/model/header-dropdown.model.js";
import { headerDropdownStyles } from "@widgets/header-dropdown/ui/header-dropdown.view.styles.js";
import { cn } from "@core/styles/cn.js";

const dd = headerDropdownStyles();

export const HeaderDropdownView = createView((vm: HeaderDropdownVM): Child => {
  const { props } = vm;

  return div({ class: dd.root(), onBlur: vm.handleBlur }, [
    () =>
      button(
        {
          type: "button",
          class: dd.trigger(),
          "aria-label": vm.resolveAriaLabel(),
          "aria-haspopup": "listbox",
          onClick: vm.toggle,
        },
        [
          span({ class: dd.triggerLabel() }, props.triggerLabel),
          span({ class: dd.chevron() }, "▾"),
        ],
      ),
    () =>
      vm.$open.value()
        ? div({ class: dd.panel(), role: "listbox" }, [
            ...vm.resolveOptions().map((opt) =>
              button(
                {
                  type: "button",
                  role: "option",
                  "aria-selected": props.selectedId() === opt.id,
                  disabled: opt.disabled,
                  class: () =>
                    cn(
                      dd.option(),
                      props.selectedId() === opt.id && dd.optionActive(),
                      opt.disabled && dd.optionDisabled(),
                    ),
                  onClick: () => vm.select(opt.id, opt.disabled),
                },
                [
                  span(null, opt.label),
                  opt.badge ? span({ class: dd.optionBadge() }, opt.badge) : null,
                ],
              ),
            ),
          ])
        : null,
  ]);
}, "HeaderDropdownView");
