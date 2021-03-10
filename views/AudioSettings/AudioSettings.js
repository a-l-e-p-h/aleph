import { LitElement, html } from "lit-element";

import "../../components/Window/Window";
import "../../components/Dropdown/Dropdown";

class AudioSettings extends LitElement {
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
    const audioDevices = await import("../../audio");
    this.audioDevices = audioDevices.default;
  }

  audioDeviceCallback(deviceIndex) {
    const audioDeviceSelected = new CustomEvent("audioDeviceSelected", {
      detail: deviceIndex,
    });
    document.dispatchEvent(audioDeviceSelected);
  }

  render() {
    return html`
      <aleph-window title="audio">
        <aleph-dropdown
          placeholder="select an audio device"
          .items=${this.audioDevices}
          .callback=${this.audioDeviceCallback}
        ></aleph-dropdown>
      </aleph-window>
    `;
  }
}

customElements.define("audio-settings", AudioSettings);

export default AudioSettings;
