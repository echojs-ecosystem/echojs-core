/**
 * Returns 's' if the amount is not 1.
 *
 * @example
 * `apple${s(1)}` // 'apple'
 * `apple${s(2)}` // 'apples'
 */
export const s = (amount: number) => (amount === 1 ? "" : "s");
