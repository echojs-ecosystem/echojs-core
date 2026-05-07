import { bindField } from "@echojs/form";
import {
  List,
  button,
  code,
  cx,
  div,
  h2,
  h3,
  hr,
  input,
  label,
  option,
  p,
  select,
  span,
  textarea,
} from "@echojs/hyperdom";
import type { Child } from "@echojs/hyperdom";
import type { Signal } from "@echojs-ecosystem/reactivity";
import {
  ROLE_OPTIONS,
  type DeptRow,
  type EmployeeRow,
  type Example4NestedVM,
  type TicketRow,
} from "./example4-nested.model";

type IndexFn = () => number;

type FlatErrors = Readonly<Record<string, readonly string[]>>;

const schemaErrorBlock = (
  flat: FlatErrors | undefined,
): Child | null => {
  if (!flat || Object.keys(flat).length === 0) return null;
  const lines = Object.entries(flat).map(([path, msgs]) =>
    div({ class: "error" }, `${path}: ${msgs.join(", ")}`),
  );
  return div({ class: "error-block" }, lines);
};

const errorForPath = (
  $schemaErrors: Signal<Record<string, string[]> | undefined>,
  path: string,
): (() => Child) => {
  return () => {
    const msgs = $schemaErrors.value()?.[path];
    if (!msgs || msgs.length === 0) return null;
    return div(
      { class: "field-error" },
      msgs.map((m) => div({ class: "field-error__line" }, m)),
    );
  };
};

const invalidClass = (
  $schemaErrors: Signal<Record<string, string[]> | undefined>,
  path: string,
): (() => string) => {
  return () =>
    cx("control", {
      "is-invalid": Boolean($schemaErrors.value()?.[path]?.length),
    });
};

const Example4NestedIntro = (): Child =>
  div(
    { class: "example4__intro" },
    h2("Example 4 — вложенные массивы + select/textarea/number/range"),
    p([
      "Утилита ",
      code("bindField(field, { variant })"),
      " объединяет пропсы для разных контролов. Вложенность: ",
      code("departments[] → employees[] → tickets[]"),
      ".",
    ]),
    hr(),
  );

const CatalogTitleField = (props: {
  catalogTitle: Example4NestedVM["ui"]["catalogTitle"];
  $schemaErrors: Example4NestedVM["$schemaErrors"];
}): Child =>
  label(
    { class: "field" },
    div("Название каталога"),
    input({
      class: invalidClass(props.$schemaErrors, "catalogTitle"),
      ...bindField(props.catalogTitle, { variant: "text", controlledValue: true }),
    }),
    errorForPath(props.$schemaErrors, "catalogTitle"),
  );

const CatalogToolbar = (props: {
  appendDept: () => void;
  submitCatalog: () => Promise<void>;
}): Child =>
  div(
    { class: "example4__toolbar" },
    button({ type: "button", onClick: () => props.appendDept() }, "+ отдел"),
    button(
      { type: "button", class: "primary", onClick: () => void props.submitCatalog() },
      "submit (консоль)",
    ),
  );

const ReactiveSchemaErrors = ($schemaErrors: Example4NestedVM["$schemaErrors"]): (() => Child) => {
  return (): Child => schemaErrorBlock($schemaErrors.value());
};

const TicketRowView = (props: {
  ticket: TicketRow;
  deptIndex: IndexFn;
  empIndex: IndexFn;
  ticketIndex: IndexFn;
  removeTicket: (deptIndex: number, employeeIndex: number, ticketIndex: number) => void;
  $schemaErrors: Example4NestedVM["$schemaErrors"];
}): Child =>
  div(
    {
      class: "ticket-row",
    },
    label(
      { class: "field" },
      span("Код"),
      input({
        class: invalidClass(
          props.$schemaErrors,
          `departments.${props.deptIndex()}.employees.${props.empIndex()}.tickets.${props.ticketIndex()}.code`,
        ),
        ...bindField(props.ticket.code, { variant: "text", controlledValue: true }),
      }),
      errorForPath(
        props.$schemaErrors,
        `departments.${props.deptIndex()}.employees.${props.empIndex()}.tickets.${props.ticketIndex()}.code`,
      ),
    ),

    label(
      { class: "field field--compact" },
      span("ETA (дни)"),
      input({
        class: invalidClass(
          props.$schemaErrors,
          `departments.${props.deptIndex()}.employees.${props.empIndex()}.tickets.${props.ticketIndex()}.eta`,
        ),
        ...bindField(props.ticket.eta, {
          variant: "number",
          controlledValue: true,
        }),
      }),
      errorForPath(
        props.$schemaErrors,
        `departments.${props.deptIndex()}.employees.${props.empIndex()}.tickets.${props.ticketIndex()}.eta`,
      ),
    ),

    label(
      { class: "field field--range" },
      span("ETA (ползунок)"),
      input({
        class: invalidClass(
          props.$schemaErrors,
          `departments.${props.deptIndex()}.employees.${props.empIndex()}.tickets.${props.ticketIndex()}.eta`,
        ),
        ...bindField(props.ticket.eta, {
          variant: "range",
          min: 0,
          max: 120,
          step: 1,
          controlledValue: true,
        }),
      }),
    ),

    button(
      {
        type: "button",
        class: "danger",
        onClick: () =>
          props.removeTicket(props.deptIndex(), props.empIndex(), props.ticketIndex()),
      },
      "✕",
    ),
  );

