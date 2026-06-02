import { bindField } from "@echojs/form";
import {
  List,
  button,
  code,
  createView,
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
  type NestedCatalogVM,
  type TicketRow,
} from "@features/forms-nested-catalog/model/nested-catalog.model.js";

type IndexFn = () => number;

type FlatErrors = Readonly<Record<string, readonly string[]>>;

type SchemaErrorsSignal = NestedCatalogVM["$schemaErrors"];

const invalidClass = (
  $schemaErrors: SchemaErrorsSignal,
  path: string,
): (() => string) => {
  return () =>
    cx("control", {
      "is-invalid": Boolean($schemaErrors.value()?.[path]?.length),
    });
};

const FieldError = createView((props: { $schemaErrors: SchemaErrorsSignal; path: string }): Child => {
  return () => {
    const msgs = props.$schemaErrors.value()?.[props.path];
    if (!msgs || msgs.length === 0) return null;
    return div(
      { class: "field-error" },
      msgs.map((m) => div({ class: "field-error__line" }, m)),
    );
  };
}, "FieldError");

const SchemaErrorBlock = createView((flat: FlatErrors | undefined): Child | null => {
  if (!flat || Object.keys(flat).length === 0) return null;
  const lines = Object.entries(flat).map(([path, msgs]) =>
    div({ class: "error" }, `${path}: ${msgs.join(", ")}`),
  );
  return div({ class: "error-block" }, lines);
}, "SchemaErrorBlock");

const NestedCatalogIntro = createView((): Child =>
  div(
    { class: "nested-catalog__intro" },
    h2(null, "Вложенные массивы + select/textarea/number/range"),
    p([
      "Утилита ",
      code("bindField(field, { variant })"),
      " объединяет пропсы для разных контролов. Вложенность: ",
      code("departments[] → employees[] → tickets[]"),
      ".",
    ]),
    hr(),
  ),
  "NestedCatalogIntro",
);

const CatalogTitleField = createView(
  (props: {
    catalogTitle: NestedCatalogVM["ui"]["catalogTitle"];
    $schemaErrors: SchemaErrorsSignal;
  }): Child =>
    label(
      { class: "field" },
      div("Название каталога"),
      input({
        class: invalidClass(props.$schemaErrors, "catalogTitle"),
        ...bindField(props.catalogTitle, { variant: "text", controlledValue: true }),
      }),
      FieldError({ $schemaErrors: props.$schemaErrors, path: "catalogTitle" }),
    ),
  "CatalogTitleField",
);

const CatalogToolbar = createView(
  (props: { appendDept: () => void; submitCatalog: () => Promise<void> }): Child =>
    div(
      { class: "example4__toolbar" },
      button({ type: "button", onClick: () => props.appendDept() }, "+ отдел"),
      button(
        { type: "button", class: "primary", onClick: () => void props.submitCatalog() },
        "submit (консоль)",
      ),
    ),
  "CatalogToolbar",
);

const ReactiveSchemaErrors = createView(($schemaErrors: SchemaErrorsSignal): Child => {
  return (): Child => SchemaErrorBlock($schemaErrors.value());
}, "ReactiveSchemaErrors");

