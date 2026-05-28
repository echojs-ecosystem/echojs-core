import { createField, createForm, wireFormModel } from "@echojs/form";
import { withLocalStorage } from "@echojs/persist";
import { z } from "zod";

const signupSchema = z
  .object({
    name: z.string().min(2, "Имя от 2 символов"),
    email: z.string().email("Укажите email"),
    password: z.string().min(8, "Пароль от 8 символов"),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((v) => v === true, { message: "Нужно принять условия" }),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export const authSignupForm = createForm(
  {
    name: createField("").extend(withLocalStorage({ key: "echojs:signup:name" })),
    email: createField("").extend(withLocalStorage({ key: "echojs:signup:email" })),
    password: createField(""),
    confirmPassword: createField(""),
    acceptTerms: createField(false),
  },
  {
    name: "AuthSignupForm",
    validationSchema: signupSchema,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  },
);

export const authSignupUi = wireFormModel(authSignupForm.fields);