const EmployeeCard = (props: {
  emp: EmployeeRow;
  deptIndex: IndexFn;
  empIndex: IndexFn;
  appendTicket: (deptIndex: number, employeeIndex: number) => void;
  removeEmployee: (deptIndex: number, employeeIndex: number) => void;
  removeTicket: (deptIndex: number, employeeIndex: number, ticketIndex: number) => void;
  $schemaErrors: Example4NestedVM["$schemaErrors"];
}): Child =>
  div(
    {
      class: "card card--employee",
    },
    div([
      span({ class: "card__title" }, "Сотрудник"),
      span(` ${props.empIndex() + 1}`),
    ]),

    label(
      { class: "field" },
      "Имя",
      input({
        class: invalidClass(
          props.$schemaErrors,
          `departments.${props.deptIndex()}.employees.${props.empIndex()}.name`,
        ),
        ...bindField(props.emp.name, { variant: "text", controlledValue: true }),
      }),
      errorForPath(
        props.$schemaErrors,
        `departments.${props.deptIndex()}.employees.${props.empIndex()}.name`,
      ),
    ),

    label(
      { class: "field" },
      span("Роль"),
      select(
        {
          class: invalidClass(
            props.$schemaErrors,
            `departments.${props.deptIndex()}.employees.${props.empIndex()}.role`,
          ),
          ...bindField(props.emp.role, { variant: "select", controlledValue: true }),
        },
        ...ROLE_OPTIONS.map((o) => option({ value: o.value }, o.label)),
      ),
      errorForPath(
        props.$schemaErrors,
        `departments.${props.deptIndex()}.employees.${props.empIndex()}.role`,
      ),
    ),

    label(
      { class: "field" },
      span("Комментарий"),
      textarea({
        rows: 3,
        class: invalidClass(
          props.$schemaErrors,
          `departments.${props.deptIndex()}.employees.${props.empIndex()}.comment`,
        ),
        ...bindField(props.emp.comment, { variant: "textarea", controlledValue: true }),
      }),
      errorForPath(
        props.$schemaErrors,
        `departments.${props.deptIndex()}.employees.${props.empIndex()}.comment`,
      ),
    ),

    div(
      { class: "row row--actions" },
      button(
        {
          type: "button",
          class: "secondary",
          onClick: () => props.appendTicket(props.deptIndex(), props.empIndex()),
        },
        "+ тикет",
      ),
      button(
        {
          type: "button",
          class: "danger",
          onClick: () => props.removeEmployee(props.deptIndex(), props.empIndex()),
        },
        "удалить сотрудника",
      ),
    ),

    List(props.emp.tickets.$items, (ticket, ticketIndex) =>
      TicketRowView({
        ticket,
        deptIndex: props.deptIndex,
        empIndex: props.empIndex,
        ticketIndex,
        removeTicket: props.removeTicket,
        $schemaErrors: props.$schemaErrors,
      }),
    ),
  );

const DepartmentCard = (props: {
  dept: DeptRow;
  deptIndex: IndexFn;
  appendEmployee: (deptIndex: number) => void;
  removeDept: (deptIndex: number) => void;
  appendTicket: (deptIndex: number, employeeIndex: number) => void;
  removeEmployee: (deptIndex: number, employeeIndex: number) => void;
  removeTicket: (deptIndex: number, employeeIndex: number, ticketIndex: number) => void;
  $schemaErrors: Example4NestedVM["$schemaErrors"];
}): Child =>
  div(
    {
      class: "dept-card",
    },
    h3(["Отдел #", span(String(props.deptIndex() + 1))]),
    label(
      { class: "field" },
      span("Заголовок отдела"),
      input({
        class: invalidClass(props.$schemaErrors, `departments.${props.deptIndex()}.title`),
        ...bindField(props.dept.title, { variant: "text", controlledValue: true }),
      }),
      errorForPath(props.$schemaErrors, `departments.${props.deptIndex()}.title`),
    ),

    div(
      { class: "row row--actions" },
      button(
        {
          type: "button",
          class: "secondary",
          "on:click": () => props.appendEmployee(props.deptIndex()),
        },
        "+ сотрудник",
      ),
      button(
        { type: "button", class: "danger", "on:click": () => props.removeDept(props.deptIndex()) },
        "удалить отдел",
      ),
    ),

    List(props.dept.employees.$items, (emp, empIndex) =>
      EmployeeCard({
        emp,
        deptIndex: props.deptIndex,
        empIndex,
        appendTicket: props.appendTicket,
        removeEmployee: props.removeEmployee,
        removeTicket: props.removeTicket,
        $schemaErrors: props.$schemaErrors,
      }),
    ),
  );

const DepartmentsSection = (vm: Example4NestedVM): Child =>
  List(vm.form.fields.departments.$items, (dept, deptIndex) =>
    DepartmentCard({
      dept,
      deptIndex,
      appendEmployee: vm.actions.appendEmployee,
      removeDept: vm.actions.removeDept,
      appendTicket: vm.actions.appendTicket,
      removeEmployee: vm.actions.removeEmployee,
      removeTicket: vm.actions.removeTicket,
      $schemaErrors: vm.$schemaErrors,
    }),
  );

export const Example4NestedView = (vm: Example4NestedVM) =>
  div(
    { class: "example4" },
    Example4NestedIntro(),
    CatalogTitleField({ catalogTitle: vm.ui.catalogTitle, $schemaErrors: vm.$schemaErrors }),
    CatalogToolbar({ appendDept: vm.actions.appendDept, submitCatalog: vm.submitCatalog }),
    ReactiveSchemaErrors(vm.$schemaErrors),
    hr(),
    DepartmentsSection(vm),
  );
