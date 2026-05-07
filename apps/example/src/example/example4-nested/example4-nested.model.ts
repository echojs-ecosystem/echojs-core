import { effect } from "@echojs-ecosystem/reactivity";
import { createModel } from "@echojs/hyperdom";
import { createField, createFieldArray, createFormFor, wireFormModel } from "@echojs/form";
import type { WireFormModel } from "@echojs/form";
import { z } from "zod";

const RoleEnum = z.enum(["dev", "pm", "qa"]);

const CatalogSchema = z.object({
  catalogTitle: z.string().min(2),
  departments: z
    .array(
      z.object({
        title: z.string().min(1),
        employees: z
          .array(
            z.object({
              name: z.string().min(1),
              role: RoleEnum,
              comment: z.string().max(120),
              tickets: z.array(
                z.object({
                  code: z.string().min(1),
                  eta: z.number().min(0).max(365),
                }),
              ),
            }),
          )
          .min(1),
      }),
    )
    .min(1),
});

type CatalogValue = z.infer<typeof CatalogSchema>;

export type TicketRow = {
  code: ReturnType<typeof createField<string>>;
  eta: ReturnType<typeof createField<number>>;
};

export type EmployeeRow = {
  name: ReturnType<typeof createField<string>>;
  role: ReturnType<typeof createField<z.infer<typeof RoleEnum>>>;
  comment: ReturnType<typeof createField<string>>;
  tickets: ReturnType<typeof createFieldArray<TicketRow>>;
};

export type DeptRow = {
  title: ReturnType<typeof createField<string>>;
  employees: ReturnType<typeof createFieldArray<EmployeeRow>>;
};

type CatalogFields = {
  catalogTitle: ReturnType<typeof createField<string>>;
  departments: ReturnType<typeof createFieldArray<DeptRow>>;
};

const newTicketRow = (): TicketRow => ({
  code: createField(""),
  eta: createField(7),
});

const newEmployeeRow = (): EmployeeRow => ({
  name: createField(""),
  role: createField<z.infer<typeof RoleEnum>>("dev"),
  comment: createField(""),
  tickets: createFieldArray([newTicketRow()]),
});

const newDeptRow = (): DeptRow => ({
  title: createField(""),
  employees: createFieldArray([newEmployeeRow()]),
});

const catalogFields: CatalogFields = {
  catalogTitle: createField("Каталог команд"),
  departments: createFieldArray([
    {
      title: createField("Платформа"),
      employees: createFieldArray([
        {
          name: createField("Аня"),
          role: createField<z.infer<typeof RoleEnum>>("dev"),
          comment: createField("Ведёт формы и Hyperdom."),
          tickets: createFieldArray([
            { code: createField("ECHO-101"), eta: createField(14) },
            { code: createField("ECHO-102"), eta: createField(30) },
          ]),
        },
      ]),
    },
  ]),
};

const makeCatalogForm = createFormFor<CatalogValue>();

const catalogForm = makeCatalogForm<CatalogFields>(catalogFields, {
  validationSchema: CatalogSchema,
  validationOn: "onChange",
  defaultAsyncValues: async () => ({
    catalogTitle: "Каталог команд (после «async»)",
  }),
  fieldArrayFactories: {
    departments: newDeptRow,
  },
  actions: (form) => ({
    appendDept: (): void => {
      form.fields.departments.append(newDeptRow());
    },
    removeDept: (index: number): void => {
      form.fields.departments.removeAt(index);
    },
    appendEmployee: (deptIndex: number): void => {
      form.fields.departments.$items.value()[deptIndex].employees.append(newEmployeeRow());
    },
    removeEmployee: (deptIndex: number, employeeIndex: number): void => {
      form.fields.departments.$items.value()[deptIndex].employees.removeAt(employeeIndex);
    },
    appendTicket: (deptIndex: number, employeeIndex: number): void => {
      form.fields.departments.$items
        .value()
        [deptIndex].employees.$items.value()[employeeIndex].tickets.append(newTicketRow());
    },
    removeTicket: (deptIndex: number, employeeIndex: number, ticketIndex: number): void => {
      form.fields.departments.$items
        .value()
        [deptIndex].employees.$items.value()[employeeIndex].tickets.removeAt(ticketIndex);
    },
  }),
});

export const ROLE_OPTIONS: { value: z.infer<typeof RoleEnum>; label: string }[] = [
  { value: "dev", label: "Разработка" },
  { value: "pm", label: "Продакт" },
  { value: "qa", label: "Тестирование" },
];

export interface Example4NestedVM {
  ui: WireFormModel<CatalogFields>;
  form: typeof catalogForm;
  $schemaErrors: typeof catalogForm.$schemaErrors;
  submitCatalog: () => Promise<void>;
  actions: typeof catalogForm.actions;
}

export const $nestedModel = createModel((): Example4NestedVM => {
  const submitCatalog = async (): Promise<void> => {
    const res = await catalogForm.submit((value) => {
      console.log("catalog ok", value);
      catalogForm.$schemaErrors.set(undefined);
    });
    if (!res.ok) {
      console.log("catalog blocked", res.errors);
      const flat = (res.errors as { $schema?: Record<string, string[]> }).$schema;
      catalogForm.$schemaErrors.set(flat);
    }
  };

  effect(() => {
    console.log("form", catalogForm.fields);
    console.log("schemaErrors", catalogForm.$schemaErrors.value());
  });

  return {
    ui: wireFormModel(catalogForm.fields),
    form: catalogForm,
    $schemaErrors: catalogForm.$schemaErrors,
    submitCatalog,
    actions: catalogForm.actions,
  };
});
