import { LitElement, html } from "lit-element";

import "./components/Button/Button";
import "./components/Window/Window";
import "./components/Input/Input";
import "./components/Checkbox/Checkbox";
import "./components/Control/Fader/Fader";
import "./components/Control/Knob/Knob";
import "./components/Control/Button/Button";
import "./components/Sketch/Sketch";
import "./components/Dropdown/Dropdown";

class App extends LitElement {
  static get properties() {
    return {
      audioDevices: { type: Array },
    };
  }

  constructor() {
    super();
    this.audioDevices = [];
  }

  async connectedCallback() {
    super.connectedCallback();
    const audioDevices = await import("./audio");
    this.audioDevices = audioDevices.default;
  }

  render() {
    return html`
      <aleph-window title="window">
        <aleph-button
          text="hello world"
          @click="${this.childClickHandler}"
        ></aleph-button>
        <aleph-button
          text="hello world"
          @click="${this.childClickHandler}"
        ></aleph-button>
        <aleph-button
          text="hello world"
          @click="${this.childClickHandler}"
        ></aleph-button>
        <aleph-button
          text="hello world"
          @click="${this.childClickHandler}"
          .isDisabled="${true}"
        ></aleph-button>
        <aleph-input placeholder="hello world"></aleph-input>
        <aleph-checkbox label="die instantly?"></aleph-checkbox>
        <aleph-fader index="0"></aleph-fader>
        <aleph-knob index="0"></aleph-knob>
        <aleph-ctrl-button index="0"></aleph-ctrl-button>
        <aleph-flex>
          <aleph-sketch
            sketchName="hello world testing really long sketch names"
          ></aleph-sketch>
          <aleph-sketch
            sketchName="hello world testing really long sketch names"
          ></aleph-sketch>
          <aleph-sketch
            sketchName="hello world testing really long sketch names"
          ></aleph-sketch>
          <aleph-sketch
            sketchName="hello world testing really long sketch names"
          ></aleph-sketch>
        </aleph-flex>

        <aleph-dropdown
          placeholder="select an audio device"
          .items=${this.audioDevices}
        ></aleph-dropdown>
      </aleph-window>
    `;
  }
}
customElements.define("aleph-app", App);
