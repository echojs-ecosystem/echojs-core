export type AsyncOptions = {
  /** When aborted, `all` / `race` / `any` reject; `mapSerial` / `serial` stop between steps. */
  signal?: AbortSignal
}
