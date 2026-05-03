import { bindFieldController } from "@echojs/form";
import {
  List,
  button,
  code,
  div,
  h2,
  h3,
  hr,
  input,
  label,
  option,
  p,
  select,
  span,
  textarea,
} from "@echojs/hyperdom";
import type { Child } from "@echojs/hyperdom";
import { ROLE_OPTIONS, type Example4NestedVM } from "./example4-nested.model";

const errorLine = (errs: readonly string[]): Child | null =>
  errs.length ? div({ class: "error" }, errs.join(", ")) : null;

export const Example4NestedView = ({
  ui,
  form,
  appendDept,
  removeDept,
  appendEmployee,
  removeEmployee,
  appendTicket,
  removeTicket,
}: Example4NestedVM) => {
  return div(
    { class: "example4" },
    h2(null, "Example 4 — вложенные массивы + select/textarea/number/range"),
    p(null, [
      "Утилита ",
      code(null, "bindFieldController(field, { variant })"),
      " объединяет пропсы для разных контролов. Вложенность: ",
      code(null, "departments[] → employees[] → tickets[]"),
      ".",
    ]),
    hr(null),

    label(
      null,
      div(null, "Название каталога"),
      input({
        ...bindFieldController(ui.catalogTitle, { variant: "text", controlledValue: true }),
      }),
    ),
    (): Child => errorLine(ui.catalogTitle.meta().errors),

    div(
      { style: "margin-top:12px; display:flex; gap:8px; flex-wrap:wrap;" },
      button({ type: "button", onClick: () => appendDept() }, "+ отдел"),
      button(
        {
          type: "button",
          onClick: async () => {
            const res = await form.submit((v) => console.log("catalog ok", v));
            if (!res.ok) console.log("catalog blocked", res.errors);
          },
        },
        "submit (консоль)",
      ),
    ),

    hr(null),

    List(form.fields.departments.$items, (dept, deptIndex) =>
      div(
        { class: "dept-card", style: "border:1px solid #ccc; padding:12px; margin:10px 0; border-radius:8px;" },
        h3(null, ["Отдел #", span(null, String(deptIndex() + 1))]),
        label(
          null,
          span(null, "Заголовок отдела"),
          input({
            ...bindFieldController(dept.title, { variant: "text", controlledValue: true }),
          }),
        ),
        (): Child => errorLine(dept.title.$meta.value().errors),

        div(
          { style: "display:flex; gap:8px; margin:8px 0;" },
          button({ type: "button", onClick: () => appendEmployee(deptIndex()) }, "+ сотрудник"),
          button({ type: "button", onClick: () => removeDept(deptIndex()) }, "удалить отдел"),
        ),

        List(dept.employees.$items, (emp, empIndex) =>
          div(
            {
              style:
                "margin:8px 0; padding:10px; background:#f7f7f7; border-radius:6px; display:grid; gap:8px;",
            },
            div(null, [
              span({ style: "font-weight:600;" }, "Сотрудник"),
              span(null, ` ${empIndex() + 1}`),
            ]),

            label(
              null,
              span(null, "Имя"),
              input({
                ...bindFieldController(emp.name, { variant: "text", controlledValue: true }),
              }),
            ),
            (): Child => errorLine(emp.name.$meta.value().errors),

            label(
              null,
              span(null, "Роль"),
              select(
                { ...bindFieldController(emp.role, { variant: "select", controlledValue: true }) },
                ...ROLE_OPTIONS.map((o) => option({ value: o.value }, o.label)),
              ),
            ),
            (): Child => errorLine(emp.role.$meta.value().errors),

            label(
              null,
              span(null, "Комментарий"),
              textarea({
                rows: 3,
                style: "width:100%; box-sizing:border-box;",
                ...bindFieldController(emp.comment, { variant: "textarea", controlledValue: true }),
              }),
            ),
            (): Child => errorLine(emp.comment.$meta.value().errors),

            div(
              { style: "display:flex; gap:8px; flex-wrap:wrap;" },
              button(
                { type: "button", onClick: () => appendTicket(deptIndex(), empIndex()) },
                "+ тикет",
              ),
              button(
                { type: "button", onClick: () => removeEmployee(deptIndex(), empIndex()) },
                "удалить сотрудника",
              ),
            ),

            List(emp.tickets.$items, (ticket, ticketIndex) =>
              div(
                {
                  style:
                    "display:flex; flex-wrap:wrap; gap:10px; align-items:center; padding:6px 0; border-top:1px dashed #ddd;",
                },
                label(
                  { style: "display:flex; flex-direction:column; gap:4px;" },
                  span(null, "Код"),
                  input({
                    ...bindFieldController(ticket.code, { variant: "text", controlledValue: true }),
                  }),
                ),
                (): Child => errorLine(ticket.code.$meta.value().errors),

                label(
                  { style: "display:flex; flex-direction:column; gap:4px;" },
                  span(null, "ETA (дни)"),
                  input({
                    ...bindFieldController(ticket.eta, { variant: "number", controlledValue: true }),
                  }),
                ),

                label(
                  { style: "display:flex; flex-direction:column; gap:4px; min-width:160px;" },
                  span(null, "ETA (ползунок)"),
                  input({
                    ...bindFieldController(ticket.eta, {
                      variant: "range",
                      min: 0,
                      max: 120,
                      step: 1,
                      controlledValue: true,
                    }),
                  }),
                ),

                button(
                  {
                    type: "button",
                    onClick: () => removeTicket(deptIndex(), empIndex(), ticketIndex()),
                  },
                  "✕",
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  );
};
