import { LitElement, html } from "lit-element";

import checkboxStyles from "./checkboxStyles";
import "../Flex/Flex";

class Checkbox extends LitElement {
  static get properties() {
    return {
      label: { type: String },
      isChecked: { type: Boolean },
    };
  }

  static get styles() {
    return checkboxStyles;
  }

  constructor() {
    super();
    this.label = "";
    this.isChecked = false;
  }

  toggleCheck(e) {
    e.preventDefault();
    if ((e.type === "keydown" && e.code === "Space") || e.type === "click") {
      this.isChecked = !this.isChecked;
    }
  }

  render() {
    return html`
      <aleph-flex direction="column" align="center" display="inline-flex">
        <label for="checkbox" class="label"> ${this.label} </label>
        <div class="container">
          <input
            id="checkbox"
            class="checkbox"
            type="checkbox"
            ?checked=${this.isChecked}
            @keydown=${this.toggleCheck}
          />
          <span class="custom-checkbox" @click=${this.toggleCheck}></span>
        </div>
      </aleph-flex>
    `;
  }
}

customElements.define("aleph-checkbox", Checkbox);

export default Checkbox;
