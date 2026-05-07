import type { FieldArray, NestedFieldArrayOps } from "../types";

/**
 * Конфиг вложенных `createFieldArray`: на каждом уровне — фабрика строки и при необходимости дочерние массивы по ключам строки.
 */
export type FieldArrayBranchConfig<Row extends Record<string, unknown>> = {
  newRow: () => Row;
  children?: Partial<{
    [K in keyof Row]: Row[K] extends FieldArray<infer Child>
      ? Child extends Record<string, unknown>
        ? FieldArrayBranchConfig<Child>
        : FieldArrayBranchConfig<Record<string, never>>
      : never;
  }>;
};

const buildOps = <Row extends Record<string, unknown>>(
  fieldArray: FieldArray<Row>,
  cfg: FieldArrayBranchConfig<Row>,
): NestedFieldArrayOps<Row> => {
  const removeAt = (index: number): void => {
    fieldArray.removeAt(index);
  };

  const children = cfg.children;
  const hasChildren = !!children && Object.keys(children).length > 0;

  const at = hasChildren
    ? (index: number): Record<string, NestedFieldArrayOps> | undefined => {
        const row = fieldArray.$items.value()[index] as Row | undefined;
        if (!row) return undefined;
        const slice: Record<string, NestedFieldArrayOps> = {};
        for (const key of Object.keys(children!)) {
          const childCfg = children![key as keyof Row];
          if (!childCfg) continue;
          const childArr = row[key as keyof Row] as FieldArray<Record<string, unknown>>;
          slice[key] = buildOps(childArr, childCfg as FieldArrayBranchConfig<Record<string, unknown>>);
        }
        return slice;
      }
    : (_index: number): undefined => undefined;

  return {
    append: (item?: Row) => {
      fieldArray.append((item ?? cfg.newRow()) as Row);
    },
    removeAt,
    remove: removeAt,
    at,
  };
};

/**
 * Строит цепочку операций над вложенными `FieldArray` по конфигу (фабрики строк + дерево дочерних ключей).
 *
 * @example
 * ```ts
 * const d = form.nestedArrays!.departments;
 * d.append();
 * d.at(0)?.employees.append();
 * d.at(0)?.employees.at(0)?.tickets.removeAt(1);
 * ```
 */
export const defineNestedFieldArrayOps = <Row extends Record<string, unknown>>(
  fieldArray: FieldArray<Row>,
  cfg: FieldArrayBranchConfig<Row>,
): NestedFieldArrayOps<Row> => buildOps(fieldArray, cfg);
