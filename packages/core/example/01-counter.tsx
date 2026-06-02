/**
 * Example 1: Basic Counter
 * Демонстрирует новый API с createModel и createView
 */

import { createModel, createView, mount } from "@echojs-ecosystem/core";

// Модель - здесь объявляем все signals, computed и методы
const counterModel = createModel((ctx) => {
  const count = ctx.signal(0);
  const double = ctx.computed(() => count.value() * 2);
  const isEven = ctx.computed(() => count.value() % 2 === 0);

  return {
    count,
    double,
    isEven,
    increment: () => count.update((n) => n + 1),
    decrement: () => count.update((n) => n - 1),
    reset: () => count.set(0),
  };
});

// View - здесь только JSX разметка
const counterView = createView((vm) => (
  <div class="counter">
    <h2>Counter Example (New API)</h2>
    <div class="display">
      <span class={vm.isEven.value() ? "even" : "odd"}>{vm.count.value()}</span>
      <small> (Double: {vm.double.value()})</small>
    </div>
    <div class="buttons">
      <button onClick={vm.decrement}>-</button>
      <button onClick={vm.reset}>Reset</button>
      <button onClick={vm.increment}>+</button>
    </div>
  </div>
));

// Компонент - комбинация model и view
const Counter = (props: { initial?: number } = {}) => {
  const vm = counterModel();

  // Если передан initial, устанавливаем начальное значение
  if (props.initial !== undefined) {
    vm.count.set(props.initial);
  }

  return counterView(vm);
};

// Mount to DOM
const app = document.getElementById("app");
if (app) {
  mount(app, <Counter initial={5} />);
}
