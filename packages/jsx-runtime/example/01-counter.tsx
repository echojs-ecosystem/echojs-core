/**
 * Example 1: Basic Counter
 * Demonstrates signals, events, and fine-grained reactivity
 */

import { createComponent, signal, computed, mount } from "@echojs-ecosystem/jsx-runtime";

const Counter = createComponent(
  // ViewModel
  () => {
    const count = signal(0);
    const double = computed(() => count.value() * 2);
    const isEven = computed(() => count.value() % 2 === 0);

    return {
      count,
      double,
      isEven,
      increment: () => count.update((n) => n + 1),
      decrement: () => count.update((n) => n - 1),
      reset: () => count.set(0),
    };
  },
  // View
  (vm) => (
    <div class="counter">
      <h2>Counter Example</h2>
      <div class="display">
        <span class={vm.isEven ? "even" : "odd"}>{vm.count}</span>
        <small> (Double: {vm.double})</small>
      </div>
      <div class="buttons">
        <button on:click={vm.decrement}>-</button>
        <button on:click={vm.reset}>Reset</button>
        <button on:click={vm.increment}>+</button>
      </div>
    </div>
  ),
);

// Mount to DOM
const app = document.getElementById("app");
if (app) {
  mount(app, <Counter />);
}
