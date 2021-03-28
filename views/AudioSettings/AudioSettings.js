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

    document.addEventListener("requestAudioDeviceRefresh", () => {
      const lastDevice = JSON.parse(localStorage.getItem("lastAudioDevice"));
      const audioDeviceSelected = new CustomEvent("audioDeviceSelected", {
        detail: lastDevice.index,
      });
      // not sure what's up but without delaying this call the input won't be set in p5
      setTimeout(() => document.dispatchEvent(audioDeviceSelected), 50);
    });
  }

  audioDeviceCallback(deviceIndex, deviceName) {
    const audioDeviceSelected = new CustomEvent("audioDeviceSelected", {
      detail: deviceIndex,
    });
    document.dispatchEvent(audioDeviceSelected);
    localStorage.setItem(
      "lastAudioDevice",
      JSON.stringify({ index: deviceIndex, text: deviceName })
    );
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
