import {
  createModel,
  createView,
  signal,
  computed,
  effect,
  type Signal,
  type ReadonlySignal,
  createComponent,
} from "@echojs-ecosystem/core";

interface CounterVM {
  count: Signal<number>;
  double: ReadonlySignal<number>;
  isEven: ReadonlySignal<boolean>;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const counterModel = createModel((): CounterVM => {
  const $count = signal(0);
  const $double = computed(() => $count.value() * 2);
  const $isEven = computed(() => $count.value() % 2 === 0);

  effect(() => {
    console.log("count", $count.value());
  });

  return {
    count: $count,
    double: $double,
    isEven: $isEven,
    increment: () => {
      $count.update((n) => n + 1);
    },
    decrement: () => {
      $count.update((n) => n - 1);
    },
    reset: () => {
      $count.set(0);
    },
  };
});

const CounterView = createView((vm: CounterVM) => (
  <div class="counter-demo">
    <h3>Counter (New API)</h3>
    <div class="display">
      <span class={computed(() => (vm.isEven.value() ? "even" : "odd"))}>{vm.count}</span>
      <small> (x2 = {vm.double})</small>
    </div>
    <div class="buttons">
      <button on:click={vm.decrement}>-</button>
      <button on:click={vm.reset}>Reset</button>
      <button on:click={vm.increment}>+</button>
    </div>
  </div>
));

export const CounterComponent = createComponent(counterModel, CounterView);

