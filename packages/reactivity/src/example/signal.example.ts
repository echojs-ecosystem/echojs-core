import { signal, effect } from "../index";

const $deepObject = signal({
  a: {
    b: {
      c: 1,
    },
  },
});

$deepObject.update((prev) => ({
  ...prev,
  a: {
    ...prev.a,
    b: {
      ...prev.a.b,
      c: prev.a.b.c + 1,
    },
  },
}));

effect(() => {
  console.log($deepObject.value().a.b.c);
});
