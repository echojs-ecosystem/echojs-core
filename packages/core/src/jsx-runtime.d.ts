import { JSX } from "./jsx-types.js";
import type { JSXElement, JSXProps, JSXComponent } from "./types.js";

export { JSX };

declare global {
  namespace JSX {
    // Connect TS JSX namespace to EchoJS JSX types
    export import Element = JSX.Element;
    export import IntrinsicElements = JSX.IntrinsicElements;
  }
}

export declare const jsx: <P extends JSXProps>(
  type: string | JSXComponent<P>,
  props: P,
  key?: string | number,
) => JSXElement;

export declare const jsxs: typeof jsx;
export declare const jsxDEV: typeof jsx;
export declare const Fragment: (props: { children?: JSXElement }) => JSXElement;

export {};
