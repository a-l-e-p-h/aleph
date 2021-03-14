import { LitElement, html } from "lit-element";

import "./views/AudioSettings/AudioSettings";
import "./views/Sketches/Sketches";

class App extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <audio-settings></audio-settings>
      <sketch-window></sketch-window>
    `;
  }
}

customElements.define("aleph-app", App);
