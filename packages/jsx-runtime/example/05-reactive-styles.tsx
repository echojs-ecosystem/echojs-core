/**
 * Example 5: Reactive Styles and Attributes
 * Demonstrates reactive class, style, and attributes
 */

import { createComponent, signal, computed, mount } from "@echojs-ecosystem/jsx-runtime";

const StyleDemo = createComponent(
  () => {
    const hue = signal(180);
    const size = signal(16);
    const isBold = signal(false);
    const isItalic = signal(false);
    const boxVisible = signal(true);

    const color = computed(() => `hsl(${hue.value()}, 70%, 50%)`);

    return {
      hue,
      size,
      isBold,
      isItalic,
      boxVisible,
      color,
      setHue: (v: number) => hue.set(v),
      setSize: (v: number) => size.set(v),
      toggleBold: () => isBold.update((v) => !v),
      toggleItalic: () => isItalic.update((v) => !v),
      toggleBox: () => boxVisible.update((v) => !v),
    };
  },
  (vm) => {
    const dynamicStyle = computed(() => ({
      color: vm.color.value(),
      fontSize: `${vm.size.value()}px`,
      fontWeight: vm.isBold.value() ? "bold" : "normal",
      fontStyle: vm.isItalic.value() ? "italic" : "normal",
      padding: "20px",
      border: `2px solid ${vm.color.value()}`,
      borderRadius: "8px",
      marginTop: "10px",
    }));

    return (
      <div class="style-demo">
        <h2>Reactive Styles & Attributes</h2>

        <div class="controls">
          <label>
            Hue: {vm.hue.value()}
            <input
              type="range"
              min="0"
              max="360"
              value={vm.hue.value()}
              on:input={(e: Event) => vm.setHue(parseInt((e.target as HTMLInputElement).value))}
            />
          </label>

          <label>
            Size: {vm.size.value()}px
            <input
              type="range"
              min="12"
              max="48"
              value={vm.size.value()}
              on:input={(e: Event) => vm.setSize(parseInt((e.target as HTMLInputElement).value))}
            />
          </label>

          <div class="toggles">
            <button on:click={vm.toggleBold}>{vm.isBold.value() ? "Unbold" : "Bold"}</button>
            <button on:click={vm.toggleItalic}>
              {vm.isItalic.value() ? "Unitalic" : "Italic"}
            </button>
            <button on:click={vm.toggleBox}>
              {vm.boxVisible.value() ? "Hide Box" : "Show Box"}
            </button>
          </div>
        </div>

        <div
          show={vm.boxVisible.value()}
          class={["styled-box", vm.isBold.value() ? "bold" : ""].filter(Boolean).join(" ")}
          style={dynamicStyle.value()}
        >
          This box has reactive styles! Try changing the controls above.
        </div>

        <p>
          Current color: <code>{vm.color.value()}</code>
        </p>
      </div>
    );
  },
);

const app = document.getElementById("app");
if (app) {
  mount(app, <StyleDemo />);
}
