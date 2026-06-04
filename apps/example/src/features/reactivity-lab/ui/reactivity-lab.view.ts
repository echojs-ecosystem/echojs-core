import { List, Show, createView, type Child } from "@echojs/hyperdom";
import {
  article,
  button,
  code,
  cx,
  div,
  h4,
  input,
  label,
  li,
  p,
  pre,
  section,
  span,
  strong,
  ul,
} from "@echojs/hyperdom";

import { i18n } from "@app/providers/i18n.js";
import { cardHintKey, cardTitleKey, type ReactivityCardBase } from "@app/providers/i18n.js";
import type { ReactivityLabVM, TodoItem } from "@features/reactivity-lab/model/reactivity-lab.model.js";

const LabCard = (baseKey: ReactivityCardBase, body: Child): Child =>
  div({ class: "demo-reactivity__card" }, [
    h4(null, () => i18n.t(cardTitleKey(baseKey))),
    p({ class: "demo-reactivity__hint" }, () => i18n.t(cardHintKey(baseKey))),
    body,
  ]);

const MetaRow = (labelText: string, value: () => string | number): Child =>
  div({ class: "demo-reactivity__meta" }, [code(null, labelText), span(null, value)]);

export const ReactivityLabView = createView((vm: ReactivityLabVM): Child => {
  const {
    $count,
    $firstName,
    $lastName,
    $fullName,
    $greeting,
    $batchA,
    $batchB,
    $batchEffectRuns,
    $profile,
    $todoDraft,
    $todos,
    $doneCount,
    $peekTarget,
    $peekEffectRuns,
    $writable,
    $readonlyView,
    $clockEnabled,
    $clock,
    $cart,
    $cartTotal,
    $cartItemsCount,
    $logs,
  } = vm;

  const todoRow = (item: TodoItem): Child =>
    li({ class: () => (item.done ? "demo-reactivity__todo is-done" : "demo-reactivity__todo") }, [
      label(null, [
        input({
          type: "checkbox",
          checked: item.done,
          onChange: () => vm.toggleTodo(item.id),
        }),
        span(null, item.text),
      ]),
    ]);

  const cartRow = (line: { sku: string; label: string; price: number; qty: number }): Child =>
    li({ class: "demo-reactivity__cart-line" }, [
      span(null, line.label),
      span(null, () => `${line.qty} × ${line.price} ₽`),
      div({ class: "demo-reactivity__cart-actions" }, [
        button({ type: "button", class: "secondary", onClick: () => vm.changeCartQty(line.sku, -1) }, "−"),
        button({ type: "button", class: "secondary", onClick: () => vm.changeCartQty(line.sku, 1) }, "+"),
      ]),
    ]);

  return article({ class: "demo-reactivity" }, [
    p({ class: "demo-reactivity__intro" }, () => i18n.t("reactivityLab.intro")),

    div({ class: "demo-reactivity__grid" }, [
      LabCard("reactivityLab.cards.signal", div(null, [
          section(
            {
              class: () =>
                cx("demo-reactivity__counter", { "is-positive": $count.value() > 0 }),
            },
            [
              div({ class: "demo-reactivity__actions" }, [
                button({ type: "button", onClick: vm.decrement }, "−"),
                button({ type: "button", onClick: vm.increment }, "+"),
                button({ type: "button", class: "secondary", onClick: vm.resetCount }, "reset"),
              ]),
              strong({ class: "demo-reactivity__count" }, () => $count.value()),
              Show(
                () => $count.value() > 0,
                () => p({ class: "demo-reactivity__badge" }, () => i18n.t("reactivityLab.countPositive")),
              ),
            ],
          ),
        ]),
      ),

      LabCard("reactivityLab.cards.computed", div(null, [
          div({ class: "demo-reactivity__form-row" }, [
            label(null, [
              "first ",
              input({
                type: "text",
                value: $firstName.value(),
                onChange: (e) => vm.setFirstName(e.currentTarget.value),
              }),
            ]),
            label(null, [
              "last ",
              input({
                type: "text",
                value: $lastName.value(),
                onChange: (e) => vm.setLastName(e.currentTarget.value),
              }),
            ]),
          ]),
          MetaRow("fullName", () => `"${$fullName.value()}"`),
          MetaRow("greeting", () => $greeting.value()),
        ]),
      ),

      LabCard("reactivityLab.cards.batch", div(null, [
          MetaRow("A", () => $batchA.value()),
          MetaRow("B", () => $batchB.value()),
          MetaRow("effect runs", () => $batchEffectRuns.value()),
          div({ class: "demo-reactivity__actions" }, [
            button({ type: "button", onClick: vm.runBatchUpdate }, "batch +1"),
            button({ type: "button", class: "secondary", onClick: vm.runSequentialUpdate }, "sequential +1"),
            button({ type: "button", class: "secondary", onClick: vm.resetBatch }, "reset"),
          ]),
          p({ class: "demo-reactivity__note" }, () => i18n.t("reactivityLab.batchNote")),
        ]),
      ),

      LabCard("reactivityLab.cards.object", div(null, [
          div({ class: "demo-reactivity__form-row" }, [
            input({
              type: "text",
              value: () => $profile.value().name,
              onChange: (e) => vm.renameProfile(e.currentTarget.value),
            }),
            input({
              type: "text",
              value: () => $profile.value().role,
              onChange: (e) => vm.setProfileRole(e.currentTarget.value),
            }),
          ]),
          div({ class: "demo-reactivity__actions" }, [
            button({ type: "button", onClick: vm.addProfileTag }, "add tag"),
            button({ type: "button", class: "secondary", onClick: vm.removeLastTag }, "pop tag"),
          ]),
          div({ class: "demo-reactivity__tags" }, List(() => $profile.value().tags, (tag) => span({ class: "demo-reactivity__tag" }, tag))),
        ]),
      ),

      LabCard("reactivityLab.cards.todos", div(null, [
          div({ class: "demo-reactivity__form-row" }, [
            input({
              type: "text",
              placeholder: i18n.t("reactivityLab.todoPlaceholder"),
              value: $todoDraft.value(),
              onChange: (e) => vm.setTodoDraft(e.currentTarget.value),
              onKeydown: (e: KeyboardEvent) => {
                if (e.key === "Enter") vm.addTodo();
              },
            }),
            button({ type: "button", onClick: vm.addTodo }, "Add"),
          ]),
          MetaRow("done", () => `${$doneCount.value()} / ${$todos.value().length}`),
          ul({ class: "demo-reactivity__todos" }, List(() => $todos.value(), todoRow)),
          button({ type: "button", class: "secondary", onClick: vm.clearDoneTodos }, "Clear done"),
        ]),
      ),

      LabCard("reactivityLab.cards.peek", div(null, [
          MetaRow("peekTarget", () => $peekTarget.value()),
          MetaRow("effect runs", () => $peekEffectRuns.value()),
          div({ class: "demo-reactivity__actions" }, [
            button({ type: "button", onClick: vm.bumpPeekTarget }, "peekTarget++"),
            button({ type: "button", class: "secondary", onClick: vm.resetPeekDemo }, "reset"),
          ]),
        ]),
      ),

      LabCard("reactivityLab.cards.readonly", div(null, [
          MetaRow("writable", () => $writable.value()),
          MetaRow("readonlyView", () => $readonlyView.value()),
          div({ class: "demo-reactivity__actions" }, [
            button({ type: "button", onClick: vm.bumpWritable }, "writable++"),
            button({ type: "button", class: "secondary", onClick: vm.tryMutateReadonly }, "readonly info"),
          ]),
        ]),
      ),

      LabCard("reactivityLab.cards.clock", div(null, [
          MetaRow("enabled", () => String($clockEnabled.value())),
          MetaRow("clock", () => $clock.value()),
          div({ class: "demo-reactivity__actions" }, [
            button({ type: "button", onClick: vm.toggleClock }, () =>
              $clockEnabled.value() ? "Stop clock" : "Start clock",
            ),
            button({ type: "button", class: "secondary", onClick: vm.resetClock }, "reset tick"),
          ]),
        ]),
      ),

      LabCard("reactivityLab.cards.cart", div(null, [
          div({ class: "demo-reactivity__actions" }, [
            button({ type: "button", onClick: () => vm.addCartItem("cpu") }, "+ CPU"),
            button({ type: "button", onClick: () => vm.addCartItem("ram") }, "+ RAM"),
            button({ type: "button", onClick: () => vm.addCartItem("ssd") }, "+ SSD"),
            button({ type: "button", class: "secondary", onClick: vm.clearCart }, "clear"),
          ]),
          ul({ class: "demo-reactivity__cart" }, List(() => $cart.value(), cartRow)),
          MetaRow("items", () => $cartItemsCount.value()),
          MetaRow("total", () => `${$cartTotal.value()} ₽`),
        ]),
      ),

      LabCard("reactivityLab.cards.model", div(null, [
          p(null, () => i18n.t("reactivityLab.modelNote1")),
          p(null, () => i18n.t("reactivityLab.modelNote2")),
          MetaRow("model", () => "ReactivityLabModel"),
        ]),
      ),
    ]),

    section({ class: "demo-reactivity__log" }, [
      div({ class: "demo-reactivity__log-header" }, [
        strong(null, () => i18n.t("reactivityLab.logTitle")),
        button({ type: "button", class: "secondary", onClick: vm.clearLogs }, "clear"),
      ]),
      pre(null, () => $logs.value().join("\n") || "—"),
    ]),
  ]);
}, "ReactivityLabView");
