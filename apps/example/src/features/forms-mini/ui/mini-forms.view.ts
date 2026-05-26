import { bindField } from "@echojs/form";
import { List, button, code, div, h2, hr, input, label, p, span } from "@echojs/hyperdom";
import type { Child } from "@echojs/hyperdom";
import type { MiniFormsVM } from "@features/forms-mini/model/mini-forms.model.js";

export const MiniFormsView = ({
  login,
  loginForm,
  hobbies,
  hobbiesForm,
  appendTag,
  removeTag,
}: MiniFormsVM) => {
  return div(
    { class: "forms-mini" },
    h2(null, "Ещё несколько примеров: @echojs/form + Zod (Standard Schema)"),
    p(null, [
      "Шаблон: ",
      code(
        null,
        "createForm({ email: createField(...), ... }, { validationSchema, defaultValues, defaultAsyncValues })",
      ),
      ". Ошибки полей перекрывают совпадающие пути общей схемы. Для списков в Hyperdom используй ",
      code(null, 'bindField(field, { variant: "text", controlledValue: true })'),
      ", иначе после перерисовки `List` инпуты могут «терять» текст из сигналов.",
    ]),
    hr(null),

    div(
      h2(null, "1) Email + checkbox (remember)"),
      label(
        null,
        div(null, "Email"),
        input({
          ...bindField(login.email, { variant: "email" }),
        }),
      ),
      (): Child => {
        const errs = login.email.meta().errors;
        return errs.length ? div({ class: "error" }, errs.join(", ")) : null;
      },

      label(
        { style: "display:flex; gap:10px; align-items:center;" },
        input({
          ...bindField(login.remember, { variant: "checkbox" }),
        }),
        span(null, "Запомнить"),
      ),

      button(
        {
          type: "button",
          onClick: async () => {
            const res = await loginForm.submit(async (value) => {
              console.log("login ok", value);
            });

            if (!res.ok) console.log("login blocked", res.errors);
          },
        },
        "submit (смотри консоль)",
      ),
    ),

    hr(null),

    div(
      null,
      h2(null, "2) Небольшой fieldArray (+ submit schema)"),

      div(
        null,
        List(hobbies.tags.$items, (row, index) =>
          div(
            { style: "display:flex; gap:10px; align-items:center;" },
            input({
              placeholder: "тег",
              ...bindField(row.tag, { variant: "text", controlledValue: true }),
            }),
            (): Child => {
              const errs = row.tag.$meta.value().errors;
              return errs.length ? span({ class: "error-inline" }, errs[0] ?? "") : null;
            },
            button({ type: "button", onClick: () => removeTag(index()) }, "remove"),
          ),
        ),
      ),

      div(
        { style: "display:flex; gap:10px; margin-top:10px;" },
        button({ type: "button", onClick: () => appendTag() }, "+ тег"),
        button(
          {
            type: "button",
            onClick: async () => {
              const res = await hobbiesForm.submit(async (value) => {
                console.log("hobbies ok", value);
              });
              if (!res.ok) console.log("hobbies blocked", res.errors);
            },
          },
          "submit (смотри консоль)",
        ),
      ),
    ),
  );
};
