import { LitElement, html } from "lit-element";

import "./ui/views/AudioSettings/AudioSettings";
import "./ui/views/Sketches/Sketches";

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
