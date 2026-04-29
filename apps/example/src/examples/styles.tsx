import {
  createModel,
  createView,
  signal,
  computed,
  type Signal,
  type ReadonlySignal,
  createComponent,
} from "@echojs-ecosystem/core";

interface StyleVM {
  hue: Signal<number>;
  size: Signal<number>;
  isBold: Signal<boolean>;
  isVisible: Signal<boolean>;
  color: ReadonlySignal<string>;
  setHue: (v: number) => void;
  setSize: (v: number) => void;
  toggleBold: () => void;
  toggleVisible: () => void;
}

const styleModel = createModel((): StyleVM => {
  const hue = signal(180);
  const size = signal(16);
  const isBold = signal(false);
  const isVisible = signal(true);

  const color = computed(() => "hsl(" + hue.value() + ", 70%, 50%)");

  return {
    hue,
    size,
    isBold,
    isVisible,
    color,
    setHue: (v: number) => hue.set(v),
    setSize: (v: number) => size.set(v),
    toggleBold: () => isBold.update((v) => !v),
    toggleVisible: () => isVisible.update((v) => !v),
  };
});

const StyleView = createView((vm: StyleVM) => {
  const style = computed(() => ({
    color: vm.color.value(),
    fontSize: vm.size.value() + "px",
    fontWeight: vm.isBold.value() ? "bold" : "normal",
    padding: "20px",
    border: "3px solid " + vm.color.value(),
    borderRadius: "8px",
  }));

  const boldLabel = computed(() => (vm.isBold.value() ? "Unbold" : "Bold"));
  const visibleLabel = computed(() => (vm.isVisible.value() ? "Hide" : "Show"));

  const handleHue = (e: Event) => {
    vm.setHue(parseInt((e.target as HTMLInputElement).value));
  };

  const handleSize = (e: Event) => {
    vm.setSize(parseInt((e.target as HTMLInputElement).value));
  };

  return (
    <div class="style-demo">
      <h3>Reactive Styles (New API)</h3>

      <div class="controls">
        <label>
          Hue: {vm.hue}
          <input type="range" min="0" max="360" value={vm.hue} onInput={handleHue} />
        </label>

        <label>
          Size: {vm.size}px
          <input type="range" min="12" max="48" value={vm.size} onInput={handleSize} />
        </label>

        <div class="toggles">
          <button onClick={() => vm.toggleBold()}>{boldLabel}</button>
          <button onClick={() => vm.toggleVisible()}>{visibleLabel}</button>
        </div>
      </div>

      <div class="styled-box" style={style} show={vm.isVisible}>
          This box has reactive styles!
      </div>
    </div>
  );
});

export const StyleComponent = createComponent(styleModel, StyleView);

