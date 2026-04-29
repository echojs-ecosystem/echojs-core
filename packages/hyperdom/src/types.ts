export type Child =
  | string
  | number
  | boolean
  | null
  | undefined
  | Node
  | Child[]
  | (() => Child);

export type Props = Record<string, any>;

export type Component<P = any> = (props: P & { children?: Child }) => Child;