const TicketRowView = createView(
  (props: {
    ticket: TicketRow;
    deptIndex: IndexFn;
    empIndex: IndexFn;
    ticketIndex: IndexFn;
    removeTicket: (deptIndex: number, employeeIndex: number, ticketIndex: number) => void;
    $schemaErrors: SchemaErrorsSignal;
  }): Child => {
    const ticketPath = (field: "code" | "eta") =>
      `departments.${props.deptIndex()}.employees.${props.empIndex()}.tickets.${props.ticketIndex()}.${field}`;

    return div(
      { class: "ticket-row" },
      label(
        { class: "field" },
        span("Код"),
        input({
          class: invalidClass(props.$schemaErrors, ticketPath("code")),
          ...bindField(props.ticket.code, { variant: "text", controlledValue: true }),
        }),
        FieldError({ $schemaErrors: props.$schemaErrors, path: ticketPath("code") }),
      ),
      label(
        { class: "field field--compact" },
        span("ETA (дни)"),
        input({
          class: invalidClass(props.$schemaErrors, ticketPath("eta")),
          ...bindField(props.ticket.eta, { variant: "number", controlledValue: true }),
        }),
        FieldError({ $schemaErrors: props.$schemaErrors, path: ticketPath("eta") }),
      ),
      label(
        { class: "field field--range" },
        span("ETA (ползунок)"),
        input({
          class: invalidClass(props.$schemaErrors, ticketPath("eta")),
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
  },
  "TicketRowView",
);

const EmployeeCard = createView(
  (props: {
    emp: EmployeeRow;
    deptIndex: IndexFn;
    empIndex: IndexFn;
    appendTicket: (deptIndex: number, employeeIndex: number) => void;
    removeEmployee: (deptIndex: number, employeeIndex: number) => void;
    removeTicket: (deptIndex: number, employeeIndex: number, ticketIndex: number) => void;
    $schemaErrors: SchemaErrorsSignal;
  }): Child => {
    const empPath = (field: "name" | "role" | "comment") =>
      `departments.${props.deptIndex()}.employees.${props.empIndex()}.${field}`;

    return div(
      { class: "card card--employee" },
      div([
        span({ class: "card__title" }, "Сотрудник"),
        span(` ${props.empIndex() + 1}`),
      ]),
      label(
        { class: "field" },
        "Имя",
        input({
          class: invalidClass(props.$schemaErrors, empPath("name")),
          ...bindField(props.emp.name, { variant: "text", controlledValue: true }),
        }),
        FieldError({ $schemaErrors: props.$schemaErrors, path: empPath("name") }),
      ),
      label(
        { class: "field" },
        span("Роль"),
        select(
          {
            class: invalidClass(props.$schemaErrors, empPath("role")),
            ...bindField(props.emp.role, { variant: "select", controlledValue: true }),
          },
          ...ROLE_OPTIONS.map((o) => option({ value: o.value }, o.label)),
        ),
        FieldError({ $schemaErrors: props.$schemaErrors, path: empPath("role") }),
      ),
      label(
        { class: "field" },
        span("Комментарий"),
        textarea({
          rows: 3,
          class: invalidClass(props.$schemaErrors, empPath("comment")),
          ...bindField(props.emp.comment, { variant: "textarea", controlledValue: true }),
        }),
        FieldError({ $schemaErrors: props.$schemaErrors, path: empPath("comment") }),
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
  },
  "EmployeeCard",
);

const DepartmentCard = createView(
  (props: {
    dept: DeptRow;
    deptIndex: IndexFn;
    appendEmployee: (deptIndex: number) => void;
    removeDept: (deptIndex: number) => void;
    appendTicket: (deptIndex: number, employeeIndex: number) => void;
    removeEmployee: (deptIndex: number, employeeIndex: number) => void;
    removeTicket: (deptIndex: number, employeeIndex: number, ticketIndex: number) => void;
    $schemaErrors: SchemaErrorsSignal;
  }): Child => {
    const titlePath = `departments.${props.deptIndex()}.title`;

    return div(
      { class: "dept-card" },
      h3(["Отдел #", span(String(props.deptIndex() + 1))]),
      label(
        { class: "field" },
        span("Заголовок отдела"),
        input({
          class: invalidClass(props.$schemaErrors, titlePath),
          ...bindField(props.dept.title, { variant: "text", controlledValue: true }),
        }),
        FieldError({ $schemaErrors: props.$schemaErrors, path: titlePath }),
      ),
      div(
        { class: "row row--actions" },
        button(
          {
            type: "button",
            class: "secondary",
            onClick: () => props.appendEmployee(props.deptIndex()),
          },
          "+ сотрудник",
        ),
        button(
          { type: "button", class: "danger", onClick: () => props.removeDept(props.deptIndex()) },
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
  },
  "DepartmentCard",
);

const DepartmentsSection = createView(
  (props: {
    departments: NestedCatalogVM["form"]["fields"]["departments"]["$items"];
    arrayActions: NestedCatalogVM["arrayActions"];
    $schemaErrors: SchemaErrorsSignal;
  }): Child =>
    List(props.departments, (dept, deptIndex) =>
      DepartmentCard({
        dept,
        deptIndex,
        appendEmployee: props.arrayActions.appendEmployee,
        removeDept: props.arrayActions.removeDept,
        appendTicket: props.arrayActions.appendTicket,
        removeEmployee: props.arrayActions.removeEmployee,
        removeTicket: props.arrayActions.removeTicket,
        $schemaErrors: props.$schemaErrors,
      }),
    ),
  "DepartmentsSection",
);

export const NestedCatalogView = createView((vm: NestedCatalogVM): Child =>
  div(
    { class: "nested-catalog" },
    NestedCatalogIntro(),
    CatalogTitleField({ catalogTitle: vm.ui.catalogTitle, $schemaErrors: vm.$schemaErrors }),
    CatalogToolbar({
      appendDept: vm.arrayActions.appendDept,
      submitCatalog: vm.submitCatalog,
    }),
    ReactiveSchemaErrors(vm.$schemaErrors),
    hr(),
    DepartmentsSection({
      departments: vm.form.fields.departments.$items,
      arrayActions: vm.arrayActions,
      $schemaErrors: vm.$schemaErrors,
    }),
  ),
  "NestedCatalogView",
);
