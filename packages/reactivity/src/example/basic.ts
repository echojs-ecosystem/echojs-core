import { batch, computed, effect, signal } from "../index";

const $count = signal(0);
const $double = computed(() => $count.value() * 2);

const stop = effect(() => {
  console.log("double:", $double.value());
});

$count.set(1);
$count.update((v) => v + 1);

batch(() => {
  $count.set(10);
  $count.set(11);
});

stop();
