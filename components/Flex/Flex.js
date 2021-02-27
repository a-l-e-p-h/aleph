import { LitElement, html, css } from "lit-element";
import { styleMap } from "lit-html/directives/style-map";

class Flex extends LitElement {
  static get properties() {
    return {
      direction: { type: String },
      align: { type: String },
      justify: { type: String },
      display: { type: String },
    };
  }

  static get styles() {
    return css`
      div {
        display: inline-flex;
      }
    `;
  }

  constructor() {
    super();
    this.display = "flex";
    this.direction = "row";
    this.justify = "flex-start";
    this.align = "flex-start";
  }

  render() {
    return html`
      <div
        style=${styleMap({
          display: this.display,
          flexDirection: this.direction,
          justifyContent: this.justify,
          alignItems: this.align,
        })}
      >
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("aleph-flex", Flex);

export default Flex;
