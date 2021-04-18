import { html } from "lit-element";

import "../../Flex/Flex";
import Control from "../Control";
import controlStyles from "../controlStyles";
import knobStyles from "./knobStyles";

class Knob extends Control {
  static get styles() {
    return [controlStyles, knobStyles];
  }

  constructor() {
    super();
    this.type = "knob";
    this.strokeWidth = 9;
    this.height = 85;
    this.width = 85;
    this.value = 127;
    this.label = this.createLabelText(this.type, this.index);
    this.callback = () => {};
    this.callbackArgs = [];
  }

  mapValueToCircumference() {
    return this.map(
      this.value,
      this.minValue,
      this.maxValue,
      0,
      2 * Math.PI * (this.width / 2 - this.strokeWidth)
    );
  }

  updateValue(e) {
    if (this.isDraggable) {
      this.value = this.map(e.offsetY, this.height - 1, 0, 0, 129);
      this.callback(this.value, ...this.callbackArgs);
      this.boundsCheck(e, [this.width, this.height]);
    }
  }

  render() {
    return html`
      <aleph-flex align="center" direction="column" display="inline-flex">
        <label for="knob">${this.label}</label>
        <input
          id="knob"
          type="range"
          min=${this.minValue}
          max=${this.maxValue}
          value=${this.value}
        />
        <svg
          width=${this.width}
          height=${this.height}
          @mousemove=${this.updateValue}
          @mousedown=${this.enableDrag}
          @mouseup=${this.disableDrag}
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="50%" x2="85%" y2="100%">
              <stop offset="0%" stop-color="#12e4a6" />
              <stop offset="53.65%" stop-color="#02bbff" />
              <stop offset="100%" stop-color="#060b0d" />
            </linearGradient>
          </defs>
          <circle
            cx=${this.width / 2}
            cy=${this.height / 2}
            r=${this.width / 2 - this.strokeWidth}
            stroke-width=${this.strokeWidth}
            class="knob-background"
          ></circle>
          <circle
            cx=${this.width / 2}
            cy=${this.height / 2}
            r=${this.width / 2 - this.strokeWidth}
            stroke-width=${this.strokeWidth}
            stroke-dasharray="${this.mapValueToCircumference()}, 99999"
            class="knob-value"
            stroke="url(#gradient)"
          ></circle>
        </svg>
      </aleph-flex>
    `;
  }
}

customElements.define("aleph-knob", Knob);

export default Knob;
