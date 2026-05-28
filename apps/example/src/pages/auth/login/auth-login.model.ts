import { createField, createForm, wireFormModel } from "@echojs/form";
import { withLocalStorage } from "@echojs/persist";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Укажите корректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
  remember: z.boolean(),
});

export const authLoginForm = createForm(
  {
    email: createField("").extend(withLocalStorage({ key: "echojs:login:email" })),
    password: createField(""),
    remember: createField(false).extend(withLocalStorage({ key: "echojs:login:remember" })),
  },
  {
    name: "AuthLoginForm",
    validationSchema: loginSchema,
    defaultValues: { email: "demo@echojs.dev", password: "echojs", remember: true },
  },
);

export const authLoginUi = wireFormModel(authLoginForm.fields);

