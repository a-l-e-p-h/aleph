import { html } from "lit-element";

import Control from "../Control";
import controlStyles from "../controlStyles";
import buttonStyles from "./buttonStyles";
import "../../Flex/Flex";

class Button extends Control {
  static get properties() {
    return {
      toggleMode: { type: Boolean },
    };
  }

  static get styles() {
    return [controlStyles, buttonStyles];
  }

  constructor() {
    super();
    this.type = "button";
    this.toggleMode = true;
    this.value = 0;
    this.activationCount = 0;
    this.label = this.createLabelText(this.type, this.index);
  }

  toggle() {
    this.activationCount++;

    if (this.toggleMode) {
      if (this.activationCount % 2 === 0) {
        this.value = 0;
      } else this.value = 127;
    }
  }

  hold() {
    if (!this.toggleMode) {
      this.value = 127;
    }
  }

  release() {
    if (!this.toggleMode) {
      this.value = 0;
    }
  }

  render() {
    return html`
      <aleph-flex display="inline-flex" direction="column" justify="center">
        <label for="button">${this.label}</label>
        <input type="button" value=${this.value} />
        <div
          class="button-container"
          @click=${this.toggle}
          @mousedown=${this.hold}
          @mouseup=${this.release}
        >
          <div class=${this.value ? "button-value" : "hide-button-value"}></div>
        </div>
      </aleph-flex>
    `;
  }
}

customElements.define("aleph-ctrl-button", Button);

export default Button;
