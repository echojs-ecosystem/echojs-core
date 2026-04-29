import type { ReadonlySignal, Signal } from "@echojs-ecosystem/reactivity";

export type JSXElement = Node | Node[] | string | number | null | undefined | JSXElement[];

export type Signalish<T> = T | Signal<T> | ReadonlySignal<T>;

export type JSXProps = {
  [key: string]: unknown;
  children?: JSXElement;
};

export type JSXComponent<P = object> = (props: P) => JSXElement;

export interface ComponentVM {
  [key: string]: unknown;
}

export type ViewModelFn<VM extends ComponentVM> = () => VM;

export type ViewFn<VM extends ComponentVM> = (vm: VM) => JSXElement;

export type EventHandler = (event: Event) => void;

export type EventModifiers = {
  prevent?: boolean;
  stop?: boolean;
  capture?: boolean;
  once?: boolean;
  self?: boolean;
};

export interface DirectiveProps {
  if?: Signalish<boolean>;
  else?: boolean;
  "else-if"?: Signalish<boolean>;
  show?: Signalish<boolean>;
}

export type HTMLAttributeValue = string | number | boolean | null | undefined;

export interface ReactiveAttributeConfig {
  name: string;
  value: Signalish<HTMLAttributeValue>;
  isReactive: boolean;
}

export interface MountResult {
  node: Node;
  dispose: () => void;
}
