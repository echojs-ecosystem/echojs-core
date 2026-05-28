import type { FieldContext } from "./field.types";

const stack: FieldContext[] = [];

export const getFieldContext = (): FieldContext | undefined => stack[stack.length - 1];

export const runWithFieldContext = <T>(value: FieldContext, fn: () => T): T => {
  stack.push(value);
  try {
    return fn();
  } finally {
    stack.pop();
  }
};

