import { collectFormValueFromFields, createField, createFieldArray, createForm, wireFormModel } from "@echojs/form";
import { withLocalStorage } from "@echojs/persist";
import { createStore } from "@echojs/store";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(1, "Укажите имя"),
  email: z.string().email("Email"),
  phones: z.array(z.string().min(3, "Телефон от 3 символов")).min(1, "Добавьте телефон"),
});

export const profileForm = createForm(
  {
    name: createField("").extend(withLocalStorage({ key: "echojs:profile:name" })),
    email: createField("").extend(withLocalStorage({ key: "echojs:profile:email" })),
    phones: createFieldArray<string>([]).extend(withLocalStorage({ key: "echojs:profile:phones" })),
  },
  {
    name: "ProfileForm",
    validationSchema: profileSchema,
    defaultValues: { name: "", email: "", phones: [] as string[] },
  },
);

export const profileFormSnapshotStore = createStore(
  { name: "", email: "", phones: [] as string[] },
  { name: "profile-form-snapshot" },
).extend(
  withLocalStorage({
    key: "echojs:profile-form",
    select: () =>
      collectFormValueFromFields(profileForm.fields) as {
        name: string;
        email: string;
        phones: string[];
      },
    merge: (_current, snapshot) => {
      profileForm.fields.name.set(snapshot.name);
      profileForm.fields.email.set(snapshot.email);
      profileForm.fields.phones.replace([...snapshot.phones]);
      return snapshot;
    },
  }),
);

export const profileUi = wireFormModel(profileForm.fields);

export const saveProfileSnapshot = (): void => {
  const snapshot = collectFormValueFromFields(profileForm.fields) as {
    name: string;
    email: string;
    phones: string[];
  };
  profileFormSnapshotStore.set(snapshot);
};
