import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";

import Control from "../Control";
import controlStyles from "../controlStyles";
import faderStyles from "./faderStyles";

import "../../Flex/Flex";

class Fader extends Control {
  static get properties() {
    return {
      width: { type: Number },
      height: { type: Number },
      valueHeight: { type: Number },
    };
  }

  static get styles() {
    return [controlStyles, faderStyles];
  }

  constructor() {
    super();
    this.type = "fader";
    this.label = this.createLabelText(this.type, this.index);
    this.width = 18;
    this.height = 200;
  }

  updateValue(e) {
    if (this.isDraggable) {
      this.value = this.map(e.offsetY, 0, 200, this.maxValue, 0);
      this.valueHeight = this.map(this.value, 127, 0, 0, 200);
      this.boundsCheck(e, [this.width, this.height]);
    }
  }

  render() {
    return html`
      <aleph-flex direction="column" align="center" display="inline-flex">
        <label for="fader">${this.label}</label>
        <input
          id="fader"
          type="range"
          min=${this.minValue}
          max=${this.maxValue}
          value=${this.value}
          @change=${this.updateValue}
        />
        <div
          class="fader"
          @mousemove=${this.updateValue}
          @mousedown=${this.enableDrag}
          @mouseup=${this.disableDrag}
          style=${styleMap({
            width: `${this.width}px`,
          })}
        >
          <div
            class="fader-value"
            style=${styleMap({
              height: `${this.valueHeight}px`,
              width: `${this.width}px`,
            })}
          ></div>
        </div>
      </aleph-flex>
    `;
  }
}

customElements.define("aleph-fader", Fader);

export default Fader;
