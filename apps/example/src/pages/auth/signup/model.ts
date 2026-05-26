import { createField, createForm, wireFormModel } from "@echojs/form";
import { persist, withLocalStorage } from "@echojs/persist";
import { z } from "zod";
import { fieldAsPersistable } from "@shared/lib/persist-form.js";

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
    name: createField(""),
    email: createField(""),
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

persist(fieldAsPersistable(authSignupForm.fields.name), withLocalStorage({ key: "echojs:signup:name" }));
persist(fieldAsPersistable(authSignupForm.fields.email), withLocalStorage({ key: "echojs:signup:email" }));

export const authSignupUi = wireFormModel(authSignupForm.fields);
