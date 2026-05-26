import { effect } from "@echojs-ecosystem/reactivity";
import { createModel } from "@echojs/hyperdom";
import {
  arrayGenerator,
  createField,
  createFieldArray,
  createForm,
  wireFormModel,
} from "@echojs/form";
import type { WireFormModel } from "@echojs/form";
import { z } from "zod";

const RoleEnum = z.enum(["dev", "pm", "qa"]);

const catalogSchema = z.object({
  catalogTitle: z.string().min(2),
  departments: z
    .array(
      z.object({
        title: z.string().min(1),
        employees: z
          .array(
            z.object({
              name: z.string().min(1), // обязательное
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
})
  // пример async-валидации схемы (Standard Schema умеет async validate)
  .refine(
    async (v) => {
      await Promise.resolve();
      return !String(v.catalogTitle).includes("!");
    },
    { path: ["catalogTitle"], message: "Заголовок не должен содержать '!'" },
  );

type CatalogValue = z.infer<typeof catalogSchema>;

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

export type CatalogArrayActions = {
  createTicket: () => TicketRow;
  createEmployee: () => EmployeeRow;
  createDepartment: () => DeptRow;
  appendDept: ReturnType<typeof arrayGenerator.append>;
  removeDept: ReturnType<typeof arrayGenerator.remove>;
  appendEmployee: ReturnType<typeof arrayGenerator.append>;
  removeEmployee: ReturnType<typeof arrayGenerator.remove>;
  appendTicket: ReturnType<typeof arrayGenerator.append>;
  removeTicket: ReturnType<typeof arrayGenerator.remove>;
};

const catalogForm = createForm<CatalogValue, CatalogFields, CatalogArrayActions>({
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
  ])},
  {
    name: "CatalogForm",
    validationSchema: catalogSchema,
    validationOn: "all",
    defaultAsyncValues: async () => ({
      catalogTitle: "Каталог команд (после «async»)",
    }),
    validateAsync: async () => {
      // пример async кастомной валидации (вдобавок к schema)
      await Promise.resolve();
      return {};
    },
    arrayActions: (form) => {
    const createTicket = (): TicketRow => ({ code: createField(""), eta: createField(7) });
    const createEmployee = (): EmployeeRow => ({
      name: createField(""),
      role: createField<z.infer<typeof RoleEnum>>("dev"),
      comment: createField(""),
      tickets: createFieldArray([createTicket()]),
    });
    const createDepartment = (): DeptRow => ({
      title: createField(""),
      employees: createFieldArray([createEmployee()]),
    });

      return {
        createTicket,
        createEmployee,
        createDepartment,
        appendDept: arrayGenerator.append(form, createDepartment, "departments"),
        removeDept: arrayGenerator.remove(form, "departments"),
        appendEmployee: arrayGenerator.append(form, createEmployee, "departments.employees"),
        removeEmployee: arrayGenerator.remove(form, "departments.employees"),
        appendTicket: arrayGenerator.append(form, createTicket, "departments.employees.tickets"),
        removeTicket: arrayGenerator.remove(form, "departments.employees.tickets"),
      };
    },
  },
);

export const ROLE_OPTIONS: { value: z.infer<typeof RoleEnum>; label: string }[] = [
  { value: "dev", label: "Разработка" },
  { value: "pm", label: "Продакт" },
  { value: "qa", label: "Тестирование" },
];

export interface NestedCatalogVM {
  ui: WireFormModel<CatalogFields>;
  form: typeof catalogForm;
  $schemaErrors: typeof catalogForm.$schemaErrors;
  submitCatalog: () => Promise<void>;
  arrayActions: CatalogArrayActions;
}

export const $nestedCatalogModel = createModel((): NestedCatalogVM => {
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
    arrayActions: catalogForm.arrayActions,
  };
}, "NestedCatalogModel");
