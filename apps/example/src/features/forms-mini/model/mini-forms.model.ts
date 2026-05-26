import { createModel } from "@echojs/hyperdom";
import { createField, createFieldArray, createForm, wireFormModel } from "@echojs/form";
import { z } from "zod";

type LoginValue = z.infer<typeof LoginSchema>;
type HobbiesValue = z.infer<typeof HobbiesSchema>;

const LoginSchema = z.object({
  email: z.string().email(),
  remember: z.boolean(),
});

const HobbiesSchema = z.object({
  tags: z.array(z.object({ tag: z.string().min(2) })).min(1),
});

type LoginFields = {
  email: ReturnType<typeof createField<string>>;
  remember: ReturnType<typeof createField<boolean>>;
};

type TagRow = {
  tag: ReturnType<typeof createField<string>>;
};

type HobbiesFields = {
  tags: ReturnType<typeof createFieldArray<TagRow>>;
};

const newTagRow = (): TagRow => ({
  tag: createField(""),
});

const loginForm = createForm<LoginValue, LoginFields>(
  {
    email: createField(""),
    remember: createField(false),
  },
  {
    name: "LabLoginForm",
    validationSchema: LoginSchema,
    defaultValues: { email: "", remember: false },
    defaultAsyncValues: async () => ({
      email: "prefilled@example.com",
    }),
  },
);

const hobbiesForm = createForm<HobbiesValue, HobbiesFields>(
  {
    tags: createFieldArray<TagRow>([]),
  },
  {
    name: "LabHobbiesForm",
    validationSchema: HobbiesSchema,
    defaultValues: { tags: [{ tag: "alpha" }, { tag: "beta" }] },
    defaultAsyncValues: async () => ({
      tags: [{ tag: "hello" }, { tag: "world" }, { tag: "demo" }],
    }),
  },
);

export interface MiniFormsVM {
  login: ReturnType<typeof wireFormModel<LoginFields>>;
  loginForm: typeof loginForm;
  hobbies: ReturnType<typeof wireFormModel<HobbiesFields>>;
  hobbiesForm: typeof hobbiesForm;
  appendTag: () => void;
  removeTag: (index: number) => void;
}

export const $miniFormsModel = createModel((): MiniFormsVM => {
  return {
    login: wireFormModel(loginForm.fields),
    loginForm,
    hobbies: wireFormModel(hobbiesForm.fields),
    hobbiesForm,
    appendTag: () => hobbiesForm.fields.tags.append(newTagRow()),
    removeTag: (index) => hobbiesForm.fields.tags.removeAt(index),
  };
}, "MiniFormsModel");
