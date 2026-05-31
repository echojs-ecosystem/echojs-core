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

import type { ReactivityLabVM, TodoItem } from "@features/reactivity-lab/model/reactivity-lab.model.js";

const LabCard = (title: string, hint: string, body: Child): Child =>
  div({ class: "demo-reactivity__card" }, [
    h4(null, title),
    p({ class: "demo-reactivity__hint" }, hint),
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
          "on:change": () => vm.toggleTodo(item.id),
        }),
        span(null, item.text),
      ]),
    ]);

  const cartRow = (line: { sku: string; label: string; price: number; qty: number }): Child =>
    li({ class: "demo-reactivity__cart-line" }, [
      span(null, line.label),
      span(null, () => `${line.qty} × ${line.price} ₽`),
      div({ class: "demo-reactivity__cart-actions" }, [
        button({ type: "button", class: "secondary", "on:click": () => vm.changeCartQty(line.sku, -1) }, "−"),
        button({ type: "button", class: "secondary", "on:click": () => vm.changeCartQty(line.sku, 1) }, "+"),
      ]),
    ]);

  return article({ class: "demo-reactivity" }, [
    p({ class: "demo-reactivity__intro" }, [
      "Интерактивные примеры ",
      code(null, "@echojs/reactivity"),
      " + интеграция с ",
      code(null, "@echojs/hyperdom"),
      " (",
      code(null, "Show"),
      ", ",
      code(null, "List"),
      ", ",
      code(null, "createModel"),
      ").",
    ]),

    div({ class: "demo-reactivity__grid" }, [
      LabCard(
        "signal — базовое состояние",
        "signal(initial), .set(), .update(), реактивный DOM через функции-геттеры.",
        div(null, [
          section(
            {
              class: () =>
                cx("demo-reactivity__counter", { "is-positive": $count.value() > 0 }),
            },
            [
              div({ class: "demo-reactivity__actions" }, [
                button({ type: "button", "on:click": vm.decrement }, "−"),
                button({ type: "button", "on:click": vm.increment }, "+"),
                button({ type: "button", class: "secondary", "on:click": vm.resetCount }, "reset"),
              ]),
              strong({ class: "demo-reactivity__count" }, () => $count.value()),
              Show(
                () => $count.value() > 0,
                () => p({ class: "demo-reactivity__badge" }, "count > 0"),
              ),
            ],
          ),
        ]),
      ),

      LabCard(
        "computed — производные значения",
        "computed(() => …) пересчитывается при изменении зависимостей.",
        div(null, [
          div({ class: "demo-reactivity__form-row" }, [
            label(null, [
              "first ",
              input({
                type: "text",
                value: $firstName.value(),
                "on:change": (e) => vm.setFirstName(e.currentTarget.value),
              }),
            ]),
            label(null, [
              "last ",
              input({
                type: "text",
                value: $lastName.value(),
                "on:change": (e) => vm.setLastName(e.currentTarget.value),
              }),
            ]),
          ]),
          MetaRow("fullName", () => `"${$fullName.value()}"`),
          MetaRow("greeting", () => $greeting.value()),
        ]),
      ),

      LabCard(
        "batch — группировка обновлений",
        "batch() объединяет несколько .set/.update в одну реактивную транзакцию.",
        div(null, [
          MetaRow("A", () => $batchA.value()),
          MetaRow("B", () => $batchB.value()),
          MetaRow("effect runs", () => $batchEffectRuns.value()),
          div({ class: "demo-reactivity__actions" }, [
            button({ type: "button", "on:click": vm.runBatchUpdate }, "batch +1"),
            button({ type: "button", class: "secondary", "on:click": vm.runSequentialUpdate }, "sequential +1"),
            button({ type: "button", class: "secondary", "on:click": vm.resetBatch }, "reset"),
          ]),
          p({ class: "demo-reactivity__note" }, "Sequential даст +2 effect runs, batch — +1."),
        ]),
      ),

      LabCard(
        "object state — вложенное состояние",
        "Обновление через immutable .update(prev => ({ …prev, tags: [...] })).",
        div(null, [
          div({ class: "demo-reactivity__form-row" }, [
            input({
              type: "text",
              value: () => $profile.value().name,
              "on:change": (e) => vm.renameProfile(e.currentTarget.value),
            }),
            input({
              type: "text",
              value: () => $profile.value().role,
              "on:change": (e) => vm.setProfileRole(e.currentTarget.value),
            }),
          ]),
          div({ class: "demo-reactivity__actions" }, [
            button({ type: "button", "on:click": vm.addProfileTag }, "add tag"),
            button({ type: "button", class: "secondary", "on:click": vm.removeLastTag }, "pop tag"),
          ]),
          div({ class: "demo-reactivity__tags" }, List(() => $profile.value().tags, (tag) => span({ class: "demo-reactivity__tag" }, tag))),
        ]),
      ),

      LabCard(
        "array + List — список задач",
        "Массив в signal + hyperdom List() для эффективного рендера.",
        div(null, [
          div({ class: "demo-reactivity__form-row" }, [
            input({
              type: "text",
              placeholder: "Новая задача",
              value: $todoDraft.value(),
              "on:change": (e) => vm.setTodoDraft(e.currentTarget.value),
              "on:keydown": (e) => {
                if (e.key === "Enter") vm.addTodo();
              },
            }),
            button({ type: "button", "on:click": vm.addTodo }, "Add"),
          ]),
          MetaRow("done", () => `${$doneCount.value()} / ${$todos.value().length}`),
          ul({ class: "demo-reactivity__todos" }, List(() => $todos.value(), todoRow)),
          button({ type: "button", class: "secondary", "on:click": vm.clearDoneTodos }, "Clear done"),
        ]),
      ),

      LabCard(
        "peek vs value",
        "peek() читает без подписки — effect с peek не перезапускается.",
        div(null, [
          MetaRow("peekTarget", () => $peekTarget.value()),
          MetaRow("effect runs", () => $peekEffectRuns.value()),
          div({ class: "demo-reactivity__actions" }, [
            button({ type: "button", "on:click": vm.bumpPeekTarget }, "peekTarget++"),
            button({ type: "button", class: "secondary", "on:click": vm.resetPeekDemo }, "reset"),
          ]),
        ]),
      ),

      LabCard(
        "readonly — только чтение",
        "readonly(signal) для передачи наружу без мутации.",
        div(null, [
          MetaRow("writable", () => $writable.value()),
          MetaRow("readonlyView", () => $readonlyView.value()),
          div({ class: "demo-reactivity__actions" }, [
            button({ type: "button", "on:click": vm.bumpWritable }, "writable++"),
            button({ type: "button", class: "secondary", "on:click": vm.tryMutateReadonly }, "readonly info"),
          ]),
        ]),
      ),

      LabCard(
        "scope + cleanup — таймер",
        "scope/effect/cleanup: interval стартует и очищается при toggle.",
        div(null, [
          MetaRow("enabled", () => String($clockEnabled.value())),
          MetaRow("clock", () => $clock.value()),
          div({ class: "demo-reactivity__actions" }, [
            button({ type: "button", "on:click": vm.toggleClock }, () =>
              $clockEnabled.value() ? "Stop clock" : "Start clock",
            ),
            button({ type: "button", class: "secondary", "on:click": vm.resetClock }, "reset tick"),
          ]),
        ]),
      ),

      LabCard(
        "computed cart — интеграция",
        "Паттерн «мини-store»: signal + computed total, как в e-commerce UI.",
        div(null, [
          div({ class: "demo-reactivity__actions" }, [
            button({ type: "button", "on:click": () => vm.addCartItem("cpu") }, "+ CPU"),
            button({ type: "button", "on:click": () => vm.addCartItem("ram") }, "+ RAM"),
            button({ type: "button", "on:click": () => vm.addCartItem("ssd") }, "+ SSD"),
            button({ type: "button", class: "secondary", "on:click": vm.clearCart }, "clear"),
          ]),
          ul({ class: "demo-reactivity__cart" }, List(() => $cart.value(), cartRow)),
          MetaRow("items", () => $cartItemsCount.value()),
          MetaRow("total", () => `${$cartTotal.value()} ₽`),
        ]),
      ),

      LabCard(
        "hyperdom + createModel",
        "createModel() создаёт VM один раз; Show/List/cx реагируют на signal.",
        div(null, [
          p(null, [
            "Эта страница собрана через ",
            code(null, "createReactivityLabModel()"),
            " и ",
            code(null, "ReactivityLabView"),
            ".",
          ]),
          p(null, [
            "Сравни с ",
            code(null, "@echojs/store"),
            " на странице State и ",
            code(null, "@echojs/query"),
            " — там signal уже внутри query instances.",
          ]),
          MetaRow("model", () => "ReactivityLabModel"),
        ]),
      ),
    ]),

    section({ class: "demo-reactivity__log" }, [
      div({ class: "demo-reactivity__log-header" }, [
        strong(null, "subscribe / effect log"),
        button({ type: "button", class: "secondary", "on:click": vm.clearLogs }, "clear"),
      ]),
      pre(null, () => $logs.value().join("\n") || "—"),
    ]),
  ]);
}, "ReactivityLabView");
