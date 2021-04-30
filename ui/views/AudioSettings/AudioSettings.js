import { LitElement, html } from "lit";
import { StoxyElement } from "@stoxy/element-mixin";

import "../../components/Window/Window";
import "../../components/Flex/Flex";
import "../../components/Control/Knob/Knob";
import "../../components/Dropdown/Dropdown";
import { update } from "@stoxy/core";

class AudioSettings extends StoxyElement(LitElement) {
  static get stoxyProperties() {
    return {
      key: "audio",
      init: true,
      state: {
        params: [
          {
            key: "volume",
            value: 50,
          },
          {
            key: "bass",
            value: 50,
          },
          {
            key: "mid",
            value: 50,
          },
          {
            key: "high",
            value: 50,
          },
          {
            key: "fft smooth",
            value: 50,
          },
          {
            key: "vol smooth",
            value: 50,
          },
        ],
      },
    };
  }

  static get properties() {
    return {
      audioDevices: { type: Array },
      lastDevice: { type: Object },
      params: { type: Array },
    };
  }

  constructor() {
    super();
    this.audioDevices = [];
    this.lastDevice = null;
    this.params = [];
  }

  async connectedCallback() {
    super.connectedCallback();
    const audioDevices = await import("../../../audio");
    this.audioDevices = audioDevices.default;

    document.addEventListener("requestAudioDeviceRefresh", () => {
      const lastDevice = JSON.parse(localStorage.getItem("lastAudioDevice"));
      this.lastDevice = lastDevice;
      const audioDeviceSelected = new CustomEvent("audioDeviceSelected", {
        detail: { index: lastDevice.index, text: lastDevice.text },
      });
      // not sure what's up but without delaying this call the input won't be set in p5
      setTimeout(() => document.dispatchEvent(audioDeviceSelected), 100);
    });
  }

  audioDeviceCallback(deviceIndex, deviceName) {
    const audioDeviceSelected = new CustomEvent("audioDeviceSelected", {
      detail: { index: deviceIndex, text: deviceName },
    });
    document.dispatchEvent(audioDeviceSelected);
    localStorage.setItem(
      "lastAudioDevice",
      JSON.stringify({ index: deviceIndex, text: deviceName })
    );
  }

  updateAudioParams(value, index) {
    update("audio.params", (params) => {
      const targetParam = params[index];
      targetParam.value = value;
      return params;
    });
  }

  render() {
    return html`
      <aleph-window title="audio">
        <aleph-flex>
          ${this.params.map(
            (param, index) =>
              html`
                <aleph-knob
                  label=${param.key}
                  .callback=${this.updateAudioParams}
                  .callbackArgs=${[index]}
                ></aleph-knob>
              `
          )}
        </aleph-flex>
        <aleph-dropdown
          placeholder="select an audio device"
          .items=${this.audioDevices}
          .callback=${this.audioDeviceCallback}
          .selectedItem=${this.lastDevice}
        ></aleph-dropdown>
      </aleph-window>
    `;
  }
}

customElements.define("audio-settings", AudioSettings);

export default AudioSettings;
