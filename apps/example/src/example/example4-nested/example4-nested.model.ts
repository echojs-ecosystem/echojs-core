import { signal } from "@echojs-ecosystem/reactivity";
import type { Signal } from "@echojs-ecosystem/reactivity";
import { createModel } from "@echojs/hyperdom";
import { createField, createFieldArray, createForm, wireFormModel } from "@echojs/form";
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

type TicketRow = {
  code: ReturnType<typeof createField<string>>;
  eta: ReturnType<typeof createField<number>>;
};

type EmployeeRow = {
  name: ReturnType<typeof createField<string>>;
  role: ReturnType<typeof createField<z.infer<typeof RoleEnum>>>;
  comment: ReturnType<typeof createField<string>>;
  tickets: ReturnType<typeof createFieldArray<TicketRow>>;
};

type DeptRow = {
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

const catalogForm = createForm<CatalogValue, CatalogFields>(
  {
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
  },
  {
    validationSchema: CatalogSchema,
    defaultAsyncValues: async () => ({
      catalogTitle: "Каталог команд (после «async»)",
    }),
    fieldArrayFactories: {
      departments: newDeptRow,
    },
    
  },
);

export const ROLE_OPTIONS: { value: z.infer<typeof RoleEnum>; label: string }[] = [
  { value: "dev", label: "Разработка" },
  { value: "pm", label: "Продакт" },
  { value: "qa", label: "Тестирование" },
];

export interface Example4NestedVM {
  ui: ReturnType<typeof wireFormModel<CatalogFields>>;
  form: typeof catalogForm;
  $schemaErrors: Signal<Record<string, string[]> | undefined>;
  submitCatalog: () => Promise<void>;
  appendDept: () => void;
  removeDept: (index: number) => void;
  appendEmployee: (deptIndex: number) => void;
  removeEmployee: (deptIndex: number, employeeIndex: number) => void;
  appendTicket: (deptIndex: number, employeeIndex: number) => void;
  removeTicket: (deptIndex: number, employeeIndex: number, ticketIndex: number) => void;
}

export const createExample4NestedModel = createModel((): Example4NestedVM => {
  const $schemaErrors = signal<Record<string, string[]> | undefined>(undefined);

  return {
    ui: wireFormModel(catalogForm.fields),
    form: catalogForm,
    $schemaErrors,
    submitCatalog: async () => {
      const res = await catalogForm.submit((value) => {
        console.log("catalog ok", value);
        $schemaErrors.set(undefined);
      });
      if (!res.ok) {
        console.log("catalog blocked", res.errors);
        const flat = (res.errors as { $schema?: Record<string, string[]> }).$schema;
        $schemaErrors.set(flat);
      }
    },
    appendDept: () => catalogForm.fields.departments.append(newDeptRow()),
    removeDept: (index) => catalogForm.fields.departments.removeAt(index),
    appendEmployee: (deptIndex) => {
      const dept = catalogForm.fields.departments.$items.value()[deptIndex];
      if (!dept) return;
      dept.employees.append(newEmployeeRow());
    },
    removeEmployee: (deptIndex, employeeIndex) => {
      const dept = catalogForm.fields.departments.$items.value()[deptIndex];
      if (!dept) return;
      dept.employees.removeAt(employeeIndex);
    },
    appendTicket: (deptIndex, employeeIndex) => {
      const dept = catalogForm.fields.departments.$items.value()[deptIndex];
      const emp = dept?.employees.$items.value()[employeeIndex];
      if (!emp) return;
      emp.tickets.append(newTicketRow());
    },
    removeTicket: (deptIndex, employeeIndex, ticketIndex) => {
      const dept = catalogForm.fields.departments.$items.value()[deptIndex];
      const emp = dept?.employees.$items.value()[employeeIndex];
      if (!emp) return;
      emp.tickets.removeAt(ticketIndex);
    },
  };
});
