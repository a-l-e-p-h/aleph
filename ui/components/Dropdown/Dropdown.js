import { LitElement, html } from "lit";

import dropdownStyles from "./dropdownStyles";
import controlStyles from "../Control/controlStyles";

class Dropdown extends LitElement {
  static get properties() {
    return {
      items: { type: Array },
      selectedItem: { type: Object },
      placeholder: { type: String },
      isOpen: { type: Boolean },
      callback: { type: Function },
      callbackArgs: { type: Array },
      label: { type: String },
    };
  }

  static get styles() {
    return [controlStyles, dropdownStyles];
  }

  constructor() {
    super();
    this.items = [];
    this.selectedItem = null;
    this.isOpen = false;
    this.placeholder = "";
    this.callback = () => {};
    this.callbackArgs = [];
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  setSelectedItem(e) {
    const selection = e.target.textContent.replace(/  |\r\n|\n|\r/gm, ""); // strip whitespace
    this.selectedItem = this.items.filter((item) => item.text === selection)[0];
    this.isOpen = false;
    this.callback(
      this.selectedItem?.key,
      this.selectedItem?.text,
      this.callbackArgs
    );
  }

  render() {
    return html`
      <label for="dropdown">${this.label}</label>
      <div class="dropdown-container">
        <div id="dropdown" class="header" @click=${this.toggleDropdown}>
          <p class="selection">
            ${this.selectedItem?.text || this.placeholder}
          </p>
          <div class="${this.isOpen ? "arrow arrow-open" : "arrow"}"></div>
        </div>
        <div
          class="${this.isOpen
            ? "options-container open"
            : "options-container"}"
        >
          ${this.items.map(
            (item) =>
              html`<p @click=${this.setSelectedItem} class="option">
                ${item.text}
              </p>`
          )}
        </div>
      </div>
    `;
  }
}

customElements.define("aleph-dropdown", Dropdown);

export default Dropdown;
