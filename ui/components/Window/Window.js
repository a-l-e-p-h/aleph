import { LitElement, html } from "lit";
import { styleMap } from "lit-html/directives/style-map";

import windowStyles from "./windowStyles";
import "./WindowButton";

class Window extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      isMaximized: { type: Boolean },
      contentWidth: { type: Number },
    };
  }

  static get styles() {
    return windowStyles;
  }

  constructor() {
    super();
    this.title = "";
    this.isMaximized = true;
    this.contentWidth = null;
  }

  minimize() {
    this.isMaximized = false;
    console.log(this.isMaximized);
  }

  maximimze() {
    this.isMaximized = true;
    console.log(this.isMaximized);
  }

  updated() {
    const { width } = this.renderRoot
      .querySelector(".window-container")
      .getBoundingClientRect();
    // acct for padding
    this.contentWidth = width - 20;
  }

  render() {
    return html`
      <div class="window-container">
        <div
          class="title-container"
          style=${this.contentWidth &&
          styleMap({ width: `${this.contentWidth}px` })}
        >
          <h4 class="title">${this.title}</h4>
          <div class="controls">
            <aleph-window-button
              type="minimize"
              @click=${this.minimize}
            ></aleph-window-button>
            <aleph-window-button
              type="maximize"
              @click=${this.maximimze}
            ></aleph-window-button>
            <aleph-window-button
              type="close"
              @click=${this.maximimze}
            ></aleph-window-button>
          </div>
        </div>
        ${this.isMaximized
          ? html`<div class="inner-container">
              <slot></slot>
            </div>`
          : null}
      </div>
    `;
  }
}

customElements.define("aleph-window", Window);

export default Window;
