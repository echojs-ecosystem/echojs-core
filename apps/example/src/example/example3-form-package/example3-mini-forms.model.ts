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
  tag: createField("", {
    schema: z.string().min(2),
    validationMode: "onBlur",
  }),
});

const loginForm = createForm<LoginValue, LoginFields>(
  {
    email: createField("", {
      schema: z.string().email(),
      validationMode: "onBlur",
    }),
    remember: createField(false, {
      schema: z.boolean(),
      parseDOMChecked: (checked) => checked,
      validationMode: "onChange",
    }),
  },
  {
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
    validationSchema: HobbiesSchema,
    defaultValues: { tags: [{ tag: "alpha" }, { tag: "beta" }] },
    defaultAsyncValues: async () => ({
      tags: [{ tag: "hello" }, { tag: "world" }, { tag: "demo" }],
    }),
    fieldArrayFactories: {
      tags: newTagRow,
    },
  },
);

export interface Example3MiniFormsVM {
  login: ReturnType<typeof wireFormModel<LoginFields>>;
  loginForm: typeof loginForm;
  hobbies: ReturnType<typeof wireFormModel<HobbiesFields>>;
  hobbiesForm: typeof hobbiesForm;
  appendTag: () => void;
  removeTag: (index: number) => void;
}

export const $miniFormsModel = createModel((): Example3MiniFormsVM => {
  return {
    login: wireFormModel(loginForm.fields),
    loginForm,
    hobbies: wireFormModel(hobbiesForm.fields),
    hobbiesForm,
    appendTag: () => hobbiesForm.fields.tags.append(newTagRow()),
    removeTag: (index) => hobbiesForm.fields.tags.removeAt(index),
  };
});
