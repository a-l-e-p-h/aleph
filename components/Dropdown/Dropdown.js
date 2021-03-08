import { LitElement, html } from "lit-element";

import dropdownStyles from "./dropdownStyles";

class Dropdown extends LitElement {
  static get properties() {
    return {
      items: { type: Array },
      selectedItem: { type: String },
      placeholder: { type: String },
      isOpen: { type: Boolean },
    };
  }

  static get styles() {
    return dropdownStyles;
  }

  constructor() {
    super();
    this.items = [];
    this.selectedItem = null;
    this.isOpen = false;
    this.placeholder = "";
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  setSelectedItem(e) {
    this.selectedItem = e.target.textContent;
    this.isOpen = false;
  }

  render() {
    return html`
      <div class="dropdown-container">
        <div class="header" @click=${this.toggleDropdown}>
          <p class="selection">${this.selectedItem || this.placeholder}</p>
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
