import { createField, createForm, wireFormModel } from "@echojs/form";
import { persist, withLocalStorage } from "@echojs/persist";
import { z } from "zod";
import { fieldAsPersistable } from "@shared/lib/persist-form.js";

const loginSchema = z.object({
  email: z.string().email("Укажите корректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
  remember: z.boolean(),
});

export const authLoginForm = createForm(
  {
    email: createField(""),
    password: createField(""),
    remember: createField(false),
  },
  {
    name: "AuthLoginForm",
    validationSchema: loginSchema,
    defaultValues: { email: "demo@echojs.dev", password: "echojs", remember: true },
  },
);

persist(
  fieldAsPersistable(authLoginForm.fields.email),
  withLocalStorage({ key: "echojs:login:email" }),
);

persist(
  fieldAsPersistable(authLoginForm.fields.remember),
  withLocalStorage({ key: "echojs:login:remember" }),
);

export const authLoginUi = wireFormModel(authLoginForm.fields);
