import { createModel } from "@echojs/hyperdom";
import { createField, createFieldArray, createForm, wireFormModel } from "@echojs/form";
import { z } from "zod";

const RoleEnum = z.enum(["dev", "pm", "qa"]);

const CatalogSchema = z.object({
  catalogTitle: z.string().min(2),
  departments: z.array(
    z.object({
      title: z.string().min(1),
      employees: z.array(
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
      ).min(1),
    }),
  ).min(1),
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

const parseEta = (raw: string): number => {
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) ? n : 0;
};

const newTicketRow = (): TicketRow => ({
  code: createField("", {
    schema: z.string().min(1),
    validationMode: "onBlur",
  }),
  eta: createField(7, {
    schema: z.number().min(0).max(365),
    parseDOMValue: parseEta,
    validationMode: "onChange",
  }),
});

const newEmployeeRow = (): EmployeeRow => ({
  name: createField("", { schema: z.string().min(1), validationMode: "onBlur" }),
  role: createField<z.infer<typeof RoleEnum>>("dev", {
    schema: RoleEnum,
    validationMode: "onChange",
  }),
  comment: createField("", {
    schema: z.string().max(120),
    validationMode: "onBlur",
  }),
  tickets: createFieldArray([newTicketRow()]),
});

const newDeptRow = (): DeptRow => ({
  title: createField("", { schema: z.string().min(1), validationMode: "onBlur" }),
  employees: createFieldArray([newEmployeeRow()]),
});

const defaultCatalog: Partial<CatalogValue> = {
  catalogTitle: "Каталог команд",
  departments: [
    {
      title: "Платформа",
      employees: [
        {
          name: "Аня",
          role: "dev",
          comment: "Ведёт формы и Hyperdom.",
          tickets: [
            { code: "ECHO-101", eta: 14 },
            { code: "ECHO-102", eta: 30 },
          ],
        },
      ],
    },
  ],
};

/** Дерево полей из снимка данных (структура совпадает с `defaultValues` / Zod). */
const buildCatalogFields = (d: Partial<CatalogValue>): CatalogFields => ({
  catalogTitle: createField(d.catalogTitle ?? "", {
    schema: z.string().min(2),
    validationMode: "onBlur",
  }),
  departments: createFieldArray(
    (d.departments ?? []).map((dept) => ({
      title: createField(dept.title ?? "", {
        schema: z.string().min(1),
        validationMode: "onBlur",
      }),
      employees: createFieldArray(
        (dept.employees ?? []).map((emp) => ({
          name: createField(emp.name ?? "", {
            schema: z.string().min(1),
            validationMode: "onBlur",
          }),
          role: createField<z.infer<typeof RoleEnum>>(emp.role ?? "dev", {
            schema: RoleEnum,
            validationMode: "onChange",
          }),
          comment: createField(emp.comment ?? "", {
            schema: z.string().max(120),
            validationMode: "onBlur",
          }),
          tickets: createFieldArray(
            (emp.tickets ?? []).map((t) => ({
              code: createField(t.code ?? "", {
                schema: z.string().min(1),
                validationMode: "onBlur",
              }),
              eta: createField(t.eta ?? 0, {
                schema: z.number().min(0).max(365),
                parseDOMValue: parseEta,
                validationMode: "onChange",
              }),
            })),
          ),
        })),
      ),
    })),
  ),
});

const catalogForm = createForm<CatalogValue, CatalogFields>(
  buildCatalogFields(defaultCatalog),
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
  appendDept: () => void;
  removeDept: (index: number) => void;
  appendEmployee: (deptIndex: number) => void;
  removeEmployee: (deptIndex: number, employeeIndex: number) => void;
  appendTicket: (deptIndex: number, employeeIndex: number) => void;
  removeTicket: (deptIndex: number, employeeIndex: number, ticketIndex: number) => void;
}

export const createExample4NestedModel = createModel((): Example4NestedVM => ({
  ui: wireFormModel(catalogForm.fields),
  form: catalogForm,
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
}));
